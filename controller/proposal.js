const pinata = require('../helper/pinata');

module.exports.createProposal = async (req, res) => {
    try{
        console.log('%c 🥕 req.body: ', 'font-size:20px;background-color: #42b983;color:#fff;', req.body);
        let result = await pinata.pinJSON(req.body);
        res.status(200).json({'success': true, 'data': result})
    }catch(err){
        console.log('%c 🌽 err: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', err);
        res.status(500).json({'success': false, 'data': err.Error})
    }
}