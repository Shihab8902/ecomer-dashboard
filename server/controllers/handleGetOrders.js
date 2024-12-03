const { default: mongoose } = require("mongoose");
const orderCollection = require("../model/orderModel");


const handleGetOrders = async (req, res) => {
    try {
        const { storeId, search } = req.query;


        //Aggregation pipeline
        const pipeline = [
            //Select specific store
            { $match: { storeId: storeId } },
            // Exclude orders with unknown payment methods
            { $match: { paymentMethod: { $ne: "unknown" } } },
            // Filter by search term if provided
            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                { orderNumber: { $regex: search, $options: "i" } },
                                { paymentStatus: { $regex: search, $options: "i" } },
                                { paymentMethod: { $regex: search, $options: "i" } },
                                { "shipping_details.name": { $regex: search, $options: "i" } },
                                { "shipping_details.email": { $regex: search, $options: "i" } },
                                {
                                    $expr: {
                                        $regexMatch: {
                                            input: { $arrayElemAt: [{ $reverseArray: "$status.message" }, 0] },
                                            regex: search,
                                            options: "i"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
                : []),
            { $sort: { createdAt: -1 } }

        ];

        // Execute the pipeline
        const orders = await orderCollection.aggregate(pipeline).exec();

        res.send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while fetching orders' });
    }
};

module.exports = handleGetOrders;
