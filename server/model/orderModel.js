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
    paymentStatus: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    timelineStatus: {
        type: Array
    },
    note: {
        type: String
    },
    additionalCustomerData: {
        type: Array
    },
    additionalShippingData: {
        type: Array
    },
    additionalProductData: {
        type: Array
    },
    additionalPaymentData: {
        type: Array
    },
    additionalCharges: {
        type: {
            discount: { type: Number, default: 0 },
            shipping: { type: Number, default: 0 },
            tax: { type: Number, default: 0 }
        },
        default: {}
    }

});


const orderCollection = mongoose.model("orders", orderSchema);


module.exports = orderCollection;