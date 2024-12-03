const storeCollection = require("../model/storeModel");

const handleGetStoreId = async (req, res) => {
    try {
        const admin = req.query.admin;
        const storeInfo = await storeCollection.find({ admin: admin });
        res.send(storeInfo);
    }
    catch (error) {
        console.log(error);

    }
}


module.exports = handleGetStoreId;