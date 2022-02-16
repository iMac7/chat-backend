const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // console.log(req.headers.authorization)
    // next()
    const token = req.cookies.jwt
    console.log(token);

    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log('invalid token, redirecting to login')
                res.json('/login')
            } else {
                console.log(decodedToken)
                console.log("token ok")
                next()
            }
        })
    } else {
        res.json('/login')
    }
}



// req.headers.authorization.split('')[1]