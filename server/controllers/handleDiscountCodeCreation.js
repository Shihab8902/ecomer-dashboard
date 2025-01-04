const discountCodeCollection = require("../model/discountCodeModel");

const handleDiscountCodeCreation = async (req, res) => {
    try {
        const { storeId, discountCode, discountType } = req.body;
        const data = req.body;

        //Check if same store has same discount code
        const isExist = await discountCodeCollection.findOne({ storeId, discountCode, isActive: true, discountType });
        if (isExist) {
            return res.status(409).json({ message: "Discount code already exists" });
        }

        //Create discount code
        const newDiscountCode = new discountCodeCollection(data);
        const result = await newDiscountCode.save();
        if (result) {
            return res.status(200).json({ message: "Discount code created successfully" });
        }

        res.send("Operation failed");

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = handleDiscountCodeCreation;