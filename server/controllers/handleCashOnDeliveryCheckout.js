const moment = require('moment');
const orderCollection = require('../model/orderModel');
const sendEmail = require('../email/sendEmail');
const storeCollection = require('../model/storeModel');
const ownerEmailTemplate = require('../templates/owner');
const customerEmailTemplate = require('../templates/customer');


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
            subtotal: (((countedSubtotal * 100) + ((userData?.shipping || 0) * 100) + ((userData?.tax || 0) * 100)) - ((userData?.discount || 0) * 100)),
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
            paymentStatus: "Unpaid",
            orderedAt: moment().format('Do MMMM YYYY'),
            paymentMethod: "Cash on Delivery",
            additionalCharges: userData.additionalCharges,
            additionalCustomerData: userData.additionalCustomerData,
            additionalShippingData: userData.additionalShippingData,
            additionalProductData: userData.additionalProductData
        }

        const newOrder = orderCollection(data);
        await newOrder.save();



        //Send confirmation email to the store owner
        const result = await sendEmail(requestedStore?.admin, requestedStore?.storeName, "A new order received!", ownerEmailTemplate(requestedStore, data))


        if (result?.messageId) {
            //Send confirmation email to the customer
            const result = await sendEmail(userData?.shipping_details?.email, requestedStore?.storeName, "Order placed!", customerEmailTemplate(requestedStore, data));
            if (result?.messageId) {
                //Update email usage for the store
                const newEmailCount = requestedStore?.emailUsage ? requestedStore.emailUsage + 2 : 2;
                await storeCollection.updateOne({ _id: requestedStore?._id }, { emailUsage: newEmailCount });
            }

        }


        res.send({ message: "success" })

    }
    catch (error) {
        console.log(error.message);
        res.send({ message: "failed" })
    }
}


module.exports = handleCashOnDeliveryCheckout;