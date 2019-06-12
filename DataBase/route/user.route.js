const {Router} = require('express')
let router = Router()
const {connection} = require('../db')

router.get('/', (req, res) => {
    connection.query('Select * from Users where is_active = 1', (err, data) => {
        if(err){
            res.json({success: 0, error: err})
        }else {
            if(data.length ==0){
                res.json({success: 0, error: "No data found"})
            }else {
                res.json({success: 1, data})
            }
        }
    })
})

module.exports = router