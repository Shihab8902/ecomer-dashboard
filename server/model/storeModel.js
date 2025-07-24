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
    currencyPosition: {
        type: String,
        default: "start"
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
    },
    tax: {
        type: Number,
        default: 0
    }

});


const storeCollection = mongoose.model("stores", storeSchema);

module.exports = storeCollection;