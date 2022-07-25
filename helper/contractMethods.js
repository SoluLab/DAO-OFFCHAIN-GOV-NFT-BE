const { ethers } = require("ethers");
const nftABI = require("../helper/nft.json");
var url = `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`;
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);

module.exports.getUserBalanceAtBlockNumber = async (blockNumber) => {
    const nftContract = new ethers.Contract(process.env, nftABI, customHttpProvider);

    const balance = await nftContract.balanceOf(blockNumber);
    return balance;
}
