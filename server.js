const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listening on port ${port}!`))