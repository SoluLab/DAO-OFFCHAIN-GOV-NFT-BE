require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs')

const initMongo = require('./config/db')
// const _pinata = require('./helper/pinata')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const proposalRouter = require('./routes/index');

app.use(express.static(__dirname + "public"));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use('/proposal', proposalRouter);

app.get('/', (req, res) => {
    res.json("Server is running");
})

app.post('/', (req, res) => {
    const customer = {
    name: "Newbie Co.",
    order_count: 0,
    address: "Po Box City",
}
    fs.writeFileSync("./newCustomer.json", JSON.stringify(customer));
    res.json("Done!!");
})

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

initMongo()

app.listen(process.env.PORT,() => {
    console.log('%c 🍧 server is listening on port 3000', process.env.PORT);
})
