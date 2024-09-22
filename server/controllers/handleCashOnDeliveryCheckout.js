const moment = require('moment');
const orderCollection = require('../model/orderModel');
const sendEmail = require('../email/sendEmail');


const handleCashOnDeliveryCheckout = async (req, res) => {
    try {

        const userData = req.body;

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
        const result = await newOrder.save();

        //Send confirmation email for both customer and owner
        // if (result) {
        //     const to = userData?.shipping_details?.email;
        //     const subject = "Order Placed!";
        //     const message = `<b>Your order has been successfully placed with order number: ${data.orderNumber}</b>`
        //     const status = await sendEmail(to, subject, message);
        //     if (status) {
        //         return res.send({ message: "success" });
        //     }
        // }


        res.send({ message: "success" });


    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = handleCashOnDeliveryCheckout;