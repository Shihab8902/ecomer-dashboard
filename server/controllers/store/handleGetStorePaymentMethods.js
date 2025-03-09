const storeCollection = require("../../model/storeModel");

const handleGetStorePaymentMethods = async (req, res) => {
    try {
        const { storeId } = req.query;
        const store = await storeCollection.findOne({ storeId });
        if (!store) {
            return res.status(404).send({ message: "Store not found" });
        }

        const paymentMethods = [];


        if (store?.stripeSecret) {
            paymentMethods.push("stripe");
        }
        if (store?.yocoSecret) {
            paymentMethods.push("yoco");
        }
        if (store?.allowCod) {
            paymentMethods.push("cod");
        }


        res.status(200).send({ paymentMethods, shippingMethods: store?.shippingMethods });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }


}

module.exports = handleGetStorePaymentMethods;