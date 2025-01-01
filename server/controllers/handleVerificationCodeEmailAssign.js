const discountCodeCollection = require("../model/discountCodeModel");

const handleVerificationCodeEmailAssign = async (req, res) => {
    try {
        const { email, storeId, code } = req.body;


        //Assign user email to the discount code data
        const requestedDiscountCode = await discountCodeCollection.findOne({ storeId, discountCode: code });
        if (requestedDiscountCode) {
            requestedDiscountCode.usedCustomers.push(email);
            await requestedDiscountCode.save();
            return res.status(200).json({ message: "success" });
        }

        res.status(404).json({ message: "Discount code not found" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = handleVerificationCodeEmailAssign;