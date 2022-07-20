const mongoose = require('mongoose')

const SignatureSchema = new mongoose.Schema({
    userAddress: { type : String},
    vote: {type: Number},
    sign: { type : String}
})

const ProposalSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: true
    },
    proposalName: {
        type: String, required: true
    },
    proposalDesc: {
        type: String, required: true
    },
    proposalQuoram: {
        type: Number, required: true
    },
    proposalHash: { type: String },
    signatureCounts: { type: Number },
    signature: [SignatureSchema]
})

module.exports = mongoose.model(
    'ProposalSchema',
    ProposalSchema,
    'proposalSchema'
  )