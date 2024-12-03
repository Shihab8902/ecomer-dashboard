const storeCollection = require("../model/storeModel");

const handlePaymentMethodDeactivation = async (req, res) => {
    try {
        const id = req.query.id;
        const method = req.query.method;

        switch (method) {
            case "cod": {
                const result = await storeCollection.updateOne({ _id: id }, { allowCod: false });
                if (result) {
                    return res.send("success");
                }
            }

            case "stripe": {
                const result = await storeCollection.updateOne({ _id: id }, { stripeSecret: '' });
                if (result) {
                    return res.send("success");
                }
            }

            case "yoco": {
                const result = await storeCollection.updateOne({ _id: id }, { yocoSecret: '' });
                if (result) {
                    return res.send("success");
                }
            }
            default: res.send("incomplete operation!");
        }
    }

    catch (error) {
        console.log(error);
    }
}



module.exports = handlePaymentMethodDeactivation;