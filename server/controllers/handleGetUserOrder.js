const orderCollection = require("../model/orderModel");

const handleGetUserOrder = async (req, res) => {
    try {
        const { storeId, user } = req.query;

        const shopWiseOrders = await orderCollection.find({ storeId: storeId, paymentMethod: { $ne: "unknown" } });
        const userOrders = shopWiseOrders?.filter(order => order.shipping_details.email === user);
        res.send(userOrders);
    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = handleGetUserOrder;