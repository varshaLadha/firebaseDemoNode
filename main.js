const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoute = require('./router/user.routes')

let app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userRoute);

app.listen(3000, (err, res) => {
    if(err){
        console.log("Error occurred "+err.toString());
    } else {
        console.log("Server is listening on port 3000")
    }
})