// nodefirebase-b82bb  Firebase project id

var firebase = require('firebase')
var firebaseAdmin = require('firebase-admin')
var _ = require('lodash')
var credentials = require('./service-account')

var config = {
    apiKey: "AIzaSyDsluD9BSfCJY1c9B4Dc1HiWJdT_izZerE",
    authDomain: "nodefirebase-b82bb.firebaseapp.com",
    databaseURL: "https://nodefirebase-b82bb.firebaseio.com",
    projectId: "nodefirebase-b82bb",
    storageBucket: "nodefirebase-b82bb.appspot.com",
    messagingSenderId: "782765110287"
};

firebase.initializeApp(config);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials),
    databaseURL: config.databaseURL
})

//var db = firebaseAdmin.database()
var ref = firebase.database().ref('Employee');

//var ref1 = db.ref('Employee')
/*var change = ref.child('-LTvYhOlx4gD-35wkXQj')

var data = {name: 'Sweety Singh',
    description: 'Employee at La Net Software solutions'};

change.set(data)*/

/*var obj = {name: 'Sweety',
    description: 'Employee at La Net Software Solutions'};
ref.push(obj);*/

/*var usersRef = ref.child('Users');
var userRef = usersRef.push({
    name: 'Christopher',
    description: 'I eat too much ice cream'
});*/

ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});

/*
ref1.once('value').then(function (snap) {
    /!*var Users = _.toArray(snap.val())
    for(var i=0; i<Users.length; i++){
        console.log("Name = " +Users[i].name)
    }*!/
    // console.log('snap.val()', snap.val())
    snap.forEach((doc) => {
        console.log(doc.ref_.path.pieces_[1])
    })
});
*/