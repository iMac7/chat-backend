const express = require('express')
const bodyParser = require('body-parser')
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


app.get('/', (req, res) => console.log('get / successful'))
app.post('/', (req, res) => console.log(req.body))

app.listen(port, () => console.log(`listening on port ${port}!`))