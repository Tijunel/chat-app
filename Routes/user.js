const express = require('express');
const user = express.Router();
const shortid = require('shortid');

user.get('/', async (req, res) => {
    try {
        const userRef = firebase
            .database()
            .ref('users')
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

user.get('/id/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const idRef = firebase.database().ref('users');
        var userID = '';
        await idRef.once('value').then(snapshot => {
            snapshot.forEach(child => {
                var id = child.key;
                if (child.value.name === name) {
                    userID = id;
                    break;
                }
            });
        });
        res.status(200).json({ id: userID }).end();
    } catch (e) {
        res.status(500).send('Error user ID!').end();
    }
});

user.post('/create', async (req, res) => {
    try {
        const username = 'user-' + shortid.generate();
        const colour = '#4FB3F7';
        const usersRef = firebase.database().ref('users');
        const usernameRef = usersRef.child('username');
        usernameRef.push(username);
        const colourRef = usersRef.child('colour');
        colourRef.push(colour);
        res.status(200).end();
    } catch (e) {
        res.status(500).send('Error creating user!').end();
    }
});

user.put('/name', async (req, res) => {
    try {
        const name = req.body.username;
        const userID = req.body.userID;
        var usernameRef = firebase
            .database()
            .ref('users')
            .child(userID)
            .child('username');
        usernameRef.set(name);
        res.status(200).end();
    } catch (e) {
        res.status(500).send('Error changing username!').end();
    }
});

user.put('/colour', async (req, res) => {
    try {
        const colour = req.body.colour;
        const userID = req.body.userID;
        var colourRef = firebase
            .database()
            .ref('users')
            .child(userID)
            .child('colour');
        colourRef.set(colour);
        res.status(200).end();
    } catch (e) {
        res.status(500).send('Error changing colour!').end();
    }
});