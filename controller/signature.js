const pinata = require('../helper/pinata');
const proposalModel = require('../models/proposal');

module.exports.addSignature = async (req, res) => {
    try{

        proposalModel.findOneAndUpdate({proposalHash: req.params.proposalHash}, {$inc: {signatureCounts: 1}, $push : {signature: req.body.signature } }, {useFindAndModify: false, new: true}).exec(function(error, result){
            if(error){
                res.status(500).json({ status: false, message: "Error While add supplier", data: null });
            }else{
                if (result) {
                    res.status(200).json({ status: true, message : "Signature added successfully...!", data: result });
                }
            }
        });
       
    }catch(err){
        res.status(500).json({'success': false, 'data': err.Error})
    }
}
