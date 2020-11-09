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
// Session Setup
app.use(
    session({
        secret: "xCufvwEyu14Tuu7l",
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

app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {res.sendFile(path.join(__dirname, '.', 'client', 'build', 'index.html'));});

// Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));