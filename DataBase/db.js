const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Demo',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

module.exports = {
    connection
}