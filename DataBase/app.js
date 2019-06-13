const express = require('express')
const cors = require('cors')
const user = require('./route/user.route')

const {connection} = require('./db')

connection.connect()

let app = express()

app.use(cors())

app.use('/user', user)

app.listen(3000, (err, res) => {
    if (err)
        console.log(err)
    else {
        console.log('server listening on port 3000')
    }
})