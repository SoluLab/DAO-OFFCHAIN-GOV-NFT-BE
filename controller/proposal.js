const pinata = require('../helper/pinata');
const proposalModel = require('../models/proposal');

module.exports.createProposal = async (req, res) => {
    try{
        let pinataResponse = await pinata.pinJSON(req.body);
        req.body['proposalHash'] = pinataResponse.IpfsHash;
        var newProposal = new proposalModel(req.body);
        newProposal.save(async function(error, result){
            if(error){
                console.log(error);
                res.status(200).json({ status: false, message: "Error While creating proposal", data: null });
            }else{
                if (result) {
                    res.status(200).json({ status: true, message : "proposal created successfully..!", data: result });
                }
            }
        });
    }catch(err){
        console.log('%c 🌽 err: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', err);
        res.status(500).json({'success': false, 'data': err.Error})
    }
}

module.exports.getAllProposal = async (req, res) => {
    try{
        // var newProposal = new proposalModel();
        proposalModel.find(async function(error, result){
            if(error){
                console.log(error);
                res.status(200).json({ status: false, message: "Error While creating proposal", data: null });
            }else{
                if (result) {
                    console.log('%c 🍨 result: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', result);
                    // let pinataResponse = await pinata.pinJSON(req.body);
                    // result['proposalHash'] = pinataResponse.IpfsHash;
                    // console.log('%c 🍷 pinataResponse: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', pinataResponse);
                    res.status(200).json({ status: true, message : "proposal created successfully..!", data: result });
                }
            }
        });
    }catch(err){
        console.log('%c 🌽 err: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', err);
        res.status(500).json({'success': false, 'data': err.Error})
    }
}

module.exports.getProposalByHash = async (req, res) => {
    try{
        // var newProposal = new proposalModel();
        console.log('%c 🍼️ req.params.ipfsHash: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', req.params.ipfsHash);
        let data = await proposalModel.find({proposalHash : req.params.ipfsHash});
        console.log('%c 🍦 data: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', data);

                if (data) {
                    // let pinataResponse = await pinata.pinJSON(req.body);
                    // result['proposalHash'] = pinataResponse.IpfsHash;
                    // console.log('%c 🍷 pinataResponse: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', pinataResponse);
                    res.status(200).json({ status: true, message : "proposal created successfully..!", data: data });
                }
    }catch(err){
        console.log('%c 🌽 err: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', err);
        res.status(500).json({'success': false, 'data': err.Error})
    }
}