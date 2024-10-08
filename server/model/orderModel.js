const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    subtotal: {
        type: Number
    },
    currency: {
        type: String
    },
    shipping_details: {
        type: Object,
        require: true
    },
    status: {
        type: Array,

    },
    exp_deliver: {
        type: String,
        default: "unknown"
    },
    products: {
        type: Array,
        require: true
    },
    storeId: {
        type: String,
        require: true
    },
    orderNumber: {
        type: String,
        require: true
    },
    orderedAt: {
        type: String,
        require: true
    },
    paymentMethod: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

});


const orderCollection = mongoose.model("orders", orderSchema);


module.exports = orderCollection;