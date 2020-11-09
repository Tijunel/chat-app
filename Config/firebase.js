const firebase = require('firebase/app');
const config = {
    apiKey: "AIzaSyDQSw-VTkTu21t1M-nOmMU1fYeogqGjpWI",
    authDomain: "chat-app-f56a1.firebaseapp.com",
    databaseURL: "https://chat-app-f56a1.firebaseio.com",
    projectId: "chat-app-f56a1",
    storageBucket: "chat-app-f56a1.appspot.com",
    messagingSenderId: "433322525466",
    appId: "1:433322525466:web:7e192deeb86a629bf4a2a3",
    measurementId: "G-VG57C2B9LM"
};
firebase.initializeApp(config);

module.exports = firebase;