const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config/general');

exports.verifiedToken = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err, decoded) => {
            if(err){
                res.statusCode = 200
                return res.json({error: err})
            }
            req.decoded = decoded;
            next();
        })
    }else{
        res.statusCode = 200
        res.json({success:0, error:'Token is required.'})
    }
}