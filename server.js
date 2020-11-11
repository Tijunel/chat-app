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
const message = require('./Routes/message');
app.use('/api/user', user);
app.use('/api/message', message);

// Frontend routing
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '.', 'client', 'build', 'index.html')); });

// Start server
const server = require('http').createServer(app);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Socket.io setup
var io = require("socket.io")(server);
io.on('connection', (socket) => {
	var cookies = cookie.parse(socket.handshake.headers.cookie);
	console.log(cookieParser.JSONCookie(cookies.userData))
	socket.on('disconnection', () => {

	});
});
