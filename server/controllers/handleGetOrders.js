const orderCollection = require("../model/orderModel");

const handleGetOrders = async (req, res) => {
    try {
        const { storeId, filter } = req.query;

        // Define the aggregation pipeline
        const pipeline = [
            {
                // Match documents by storeId
                $match: { storeId: storeId }
            },
            {
                // Add a field for the last status message
                $addFields: {
                    lastStatus: { $arrayElemAt: [{ $reverseArray: '$status.message' }, 0] } // Get the last status message
                }
            },
            {
                // Filter based on the last status message if filter is provided
                $match: filter && filter !== 'All' ? { lastStatus: filter } : {}
            },
            {
                // Sort documents by createdAt in descending order (latest first)
                $sort: { createdAt: -1 }
            }
        ];

        // Execute the aggregation
        const orders = await orderCollection.aggregate(pipeline).exec();

        res.send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while fetching orders' });
    }
};

module.exports = handleGetOrders;
