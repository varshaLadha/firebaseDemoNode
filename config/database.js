var firebase = require('firebase');
require("firebase/firestore");

const {Storage} = require('@google-cloud/storage');

firebase.initializeApp({
    apiKey: "AIzaSyDsluD9BSfCJY1c9B4Dc1HiWJdT_izZerE",
    authDomain: "nodefirebase-b82bb.firebaseapp.com",
    databaseURL: "https://nodefirebase-b82bb.firebaseio.com",
    projectId: "nodefirebase-b82bb",
    storageBucket: "nodefirebase-b82bb.appspot.com",
    messagingSenderId: "782765110287"
});

const storage = new Storage({
    projectId: "nodefirebase-b82bb",
    keyFilename: 'service-account.json'
});

exports.bucket = storage.bucket("nodefirebase-b82bb.appspot.com");

exports.db = firebase.firestore();      //used for querying firebase cloud firestore database