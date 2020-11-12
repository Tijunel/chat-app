'use strict';

// Imports
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const cors = require('cors');
const path = require('path');
const PORT = 5000;

// Setup
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const user = require('./Routes/user');
const state = require('./Routes/state');
const message = require('./Routes/message');
app.use('/api/user', user);
app.use('/api/state', state);
app.use('/api/message', message);

// Frontend routing
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '.', 'client', 'build', 'index.html')); });

// Start server
const server = require('http').createServer(app);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Socket.io setup
var map = require('./Config/hashmap')[0];
let getJSONMap = require('./Config/hashmap')[1];
var io = require("socket.io")(server, {
	
});
io.on('connection', (socket) => {
	const userData = cookieParser.JSONCookie(cookie.parse(socket.handshake.headers.cookie).userData);
	map.set(userData.userID, { username: userData.username, colour: userData.colour })
	io.emit('active users', getJSONMap());
	console.log('hey')
	socket.on('disconnect', () => {
		map.delete(userData.userID);
		io.emit('active users', getJSONMap());
		console.log('here')
	});
});

module.exports = [io];
