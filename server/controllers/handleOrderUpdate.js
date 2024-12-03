const orderCollection = require("../model/orderModel");

const handleOrderUpdate = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const order = await orderCollection.findOne({ _id: id });
        if (order) {

            const updateFields = {};


            if (data.exp_deliver) {
                updateFields.exp_deliver = data.exp_deliver;
            }
            if (data.newStatus) {
                updateFields.status = [...order.status, data.newStatus];
            }
            if (data.newTimelineStatus) {
                updateFields.timelineStatus = [...order.timelineStatus, data.newTimelineStatus];
            }
            if (data.note) {
                updateFields.note = data.note
            }
            if (data.paymentStatus) {
                updateFields.paymentStatus = data.paymentStatus
            }


            if (Object.keys(updateFields).length > 0) {
                const result = await orderCollection.findOneAndUpdate({ _id: id }, { $set: updateFields }, { new: true });
                res.send(result);
            } else {
                res.send("No valid data to update");
            }

            return;
        }

        res.send("Order not found");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = handleOrderUpdate;
