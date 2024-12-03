const storeCollection = require("../model/storeModel");

const handleStoreUpdate = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;
        const result = await storeCollection.findOneAndUpdate({ _id: id }, { storeName: data?.storeName, location: data?.location, storeCurrency: data?.storeCurrency });
        res.send(result);
    }
    catch (error) {
        res.send(error.message);
        console.log(error);
    }
}


module.exports = handleStoreUpdate;