const storeCollection = require("../model/storeModel");

const handlePaymentMethodActivation = async (req, res) => {
    try {
        const { id, method } = req.query;
        const data = req.body;

        switch (method) {
            case "cod": {
                const result = await storeCollection.updateOne({ _id: id }, { allowCod: true });
                if (result) {
                    return res.send("success");
                }
            }

            case "stripe": {
                const result = await storeCollection.updateOne({ _id: id }, { stripeSecret: data.stripeSecret });
                if (result) {
                    return res.send("success");
                }
            }

            case "yoco": {
                const result = await storeCollection.updateOne({ _id: id }, { yocoSecret: data.yocoSecret });
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


module.exports = handlePaymentMethodActivation;