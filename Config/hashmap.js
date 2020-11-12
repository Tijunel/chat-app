'use strict';

const HashMap = require('hashmap');
var map = new HashMap();

let getJSONMap = () => {
    var users = [];
    map.forEach((value, key) => {
        users.push({
            userID: key,
            username: value.username,
            colour: value.colour
        });
    });
    return users;
}

module.exports = [map, getJSONMap];