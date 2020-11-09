const express = require('express');
const message = express.Router();
const firebase = require('../Config/firebase');

message.get('/', async (req, res) => {
    try {
        const messagesRef = firebase.database().ref('messages');
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
        res.status(200).json(allMessages).end();
    } catch(e) {
        res.status(500).send('Error getting messages!').end();
    }
});

message.post('/', async (req, res) => {
    try {
        const message = req.body.message;
        const userID = req.body.id;
        const timestamp = Date.now();
        const messagesRef = firebase.database().ref('messages');
        const messageRef = messagesRef.child('message');
        messageRef.push(message);
        const userIDRef = messagesRef.child('userID');
        userIDRef.push(userID);
        const timestampRef = messagesRef.child('timestamp');
        timestampRef.push(timestamp);
        res.status(200).json({ timestamp: timestamp }).end();
    } catch(e) {
        res.status(500).send('Error posting message!').end();
    }
});

