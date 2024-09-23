const orderCollection = require("../model/orderModel");

const handleGetOrders = async (req, res) => {
    try {
        const { storeId, filter } = req.query;


        const pipeline = [
            {

                $match: { storeId: storeId }
            },
            {
                $match: { paymentMethod: { $ne: "unknown" } }
            },
            {

                $addFields: {
                    lastStatus: { $arrayElemAt: [{ $reverseArray: '$status.message' }, 0] }
                }
            },
            {

                $match: filter && filter !== 'All' ? { lastStatus: filter } : {}
            },
            {

                $sort: { createdAt: -1 }
            }
        ];

        // Execute 
        const orders = await orderCollection.aggregate(pipeline).exec();

        res.send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while fetching orders' });
    }
};

module.exports = handleGetOrders;
