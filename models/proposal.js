const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
  userAddress: { type: String },
  voteFor: { type: Number },
  voteCount: { type: Number },
  sign: { type: String },
  tokenId: [{ type: Number }],
});

const VotingSchema = new mongoose.Schema({
  index: { type: Number },
  option: { type: String },
  count: { type: Number, default: 0 },
});

const ProposalSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  proposalName: {
    type: String,
    required: true,
  },
  proposalDesc: {
    type: String,
    required: true,
  },
  proposalQuoram: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  snapshotBlockNumber: {
    type: Number,
    required: true,
  },
  proposalSignature: {
    type: String,
    required: true,
  },
  votingOptions: [VotingSchema],
  proposalHash: { type: String },
  voteCounts: { type: Number, default: 0 },
  voteSignature: [SignatureSchema],
});

module.exports = mongoose.model(
  "ProposalSchema",
  ProposalSchema,
  "proposalSchema"
);
