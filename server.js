'use strict';

// Imports
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const PORT = 5000;

// Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Session setup
app.use(
    session({
        secret: 'xCufvwEyu14Tuu7l',
        resave: true,
        saveUninitialized: true,
        secure: true,
    })
);
app.use(cookieParser());

// Routes
const user = require('./Routes/user');
const message = require('./Routes/message');
app.use('/api/user', user);
app.use('/api/message', message);

// Frontend routing
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '.', 'client', 'build', 'index.html'));});

// Socket-io 
const io = require('./Config/socket-io')[0];
io.on('connection', (socket) => {
    io.emit('new user', 'username');
    socket.on('disconnect', () => {
        io.emit('user left', 'username');
    });
});

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));