const { default: mongoose } = require("mongoose");
const orderCollection = require("../../model/orderModel");

const handleYocoSuccess = async (req, res) => {
    try {
        const originURL = req.query.origin;
        const id = req.query.id;

        //Update the order payment method
        await orderCollection.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { paymentMethod: "YOCO" })

        res.redirect(`${originURL}/thank-you`);

    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = handleYocoSuccess;