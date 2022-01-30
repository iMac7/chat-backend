if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./User')
const bcrypt = require('bcrypt')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')



const connectionString = 'mongodb://localhost/Users'

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connected"))
    .catch((e) => console.log(e))

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE'))
    next()
})
app.use(cookieParser())

app.use(authRoutes)

app.get('/', (req, res) => {})




app.listen(port, () => console.log(`listening on port ${port}!`))