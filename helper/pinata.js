const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

module.exports.pinJSON = (body) => {
    const options = {
        pinataOptions: {
            cidVersion: 0
        }
    };
    return new Promise((resolve, reject) => {
        pinata.pinJSONToIPFS(body, options).then((result) => {
            //handle results here
            console.log(result);
            resolve(result);
        }).catch((err) => {
            //handle error here
            console.log(err);
            reject(err);
        });
    })
}