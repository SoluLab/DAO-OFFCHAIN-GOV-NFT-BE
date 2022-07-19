const mongoose = require('mongoose')

const SignatureSchema = new mongoose.Schema({
    userAddress: { type : String},
    sign: { type : String}
})

const ProposalSchema = new mongoose.Schema({
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
    signatureCounts: { type: String },
    signature: [SignatureSchema]
})

module.exports = mongoose.model(
    'ProposalSchema',
    ProposalSchema,
    'proposalSchema'
  )