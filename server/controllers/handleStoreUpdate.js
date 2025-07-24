const { default: mongoose } = require("mongoose");
const storeCollection = require("../model/storeModel");

const handleStoreUpdate = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const updateFields = {};

        if (data.storeName !== undefined) {
            updateFields.storeName = data.storeName;
        }
        if (data.tax !== undefined) {
            updateFields.tax = data.tax;
        }
        if (data.location !== undefined) {
            updateFields.location = data.location;
        }
        if (data.storeCurrency !== undefined) {
            updateFields.storeCurrency = data.storeCurrency;
        }
        if (data.customerEmailTemplate !== undefined) {
            updateFields.customerEmailTemplate = data.customerEmailTemplate;
        }
        if (data.ownerEmailTemplate !== undefined) {
            updateFields.ownerEmailTemplate = data.ownerEmailTemplate;
        }
        if (data.shippingMethods !== undefined) {
            updateFields.shippingMethods = data.shippingMethods;
        }
        if (data.currencyPosition !== undefined) {
            updateFields.currencyPosition = data.currencyPosition;
        }

        const result = await storeCollection.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: updateFields }
        );

        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
};

module.exports = handleStoreUpdate;
