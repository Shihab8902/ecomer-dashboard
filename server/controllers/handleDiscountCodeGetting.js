const discountCodeCollection = require("../model/discountCodeModel");

const handleDiscountCodeGetting = async (req, res) => {
    try {
        const { storeId } = req.query;
        const discountCodes = await discountCodeCollection.find({ storeId });
        res.status(200).send(discountCodes);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = handleDiscountCodeGetting;