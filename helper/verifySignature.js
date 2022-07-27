const { ethers }= require("ethers");

module.exports.verifyMessage = async (data) => {
    console.log('%c 🍋 data: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', data);
    try {
        const signerAddr = await ethers.utils.verifyMessage(data.signature.vote, data.signature.sign);
        if (signerAddr !== data.signature.userAddress) {
            console.log("Not  Successssssssssss");
            return false
            // res.status(500).json({ status: false, message: "Signature mismatch", data: null });
        }
        console.log("Successssssssssss");
        return true;
        // res.status(200).json({ status: true, message : "Signature verified...!", data: null });
    } catch (err) {
      console.log(err);
      return false;
    }
  };