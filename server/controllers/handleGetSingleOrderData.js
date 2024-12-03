const { default: mongoose } = require("mongoose");
const orderCollection = require("../model/orderModel");

const handleGetSingleOrderData = async (req, res) => {
    try {
        const id = req.query.id;
        const result = await orderCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        res.send(result);
    }
    catch (error) {

        console.log(error);
    }
}



module.exports = handleGetSingleOrderData;