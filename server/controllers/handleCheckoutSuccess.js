const sendEmail = require("../email/sendEmail");
const orderCollection = require("../model/orderModel");
const moment = require('moment');
const customerEmailTemplate = require("../templates/customer");
const ownerEmailTemplate = require("../templates/owner");
const storeCollection = require("../model/storeModel");



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
            shipping_details: {
                email: combinedData.customer_details?.email,
                name: combinedData.customer_details?.name,
                address: {
                    city: combinedData.customer_details?.address?.city,
                    country: combinedData.customer_details?.address?.country,
                    state: combinedData.customer_details?.address?.state,
                    postal_code: combinedData.customer_details?.address?.postal_code,
                    additionalData: [
                        { Line1: combinedData.customer_details?.address?.line1 },
                        { Line2: combinedData.customer_details?.address?.line2 }
                    ]
                }
            },
            orderNumber: `#${Date.now().toString().slice(5, 13)}`,
            paymentMethod: "Stripe",
            orderedAt: moment().format('Do MMMM YYYY'),
            status: [
                {
                    message: "Order Received",
                    date: moment().format('Do MMMM YYYY')
                }
            ],
            products
        }

        const requestedStore = await storeCollection.findOne({ storeId: storeId });

        //Save order details to the database
        const newOrder = orderCollection(orderDetails);
        await newOrder.save();
        //Send confirmation email to the store owner
        const result = await sendEmail(requestedStore?.admin, "A new order received!", ownerEmailTemplate(requestedStore, orderDetails))
        if (result?.messageId) {
            //Send confirmation email to the customer
            const result = await sendEmail(orderDetails?.shipping_details?.email, "Order placed!", customerEmailTemplate(requestedStore, orderDetails));
            if (result?.messageId) {
                //Update email usage for the store
                const newEmailCount = requestedStore?.emailUsage ? requestedStore.emailUsage + 2 : 2;
                await storeCollection.updateOne({ _id: requestedStore?._id }, { emailUsage: newEmailCount });
            }

        }

    }

    res.redirect(`${requestOrigin}/thank-you`);
}


module.exports = handleCheckoutSuccess;