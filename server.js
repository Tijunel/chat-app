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
const add = require('./Config/usermap')[0];
const remove = require('./Config/usermap')[1];
const getUserList = require('./Config/usermap')[3];
const io = require("socket.io")(server);
io.on('connection', (socket) => {
	const userData = cookieParser.JSONCookie(cookie.parse(socket.handshake.headers.cookie).userData);
	add(userData.userID, { username: userData.username, colour: userData.colour });
	io.emit('active users', getUserList());
	socket.on('disconnect', () => {
		remove(userData.userID);
		io.emit('active users', getUserList());
	});
});

module.exports = [io];
