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
        type: Object,

    },
    exp_deliver: {
        type: String,
        default: "unknown"
    },
    products: {
        type: Array,
        require: true
    }

});


const orderCollection = mongoose.model("orders", orderSchema);


module.exports = orderCollection;