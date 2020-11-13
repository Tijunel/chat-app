'use strict';

const express = require('express');
const user = express.Router();
const shortid = require('shortid');
const firebase = require('../Config/firebase')[0];
const io = require('../server')[0];
const add = require('../Config/usermap')[0];
const replace = require('../Config/usermap')[2];

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

user.get('/:id', async (req, res) => {
    try {
        var details = {}
        const userRef = firebase.database().ref('users/').child(req.params.id);
        await userRef.once('value').then(snapshot => {
            details = {
                username: snapshot.val().username,
                colour: snapshot.val().colour
            }
        });
        res.status(200).json(details).end();
    } catch (e) {
        console.log(e)
        res.status(500).send('Error getting user details!').end();
    }
});

const createUniqueColor = () => {
    var number = Math.floor(Math.random() * 0xFFFFFF);    // Get random number in the colour range
    return number.toString(16);                 // Return hex string
}

// Create a new user
user.post('/', async (req, res) => {
    try {
        const username = 'user-' + shortid.generate();              // Default username
        const colour = '#' + createUniqueColor();                   // Default colour
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
        add(userData.userID, { username: username, colour: colour });
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
        replace(userData.userID, { username: req.body.username, colour: req.body.colour }); // Should be replace
        io.emit('user update', { userID: req.cookies.userData.userID, username: req.body.username });
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
