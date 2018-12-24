const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config/general')
const format = require('util').format

const Multer = require('multer');

var firebase = require('firebase');
const {db, bucket} = require('../config/database')
db.settings({
    timestampsInSnapshots: true
});

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

var id, JWTToken = ''
var flag = 0

router.post('/register', (req, res, next) => {
    if(req.body.email && req.body.role && req.body.name && req.body.mobile_no && req.body.address && req.body.password){
        var email = req.body.email;
        var password = req.body.password;

        firebase.auth().createUserWithEmailAndPassword
        (
            email,
            password
        )
            .then(function(userRecord)
            {
                db.collection("User").add({
                    email: req.body.email,
                    role: req.body.role
                }).then((user) => {
                    if(user){
                        id = user.id

                        db.collection("Teacher").add({
                            userId: id,
                            name: req.body.name,
                            address: req.body.address,
                            mobile_no: req.body.mobile_no,
                            email: req.body.email,
                            standard_id: 0,
                            division_id: 0
                        }).then((detail) => {
                            res.statusCode = 201
                            res.json({success: 1, response :"Teacher created successfully"})
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
    }else {
        res.statusCode = 400
        res.send("Please enter all the data")
    }
});

router.post('/login', (req, res, next) => {
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

        var Users = db.collection("User")

        Users.where("email", "==", email).
        onSnapshot((data) => {
            var userData = ''
            data.forEach(function (userSnapshot) {
                id = userSnapshot.id

                db.collection("Teacher").where("userId", '==', id).onSnapshot((userDetail) => {
                    userDetail.forEach((detail) => {
                        JWTToken = jwt.sign({
                                email: userSnapshot.data().email,
                                _id: detail.data().userId,
                                user_id: detail.id,
                                role:userSnapshot.data().role
                            },
                            jwtConfig.secret
                        );

                        userData = {
                            id: detail.id,
                            name:detail.data().name,
                            email:userSnapshot.data().email,
                            address: detail.data().address,
                            mobile_no: detail.data().mobile_no,
                            role: userSnapshot.data().role,
                            userId: detail.data().userId,
                            standard_id: detail.data().standard_id,
                            division_id: detail.data().division_id
                        }
                    })

                    if(userData === ""){
                        userData = {
                            id: userSnapshot.id,
                            displayName:userSnapshot.data().displayName,
                            email:userSnapshot.data().email
                        }
                        res.json({success: 1, userData, token : JWTToken})
                    }else {
                        res.json({success: 1, userData, token : JWTToken})
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

router.get('/teachers', (req, res, next) => {
    db.collection("Teacher").get().then((data) => {
        var teacherData = []
        data.forEach(doc => {
            teacherData.push(doc.data())
        });

        res.send(teacherData)
    }).catch((error) => {
        res.send(error)
    })
})

router.post('/assignTeacher', (req, res, next) => {

    db.collection("Teacher").
    where("division_id", '==', req.body.division_id).
    where("standard_id", '==', req.body.standard_id).get()
        .then((userDetail) => {

        if(userDetail.size > 0){
            res.send("This class already has a teacher assigned")
            flag = 1
        }else {
            firebase.firestore().collection("Teacher").doc(req.body.teacher_id).get().then(async (data) => {
                if(data.data()){
                    if(data.data().division_id == 0 && data.data().standard_id == 0){
                        await db.collection("Teacher").doc(req.body.teacher_id).update({
                            division_id: req.body.division_id,
                            standard_id: req.body.standard_id
                        }).then((data) => {
                            res.send("Teacher assigned successfully")
                        }).catch((err) => {
                            res.send(err)
                        })
                    }else {
                        res.send("Already a class teacher")
                    }
                }else {
                    res.send("No teacher available")
                }

            })
        }
    }).catch((error) => {
       res.send(error)
    })
})

router.post('/fileUpload',multer.single('file'), (req, res, next) => {

    let file = req.file;
    if (file) {
        uploadImageToStorage(file).then((success) => {
            res.statusCode = 200
            res.send("file uploaded successfully")
        }).catch((error) => {
            console.error(error);
            res.send(error)
        });
    }
})

const uploadImageToStorage = (file) => {
    let prom = new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment. '+error);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            console.log(url)
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
    return prom;
}

module.exports=router;