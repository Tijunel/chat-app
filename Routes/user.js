'use strict';

const express = require('express');
const user = express.Router();
const shortid = require('shortid');
const firebase = require('../Config/firebase')[0];
const add = require('../Config/usermap')[0];
const replace = require('../Config/usermap')[2];

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
        res.status(500).send('Error getting user details!').end();
    }
});

const createUniqueColor = () => {
    var number = Math.floor(Math.random() * 0xFFFFFF);      // Get random number in the colour range
    return number.toString(16);                             // Return hex string
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

user.put('/', (req, res) => {
    try {
        var leave = false;
        const usersRef = firebase.database().ref('users');
        usersRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                if ((child.val().username === req.body.username) && (child.key !== req.cookies.userData.userID)) 
                    leave = true;
            });
        }).then(() => {
            if (!leave) {
                const userRef = firebase.database().ref('users').child(req.cookies.userData.userID);
                userRef.set({
                    username: req.body.username,
                    colour: req.body.colour
                });
                let userData = {
                    userID: req.cookies.userData.userID,
                    username: req.body.username,
                    colour: req.body.colour
                }
                replace(userData.userID, { username: req.body.username, colour: req.body.colour });
                const io = require('../server')[0];
                io.emit('user update', { userID: req.cookies.userData.userID, username: req.body.username, colour: req.body.colour });
                res.status(200).cookie('userData', userData).end();
            }
            else res.status(500).send('Username already exists!').end();
        })
    } catch (e) {
        res.status(500).send('Error changing username!').end();
    }
});

module.exports = user;
