const express = require('express');
const message = express.Router();
const firebase = require('../Config/firebase');

message.get('/', async (req, res) => {
    try {

    } catch(e) {
        res.status(500).send('Error getting messages!').end();
    }
});

message.post('/', async (req, res) => {
    try {
        res.status(200).end();
    } catch(e) {
        res.status(500).send('Error posting message!').end();
    }
});

