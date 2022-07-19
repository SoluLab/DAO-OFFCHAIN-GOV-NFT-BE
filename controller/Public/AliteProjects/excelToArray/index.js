// import framework
const express = require("express");
var fs = require('fs');
const airdropData = require('./yfdai-ktx-usdt-refunds.json');
var _ = require("underscore");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const splitData = () => {
    
    console.log('%c 🍧 data: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', airdropData[1]);
    let arrayAddressData = _.pluck(airdropData, "Adresses");
    let arrayAmountData = _.pluck(airdropData, "Amount");
    let dividedAddressData = _.chunk(arrayAddressData, 250);
    let dividedAmountData = _.chunk(arrayAmountData, 250);
    fs.writeFileSync("./refund-addresses-latest.txt", JSON.stringify(dividedAddressData));
    fs.writeFileSync("./refund-amounts-latest.txt", JSON.stringify(dividedAmountData));
    // console.log('%c 🍶 dividedData: ', 'font-size:20px;background-color: #465975;color:#fff;', JSON.stringify(dividedAddressData));
    // console.log('%c 🍻 arrayData: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', JSON.stringify(dividedAmountData));
}
// splitData();

const splitAddress = () => {
    
    console.log('%c 🍧 data: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', airdropData[1]);
    let arrayAddressData = _.pluck(airdropData, "Address");
    let arrayAmountData = _.pluck(airdropData, "Amount");
    console.log('%c 🍭 arrayAmountData: ', 'font-size:20px;background-color: #B03734;color:#fff;', arrayAmountData);
    for(let i = 0; i < arrayAmountData.length; i++){
        arrayAmountData[i] = arrayAmountData[i]*(10**18)
    }
    console.log('%c 🍞 arrayAmountData: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', arrayAmountData);
    let dividedAddressData = _.chunk(arrayAddressData, 250);
    let dividedAmountData = _.chunk(arrayAmountData, 250);
    fs.writeFileSync("./demo.txt", JSON.stringify(dividedAddressData));
    fs.writeFileSync("./demo.txt", JSON.stringify(dividedAmountData));
    // console.log('%c 🍶 dividedData: ', 'font-size:20px;background-color: #465975;color:#fff;', JSON.stringify(dividedAddressData));
    // console.log('%c 🍻 arrayData: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', JSON.stringify(dividedAmountData));
}
splitAddress();

//custom 404 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send({ success: false, message: '404 Not Found' });
});

app.use(function(err, req, res, next) {
    res.type('text/plain');
    res.status(500);
    res.json({ success: false, message: '500 Server Error', data: err.stack });
    next(err);
});

const server = app.listen(5000, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
})