'use strict';

const express = require('express');
const state = express.Router();
var getJSONMap = require('../Config/hashmap')[1];

state.get('/', async (req, res) => {
    var users = getJSONMap();
    res.status(200).json(users).end();
});

module.exports = state;