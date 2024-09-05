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
        require: true
    },
    storeId: {
        type: String,
        require: true
    }
});


const storeCollection = mongoose.model("stores", storeSchema);

module.exports = storeCollection;