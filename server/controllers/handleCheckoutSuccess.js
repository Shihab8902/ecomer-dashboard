const orderCollection = require("../model/orderModel");
const moment = require('moment');



const handleCheckoutSuccess = async (req, res) => {



    const requestOrigin = req.query.origin;
    const sessionID = req.query.session_id;
    const products = JSON.parse(req.query.products);
    const stripeSecret = req.query.secret;
    const storeId = req.query.storeId;


    const stripe = require("stripe")(stripeSecret);

    //Collect order details from session id
    if (sessionID) {
        const orderPaymentInfo = await stripe.checkout.sessions.retrieve(sessionID, { expand: ['payment_intent.payment_method'] });
        const orderedProducts = await stripe.checkout.sessions.listLineItems(sessionID);

        const combinedData = { ...orderPaymentInfo, ...orderedProducts };

        const orderDetails = {
            subtotal: combinedData.amount_subtotal,
            storeId: storeId,
            currency: combinedData.currency,
            shipping_details: combinedData.customer_details,
            status: {
                message: "Order Received",
                date: moment().format('Do MMMM YYYY')
            },
            products
        }


        //Save order details to the database
        const newOrder = orderCollection(orderDetails);
        await newOrder.save();

    }

    res.redirect(`${requestOrigin}/thank-you`);
}


module.exports = handleCheckoutSuccess;