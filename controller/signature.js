const pinata = require('../helper/pinata');
const proposalModel = require('../models/proposal');
const {getUserBalanceAtBlockNumber} = require('../helper/contractMethods');

module.exports.addSignature = async (req, res) => {
    try{
        if(req.body.votingPower <= getUserBalanceAtBlockNumber(req.body.userAddress)){

            proposalModel.findOneAndUpdate({proposalHash: req.params.proposalHash}, {$inc: {voteCounts: 1}, $push : {voteSignature: req.body.signature } }, {useFindAndModify: false, new: true}).exec(async function(error, result){
                if(error){
                    res.status(500).json({ status: false, message: "Error While add supplier", data: null });
                }else{
                    if (result) {
                        const votingOptions = []
                        result.votingOptions.forEach((element) => {
                            if(element.index == req.body.index){
                                votingOptions.push({
                                    index: element.index,
                                    option: element.option,
                                    count: element.count + 1,
                                    _id : element._id
                                })
                            }else {
                                votingOptions.push(element)
                            }
                        })
                    const data123 =  await proposalModel.findOneAndUpdate({_id : result._id}, {$set : {
                        votingOptions : votingOptions
                    }}, {new : true})
                    console.log('%c 🍩 data123: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', data123);
                        res.status(200).json({ status: true, message : "Signature added successfully...!", data: data123 });
                    }
                }
            });
        } else{
            res.status(500).json({'success': false, 'data': "user doesn't have enough voting power"})
        }
    }catch(err){
        res.status(500).json({'success': false, 'data': err.Error})
    }
}
