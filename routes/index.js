const express = require('express')
const router = express.Router()
const {createProposal, getAllProposal, getProposalByHash} = require('../controller/proposal');

router.post('/', createProposal);

router.get('/', getAllProposal);

router.get('/:ipfsHash', getProposalByHash);

module.exports = router