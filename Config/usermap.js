'use strict';

const user = require("../Routes/user");

var map = [];

let add = (key, value) => {
    map.push({
        userID: key, 
        username: value.username, 
        colour: value.colour
    });
}

let remove = (key) => {
    var index = 0;
    for(let user in map) {
        if (key === user.userID) {
            map = map.splice(index, 1);
        }
        index++;
    }
}

let getJSONMap = () => {
    var users = [];
    var lookup = {};
    for(let user of map) {
        var userID = user.userID;
        if(!(userID in lookup)) {
            lookup[userID] = userID;
            users.push({
                userID: userID,
                username: user.username,
                colour: user.colour
            });
        }
    }
    return users;
}

module.exports = [add, remove, getJSONMap];