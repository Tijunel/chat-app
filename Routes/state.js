'use strict';

const express = require('express');
const state = express.Router();
var getJSONMap = require('../Config/usermap')[2];

state.get('/', async (req, res) => {
    var users = getJSONMap();
    res.status(200).json(users).end();
});

module.exports = state;