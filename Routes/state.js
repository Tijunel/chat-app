'use strict';

const express = require('express');
const state = express.Router();
const getUserList = require('../Config/usermap')[3];

state.get('/', async (req, res) => {
    var users = getUserList();
    res.status(200).json(users).end();
});

module.exports = state;