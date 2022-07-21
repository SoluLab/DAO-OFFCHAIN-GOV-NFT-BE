const pinata = require('../helper/pinata');
const proposalModel = require('../models/proposal');

module.exports.addSignature = async (req, res) => {
    try{

        proposalModel.findOneAndUpdate({proposalHash: req.params.proposalHash}, {$inc: {signatureCounts: 1}, $push : {signature: req.body.signature } }, {useFindAndModify: false, new: true}).exec(async function(error, result){
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
                //    const data123=  await proposalModel.votingOptions.findOne({index : req.body.index})
                   const data123 =  await proposalModel.findOneAndUpdate({_id : result._id}, {$set : {
                    votingOptions : votingOptions
                   }}, {new : true})
                   console.log('%c 🍩 data123: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', data123);
                    res.status(200).json({ status: true, message : "Signature added successfully...!", data: data123 });
                }
            }
        });
       
    }catch(err){
        res.status(500).json({'success': false, 'data': err.Error})
    }
}
