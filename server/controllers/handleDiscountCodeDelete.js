const { default: mongoose } = require("mongoose");
const discountCodeCollection = require("../model/discountCodeModel");

const handleDiscountCodeDelete = async (req, res) => {
    try {
        const id = req.query;

        await discountCodeCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
        res.send({ message: "success" });
    }

    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}


module.exports = handleDiscountCodeDelete;