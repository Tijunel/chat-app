'use strict';

const express = require('express');
const user = express.Router();
const shortid = require('shortid');
const firebase = require('../Config/firebase')[0];
const io = require('../Config/socket-io')[0];

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

user.get('/username', async (req, res) => {
    try {
        const idRef = firebase.database().ref('users');
        var username = '';
        await idRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                var name = child.val().username;
                if (child.val().userID === req.cookies.userData.userID) 
                    username = name;
            });
        });
        res.status(200).json({ username: username }).end();
    } catch (e) {
        res.status(500).send('Error getting user ID!').end();
    }
});

// Create a new user
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
            username: username,
            userID: usersRef.key
        }
        res.status(200).cookie('userData', userData).end();
    } catch (e) {
        console.log(e)
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
        io.emit('username update', { username: req.body.username });
        io.emit('colour update', { colour: req.body.colour });
        let userData = {
            username: req.body.username,
            userID: req.cookies.userData.userID
        }
        res.status(200).cookie('userData', userData).end();
    } catch (e) {
        res.status(500).send('Error changing username!').end();
    }
});

module.exports = user;
