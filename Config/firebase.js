'use strict';

const firebase = require('firebase/app');
require('firebase/database');
const config = {
    apiKey: "AIzaSyDQSw-VTkTu21t1M-nOmMU1fYeogqGjpWI",
    authDomain: "chat-app-f56a1.firebaseapp.com/",
    databaseURL: "https://chat-app-f56a1.firebaseio.com",
};
firebase.initializeApp(config);

module.exports = [firebase];