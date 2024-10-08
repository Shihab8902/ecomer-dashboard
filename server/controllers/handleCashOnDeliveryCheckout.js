const moment = require('moment');
const orderCollection = require('../model/orderModel');
const sendEmail = require('../email/sendEmail');
const storeCollection = require('../model/storeModel');


const handleCashOnDeliveryCheckout = async (req, res) => {
    try {

        const userData = req.body;

        //Check for cod delivery permission
        const requestedStore = await storeCollection.findOne({ storeId: userData?.storeId });
        if (!requestedStore?.allowCod) {
            return res.status(403).send("Operation now allowed!");
        }


        //Calculate subtotal
        const countedSubtotal = userData?.products?.reduce(
            (acc, item) => acc + parseFloat(item.totalPrice),
            0
        )

        const data = {
            subtotal: countedSubtotal * 100,
            shipping_details: userData?.shipping_details,
            status: [
                {
                    message: "Order Received",
                    date: moment().format('Do MMMM YYYY')
                }
            ],
            products: userData?.products,
            storeId: userData?.storeId,
            orderNumber: `#${Date.now().toString().slice(5, 13)}`,
            orderedAt: moment().format('Do MMMM YYYY'),
            paymentMethod: "Cash on Delivery",

        }

        const newOrder = orderCollection(data);
        await newOrder.save();
        res.send({ message: "success" })




    }
    catch (error) {
        console.log(error.message);
        res.send({ message: "failed" })
    }
}


module.exports = handleCashOnDeliveryCheckout;