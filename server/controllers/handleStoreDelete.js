const orderCollection = require("../model/orderModel");
const storeCollection = require("../model/storeModel");

const handleStoreDelete = async (req, res) => {
    try {
        const { storeId } = req.query;

        const deleteResult = await storeCollection.deleteOne({ storeId: storeId });

        if (deleteResult?.deletedCount > 0) {
            //Delete related orders from database
            await orderCollection.deleteMany({ storeId: storeId });
            res.send("success");
            return;
        }

        res.status(500).send("operation failed!");

    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}


module.exports = handleStoreDelete;