const mongoose = require("mongoose");



const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        require: true
    },
    admin: {
        type: String,
        require: true
    },
    stripeSecret: {
        type: String,
    },
    yocoSecret: {
        type: String
    },
    storeId: {
        type: String,
        require: true
    },
    location: {
        type: Object,
        require: true
    },
    allowCod: {
        type: Boolean,
        default: true
    },
    emailUsage: {
        type: Number
    },
    storeCurrency: {
        type: String,
        default: "$"
    },
    setupSteps: {
        type: [Object]
    },
    customerEmailTemplate: {
        type: Object,

    },
    ownerEmailTemplate: {
        type: Object
    },
    shippingMethods: {
        type: [Object],
        default: []
    }

});


const storeCollection = mongoose.model("stores", storeSchema);

module.exports = storeCollection;