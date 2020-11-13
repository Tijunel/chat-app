'use strict';

var map = [];

let add = (key, value) => {
    map.push({
        userID: key,
        username: value.username,
        colour: value.colour
    });
}

let remove = (key) => {
    for (let mapIndex in map)
        if (key === map[mapIndex].userID)
            map.splice(mapIndex, 1);
}

let replace = (key, value) => {
    for (let mapIndex in map) {
        if (key === map[mapIndex].userID) {
            map[mapIndex].username = value.username;
            map[mapIndex].colour = value.colour;
        }
    }
}

let getUserList = () => {
    var users = [];
    var lookup = {};
    for (let user of map) {
        var userID = user.userID;
        if (!(userID in lookup)) {
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

module.exports = [add, remove, replace, getUserList];