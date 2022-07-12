const mongoose = require('mongoose')

const SignatureSchema = new mongoose.Schema({
    userAddress: { type : String},
    sign: { type : String}
})

const ProposalSchema = new mongoose.Schema({
    proposalHash: { type: String, required: true },
    signatureCounts: { type: String, required: true },
    signature: [SignatureSchema]
})

module.exports = mongoose.model(
    'ProposalSchema',
    ProposalSchema,
    'proposalSchema'
  )