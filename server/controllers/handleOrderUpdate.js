const orderCollection = require("../model/orderModel");

const handleOrderUpdate = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;
        //Get the order based on id
        const order = await orderCollection.findOne({ _id: id });
        const result = await orderCollection.findOneAndUpdate({ _id: id }, { exp_deliver: data.exp_deliver, status: [...order.status, data.newStatus] });
        res.send(result);
    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = handleOrderUpdate;