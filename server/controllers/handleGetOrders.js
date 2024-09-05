const orderCollection = require("../model/orderModel");

const handleGetOrders = async (req, res) => {
    try {
        const storeId = req.query.storeId;

        //Send data based on store id
        const orders = await orderCollection.find({ storeId: storeId });
        res.send(orders);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = handleGetOrders;