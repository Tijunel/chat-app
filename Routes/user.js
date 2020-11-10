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

user.get('/id/:username', async (req, res) => {
    try {
        const idRef = firebase.database().ref('users');
        var userID = '';
        await idRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                var id = child.key;
                if (child.val().username === req.params.username) userID = id;
            });
        });
        res.status(200).json({ id: userID }).end();
    } catch (e) {
        res.status(500).send('Error getting user ID!').end();
    }
});

user.post('/create', async (req, res) => {
    try {
        const username = 'user-' + shortid.generate();              // Default username
        const colour = '#4FB3F7';                                   // Default colour
        const usersRef = firebase.database().ref('users').push();
        usersRef.set({
            username: username,
            colour: colour
        });
        res.status(200).end();
    } catch (e) {
        res.status(500).send('Error creating user!').end();
    }
});

user.put('/:id', async (req, res) => {
    try {
        const usernameRef = firebase.database().ref('users').child(req.params.userID);
        usernameRef.set({
            username: req.body.username,
            colour: req.body.colour
        });
        io.emit('username update', { username: req.body.username });
        io.emit('colour update', { colour: req.body.colour });
        res.status(200).end();
    } catch (e) {
        res.status(500).send('Error changing username!').end();
    }
});

module.exports = user;