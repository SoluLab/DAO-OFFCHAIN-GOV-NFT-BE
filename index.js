require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
// const initMongo = require('./config/db')
// const _pinata = require('./helper/pinata')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const proposalRouter = require('./routes/index');

app.use(express.static(__dirname + "public"));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use('/proposal', proposalRouter);

app.use(cors())

app.get('/', (req, res) => {
    res.json("Server is running");
})

// app.post('/', (req, res) => {
//     console.log('%c 🍱 req: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', req.body);
//     res.json("Server is running");
// })

app.use(function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send({ success: false, message: "404 Not Found" });
});

app.use(function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.json({ success: false, message: "500 Server Error", data: err.stack });
    next(err);
});

// initMongo()

app.listen(process.env.PORT,() => {
    console.log('%c 🍧 server is listening on port 3000', process.env.PORT);
})
