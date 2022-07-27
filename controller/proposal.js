const pinata = require("../helper/pinata");
const proposalModel = require("../models/proposal");

module.exports.createProposal = async (req, res) => {
  try {
    let pinataResponse = await pinata.pinJSON(req.body);
    req.body["proposalHash"] = pinataResponse.IpfsHash;
    var newProposal = new proposalModel(req.body);
    newProposal.save(async function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Error While creating proposal",
          data: null,
        });
      } else {
        if (result) {
          res.status(200).json({
            status: true,
            message: "proposal created successfully..!",
            data: result,
          });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, data: err.Error });
  }
};

module.exports.getAllProposal = async (req, res) => {
  try {
    proposalModel.find(async function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Error While getting proposal list",
          data: null,
        });
      } else {
        if (result) {
          res.status(200).json({
            status: true,
            message: "proposal list retrieve successfully..!",
            data: result,
          });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, data: err.Error });
  }
};

module.exports.getProposalByHash = async (req, res) => {
  try {
    let data = await proposalModel.find({
      proposalHash: req.params.proposalHash,
    });

    if (data) {
      res.status(200).json({
        status: true,
        message: "proposal retrieve successfully..!",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, data: err.Error });
  }
};

module.exports.getMyProposals = async (req, res) => {
  try {
    let data = await proposalModel.find({
      userAddress: req.params.userAddress,
    });

    if (data) {
      res.status(200).json({
        status: true,
        message: "proposal retrieve successfully..!",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, data: err.Error });
  }
};

module.exports.countVotes = async (req, res) => {
  try {
    let data = await proposalModel.aggregate([
      {
        $match: { proposalHash: req.params.proposalHash },
      },
      { $unwind: "$voteSignature" },
      { $match: { "voteSignature.userAddress": req.query.userAddress } },
      { $project: { _id: 0, voteSignature: 1 } },
    ]);

    if (data) {
      res.status(200).json({
        status: true,
        message: "Vote retrieve successfully..!",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, data: err.Error });
  }
};
