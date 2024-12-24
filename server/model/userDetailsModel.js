const { default: mongoose } = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    storeId: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    addressToken: {
        type: String,
        required: true
    }
});

const userDetailsCollection = mongoose.model('UserDetails', userDetailsSchema);

module.exports = userDetailsCollection;