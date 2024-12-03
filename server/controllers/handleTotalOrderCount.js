const orderCollection = require("../model/orderModel");
const storeCollection = require("../model/storeModel");

const handleTotalOrderCount = async (req, res) => {
    try {
        const { id } = req.query;
        const requestedStore = await storeCollection.findOne({ _id: id });
        const result = await orderCollection.find({ storeId: requestedStore?.storeId });
        res.send({ total: result.length });
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = handleTotalOrderCount;