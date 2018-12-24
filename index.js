//nodefirebase-225905  Google cloud [rpject Id

//firebase project selected
//AIzaSyA6UUMharjWkjtBWRroEh61_7O1_coVY14   API key

var firebase = require('firebase');
var router = require('express')
var bodyParser = require('body-parser')
var _ = require('lodash')

//var ref = firebase.database().ref('Users');     //used for quering firebase realtime database
const {db} = require('./config/database')

var id = ''

db.settings({
    timestampsInSnapshots: true
});

var route=router();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: false}));

route.post('/register', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword
    (
        email,
        password
    )
        .then(function(userRecord)
        {
            db.collection("Users").add({
                email: req.body.email,
                displayName: req.body.username
            }).then((user) => {
                if(user){
                    id = user.id

                    db.collection("UserDetails").add({
                        userId: id,
                        address: req.body.address,
                        phoneNo: req.body.phoneNo,
                        profession: req.body.profession
                    }).then((detail) => {
                        res.statusCode = 201
                        res.json({success: 1, response :"User created successfully"})
                    }).catch((err) => {
                        res.statusCode = 400
                        res.json({success: 0, error :error})
                    })
                    //res.json({user: user.toString()})
                }else {
                    res.statusCode = 400
                    res.json({success: 0, message :"Problem creating user"})
                }
            }).catch((error) => {
                res.statusCode = 400
                res.json({success: 0, error :error})
            })
        })
        .catch(function(error)
        {
            res.statusCode = 400
            res.json({success: 0, error :error})
        });
});

route.post('/login', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {

        /*ref.orderByChild('email').equalTo(email).once('value').
        then((userData) => {
            //console.log(userData)
            var key = Object.keys(userData.val())[0];
            console.log(userData)
            res.json({success:1, userData})
        }).catch((err) => {
            res.send(err)
        })*/

        var Users = db.collection("Users")

        Users.where("email", "==", email).
        onSnapshot((data) => {
            var userData = ''
            data.forEach(function (userSnapshot) {
                id = userSnapshot.id

                db.collection("UserDetails").where("userId", '==', id).onSnapshot((userDetail) => {
                    userDetail.forEach((detail) => {
                        //userData = {id: detail.id, data:userSnapshot.data(), detail: detail.data()}
                        userData = {
                            id: detail.id,
                            displayName:userSnapshot.data().displayName,
                            email:userSnapshot.data().email,
                            address: detail.data().address,
                            phoneNo: detail.data().phoneNo,
                            profession: detail.data().profession,
                            userId: detail.data().userId
                        }
                    })

                    if(userData === ""){
                        userData = {
                            id: userSnapshot.id,
                            displayName:userSnapshot.data().displayName,
                            email:userSnapshot.data().email
                        }
                        res.send(userData)
                    }else {
                        res.send(userData)
                    }
                })
            });
        })

        /*db.collection("Users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });*/
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        res.json({success:0, error: errorMessage})
    });
})

route.listen(3000, (err, res) => {
    if(err){
        console.log("Error occurred "+err.toString());
    } else {
        console.log("Server is listening on port 3000")
    }
})