const sendEmail = require("../email/sendEmail");
const paymentMethodRequestTemplate = require("../templates/paymentMethodRequest");

const handlePaymentMethodRequest = async (req, res) => {
    try {
        const data = req.body;

        const result = await sendEmail(process.env.FEATURE_REQUEST_RECEIVER, "eComer", "A new payment method request arrived.", paymentMethodRequestTemplate(data));

        if (result?.messageId) {
            res.send("success");
            return;
        }

        res.send("failed");


    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}


module.exports = handlePaymentMethodRequest;