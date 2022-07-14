const express = require('express')
const router = express.Router()
const {createProposal} = require('../controller/proposal');

router.post('/', createProposal);

module.exports = router