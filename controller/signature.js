const pinata = require("../helper/pinata");
const proposalModel = require("../models/proposal");
const { getUserBalanceAtBlockNumber } = require("../helper/contractMethods");
const { verifyMessage } = require("../helper/verifySignature");

module.exports.addSignature = async (req, res) => {
  try {
    // let result = verifyMessage(req.body);
    // if(result){
    //     res.status(200).json({'success': true, message:"Signature Verified", 'data': null})
    // }else{
    //     res.status(500).json({'success': false, message:"Signature not Verified", 'data': null})
    // }
    console.log(
      "%c 🍧 req.body.signature.userAddress: ",
      "font-size:20px;background-color: #33A5FF;color:#fff;",
      req.body.signature.userAddress
    );
    let balance = await getUserBalanceAtBlockNumber(
      req.body.signature.userAddress
    );
    if (
      req.body.votingPower <= balance &&
      req.body.votingPower <= req.body.signature.tokenId.length
    ) {
      proposalModel
        .findOneAndUpdate(
          { proposalHash: req.params.proposalHash },
          {
            $inc: { voteCounts: req.body.votingPower },
            $push: { voteSignature: req.body.signature },
          },
          { useFindAndModify: false, new: true }
        )
        .exec(async function (error, result) {
          if (error) {
            res
              .status(500)
              .json({
                status: false,
                message: "Error While add supplier",
                data: null,
              });
          } else {
            if (result) {
              const votingOptions = [];
              result.votingOptions.forEach((element) => {
                if (element.index == req.body.signature.vote) {
                  votingOptions.push({
                    index: element.index,
                    option: element.option,
                    count: element.count + req.body.votingPower,
                    _id: element._id,
                  });
                } else {
                  votingOptions.push(element);
                }
              });
              const data123 = await proposalModel.findOneAndUpdate(
                { _id: result._id },
                {
                  $set: {
                    votingOptions: votingOptions,
                  },
                },
                { new: true }
              );
              res
                .status(200)
                .json({
                  status: true,
                  message: "Signature added successfully...!",
                  data: data123,
                });
            }
          }
        });
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: "user doesn't have enough voting power",
        });
    }
  } catch (err) {
    res.status(500).json({ success: false, data: err.Error });
  }
};
