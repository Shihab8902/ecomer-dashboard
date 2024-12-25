const discountCodeCollection = require("../model/discountCodeModel");

const handleDiscountCodeVerify = async (req, res) => {
    try {
        const { storeId, code, usingAmount } = req.body;

        //Check if the code is valid
        const discountCode = await discountCodeCollection.findOne({ storeId, discountCode: code });


        if (!discountCode) {
            return res.status(404).json({ message: "Enter a valid discount code" });
        }

        //Check if discount code is active
        const isActive = discountCode?.isActive;
        if (!isActive) {
            return res.status(400).json({ message: "Enter a valid discount code" });
        }

        //Check if max use amount reached
        if (discountCode?.maxUse > 0) {
            const isAmountReached = discountCode?.maxUse === discountCode?.usedCustomers.length;
            if (isAmountReached) {
                return res.status(400).json({ message: "Discount code has reached its maximum usage" });
            }
        }


        //Check if the user has the minimum required amount to use the code
        if (discountCode?.minRequiredAmount > 0) {
            if (discountCode?.minRequiredAmount > parseInt(usingAmount)) {
                return res.status(400).json({ message: "Minimum required amount not reached" });
            }
        }

        //Check if the user already used the code once
        // if (discountCode?.oncePerCustomer) {
        //     const isUsed = discountCode?.usedCustomers.includes(email);
        //     if (isUsed) {
        //         return res.status(400).json({ message: "Discount code already used" });
        //     }
        // }

        //Check if discount code usage date ends
        if (discountCode?.endsAt) {
            const isExpired = new Date(discountCode?.endsAt) < new Date();
            if (isExpired) {
                return res.status(400).json({ message: "Discount code expired" });
            }
        }

        //Let the user use the code if everything is fine
        //Include the user to the used customers list
        // discountCode.usedCustomers.push(email);
        // await discountCode.save();
        res.status(200).json({
            message: "success", codeData: {
                discountType: discountCode.discountType,
                discountValueType: discountCode.discountValueType,
                discountValue: discountCode.discountValue,
                discountCode: discountCode.discountCode
            }
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}


module.exports = handleDiscountCodeVerify;