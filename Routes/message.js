'use strict';

const express = require('express');
const message = express.Router();
const firebase = require('../Config/firebase')[0];

// Get the past 200 messages and delete the old ones. 
message.get('/', async (req, res) => {
    try {
        const messagesRef = firebase.database().ref('messages');
        const usersRef = firebase.database().ref('users');
        var allMessages = [];
        await messagesRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                allMessages.push({
                    message: child.val().message,
                    userID: child.val().userID,
                    timestamp: child.val().timestamp
                });
            });
        });
        allMessages.sort((a, b) => {
            if(a.timestamp > b.timestamp) return -1;
            else if(b.timestamp > a.timestamp) return 1;
            else return 0;
        });
        deleteOldMessages(allMessages, messagesRef);    // Delete messages beyond 200
        allMessages = allMessages.slice(0, 199);        // Get the latest 200 messages
        allMessages.sort((b, a) => {
            if (a.timestamp > b.timestamp) return -1;
            else if (b.timestamp > a.timestamp) return 1;
            else return 0;
        });
        res.status(200).json(allMessages).end();
    } catch(e) {
        res.status(500).send('Error getting messages!').end();
    }
});

let deleteOldMessages = (messages, messagesRef) => {
    const messagesToRemove = messages.slice(199, messages.length);
    for(let message of messagesToRemove) 
        messagesRef.child(message.messageID).remove();
}

// POST a new message into the database.
message.post('/', async (req, res) => {
    try {
        const timestamp = Date.now();
        const messagesRef = firebase.database().ref('messages').push();
        messagesRef.set({
            message: req.body.message,
            userID: req.cookies.userData.userID,
            timestamp: timestamp
        });
        const io = require('../server')[0];
        io.emit('new message', {
            message: req.body.message,
            userID: req.cookies.userData.userID,
            username: req.cookies.userData.username,
            colour: req.cookies.userData.colour,
            timestamp: timestamp
        });
        res.status(200).end();
    } catch(e) {
        res.status(500).send('Error posting message!').end();
    }
});

module.exports = message;
