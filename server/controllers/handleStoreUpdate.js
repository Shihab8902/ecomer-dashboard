const storeCollection = require("../model/storeModel");

const handleStoreUpdate = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const updateFields = {};

        switch (true) {
            case (data.storeName !== undefined):
                updateFields.storeName = data.storeName;
                break;
            case (data.location !== undefined):
                updateFields.location = data.location;
                break;
            case (data.storeCurrency !== undefined):
                updateFields.storeCurrency = data.storeCurrency;
                break;
            case (data.customerEmailTemplate !== undefined):
                updateFields.customerEmailTemplate = data.customerEmailTemplate;
                break;
            case (data.ownerEmailTemplate !== undefined):
                updateFields.ownerEmailTemplate = data.ownerEmailTemplate;
                break;
        }

        const result = await storeCollection.findOneAndUpdate(
            { _id: id },
            updateFields,
            { new: true }
        );

        res.send(result);
    } catch (error) {
        res.send(error.message);
        console.log(error);
    }
};

module.exports = handleStoreUpdate;
