const mongoose = require('mongoose');



//REmove the email related user thing
const discountCodeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    discountType: {
        type: String,
        required: true
    },
    discountCode: {
        type: String,
        required: true
    },

    discountValueType: {
        type: String,
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    minRequiredAmount: {
        type: Number,
        default: 0
    },
    maxUse: {
        type: Number,
    },
    oncePerCustomer: {
        type: Boolean,
        default: false
    },
    usedCustomers: {
        type: Array,
        default: []
    },
    activeAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const discountCodeCollection = mongoose.model('discountCodes', discountCodeSchema);

module.exports = discountCodeCollection;