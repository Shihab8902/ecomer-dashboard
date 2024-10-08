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
    }
});


const storeCollection = mongoose.model("stores", storeSchema);

module.exports = storeCollection;