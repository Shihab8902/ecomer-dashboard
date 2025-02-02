const { default: mongoose } = require("mongoose");
const discountCodeCollection = require("../model/discountCodeModel");

const handleDiscountCodeUpdate = async (req, res) => {
    try {
        const { id, activate } = req.query;
        const data = req.body;


        //Activate or deactivate code
        if (activate) {
            if (activate === "false") {
                await discountCodeCollection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { isActive: false });
                return res.status(201).send({ message: "deactivated" });
            }

            await discountCodeCollection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { isActive: true });
            return res.status(201).send({ message: "activated" });
        }


        //Update content
        if (data) {
            await discountCodeCollection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, data);
            res.status(201).send({ message: "success" });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}


module.exports = handleDiscountCodeUpdate;