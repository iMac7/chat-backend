const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()


module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }
    const token = req.headers.authorization.token
        // console.log(token);
        // next()

    if (token) {
        try {
            jwt.verify(token, process.env.secret, (err, decodedToken) => {
                if (err) {
                    console.log('invalid token, redirecting to login')
                    res.status(403).json('/login')
                } else {
                    console.log(decodedToken)
                    console.log("token ok")
                    next()
                }
            })
        } catch (error) {
            console.log(error);
        }

    } else {
        res.status(401).json('/login')
    }
}

//TODO pass user down to the next middleware (JSON.parse(req.headers.authorization).user = user)