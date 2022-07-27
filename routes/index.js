const express = require("express");
const router = express.Router();
const {
  createProposal,
  getAllProposal,
  getProposalByHash,
  getMyProposals,
  countVotes,
} = require("../controller/proposal");
const { addSignature } = require("../controller/signature");

router.post("/", createProposal);

router.get("/", getAllProposal);

router.get("/:proposalHash", getProposalByHash);

router.get("/myProposal/:userAddress", getMyProposals);

router.get("/MyVote/:proposalHash", countVotes);

router.put("/:proposalHash", addSignature);

module.exports = router;
