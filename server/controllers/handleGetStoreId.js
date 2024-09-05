const storeCollection = require("../model/storeModel");

const handleGetStoreId = async (req, res) => {
    try {
        const admin = req.query.admin;
        const storeInfo = await storeCollection.findOne({ admin: admin });
        console.log(storeInfo)
        res.send(storeInfo?.storeId);
    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = handleGetStoreId;