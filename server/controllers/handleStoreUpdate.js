const storeCollection = require("../model/storeModel");

const handleStoreUpdate = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;
        const result = await storeCollection.findOneAndUpdate({ _id: id }, { storeName: data?.storeName, location: data?.location, stripeSecret: data?.stripeSecret, yocoSecret: data?.yocoSecret });
        res.send(result);
    }
    catch (error) {
        console.log(error.message)
    }
}


module.exports = handleStoreUpdate;