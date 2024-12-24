const { default: mongoose } = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now, index: { expires: '15m' } }
});


const verificationCodeCollection = mongoose.model('verificationCode', verificationCodeSchema);

module.exports = verificationCodeCollection;