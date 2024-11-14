const moment = require('moment');
const storeCollection = require("../model/storeModel");
const axios = require('axios');
const orderCollection = require('../model/orderModel');

const handleYocoCheckout = async (req, res) => {
    try {
        const userData = req.body;
        const originUrl = req.headers['origin'];




        //Retrieve yoco secret
        const requestedStore = await storeCollection.findOne({ storeId: userData?.storeId });

        if (!requestedStore?.yocoSecret) {
            return res.status(403).send("Operation now allowed!");
        }

        const convertUsdToZarInCents = (usdAmount) => {
            // Constant exchange rate: 1 USD = 18 ZAR
            const usdToZarRate = 18.00;
            const zarAmount = usdAmount * usdToZarRate;
            const zarInCents = Math.round(zarAmount * 100);
            return zarInCents;
        };

        //Initially save to the database
        //Calculate subtotal
        const countedSubtotal = userData?.products?.reduce(
            (acc, item) => acc + parseFloat(item.totalPrice),
            0
        )

        const data = {
            subtotal: (((countedSubtotal * 100) + ((userData?.shipping || 0) * 100) + ((userData?.tax || 0) * 100)) - ((userData?.discount || 0) * 100)),
            shipping_details: userData?.shipping_details,
            status: [
                {
                    message: "Order Received",
                    date: moment().format('Do MMMM YYYY')
                }
            ],
            products: userData?.products,
            additionalCustomerData: userData.additionalCustomerData,
            additionalShippingData: userData.additionalShippingData,
            additionalProductData: userData.additionalProductData,
            storeId: userData?.storeId,
            additionalCharges: userData.additionalCharges,
            orderNumber: `#${Date.now().toString().slice(5, 13)}`,
            orderedAt: moment().format('Do MMMM YYYY'),
            paymentMethod: "unknown",

        }

        const newOrder = orderCollection(data);
        const dataSaveResult = await newOrder.save();


        const response = await axios.post(
            'https://payments.yoco.com/api/checkouts',
            {
                amount: convertUsdToZarInCents(countedSubtotal),
                currency: 'ZAR',
                successUrl: `${process.env.BASE_URL}/success/yoco?origin=${originUrl}&id=${dataSaveResult._id.toString()}`,
                failureUrl: `${originUrl}/cancel`

            },
            {
                headers: {
                    'Authorization': `Bearer ${requestedStore?.yocoSecret}`,
                    'Content-Type': 'application/json',
                },
            }
        );







        res.send(response.data?.redirectUrl);


    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = handleYocoCheckout;