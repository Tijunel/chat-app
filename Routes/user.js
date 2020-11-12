'use strict';

const express = require('express');
const user = express.Router();
const shortid = require('shortid');
const firebase = require('../Config/firebase')[0];
const io = require('../server')[0];
var map = require('../Config/hashmap')[0];

user.get('/', async (req, res) => {
    try {
        const userRef = firebase.database().ref('users');
        var allUsers = [];
        await userRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                allUsers.push({
                    username: child.val().username,
                    colour: child.val().colour
                });
            });
        });
        res.status(200).json(allUsers).end();
    } catch (e) {
        res.status(500).send('Error creating user!').end();
    }
});

// Create a new user

const createUniqueColor = () => {

}

user.post('/', async (req, res) => {
    try {
        const username = 'user-' + shortid.generate();              // Default username
        const colour = '#4FB3F7';                                   // Default colour
        const usersRef = firebase.database().ref('users').push();
        usersRef.set({
            username: username,
            colour: colour
        });
        let userData = {
            userID: usersRef.key,
            username: username,
            colour: colour
        }
        map.set(userData.userID, { username: username, colour: colour });
        res.status(200).cookie('userData', userData).end();
    } catch (e) {
        res.status(500).send('Error creating user!').end();
    }
});

user.put('/', async (req, res) => {
    try {
        const usernameRef = firebase.database().ref('users').child(req.cookies.userData.userID);
        usernameRef.set({
            username: req.body.username,
            colour: req.body.colour
        });
        map.set(userData.userID, { username: req.body.username, colour: req.body.colour });
        io.emit('user update', { userID: req.cookies.userData.userID, username: req.body.username });
        io.emit('colour update', { userID: req.cookies.userData.userID, colour: req.body.colour });
        let userData = {
            userID: req.cookies.userData.userID,
            username: req.body.username,
            colour: req.body.colour
        }
        res.status(200).cookie('userData', userData).end();
    } catch (e) {
        res.status(500).send('Error changing username!').end();
    }
});

module.exports = user;
