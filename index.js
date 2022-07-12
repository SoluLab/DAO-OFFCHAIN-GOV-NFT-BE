const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const path = require('path')
const initMongo = require('./config/db')

require('dotenv').config()

app.use(express.static(__dirname + "public"));
app.use(express.static(path.resolve(__dirname, "./public")));

// for parsing json
app.use(
    bodyParser.json({
      limit: '20mb'
    })
  )

// for parsing application/x-www-form-urlencoded
app.use(
bodyParser.urlencoded({
    limit: '20mb',
    extended: true
}))
  

app.use(cors())

app.get('/', (req, res) => {
    res.json("Server is running");
})

initMongo()

app.listen(process.env.PORT,() => {
    console.log('%c 🍧 server is listening on port 3000', process.env.PORT);
})
