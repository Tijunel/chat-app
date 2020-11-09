const express = require('express');
const user = express.Router();

user.get('/', async (req, res) => {
    try {

    } catch(e) {
        res.status(500).send('Error creating user!').end();
    }
});

user.get('/id/:name', async (req, res) => {
    try {

    } catch(e) {
        res.status(500).send('Error user ID!').end();
    }
});

user.post('/create', async (req, res) => {
    try {
        res.status(200).end();
    } catch(e) {
        res.status(500).send('Error creating user!').end();
    }
});

user.put('/name', async (req, res) => {
    try {
        res.status(200).end();
    } catch(e) {
        res.status(500).send('Error changing username!').end();
    }
});

user.put('/colour', async (req, res) => {
    try {
        res.status(200).end();
    } catch(e) {
        res.status(500).send('Error changing colour!').end();
    }
});