const storeCollection = require("../model/storeModel");


const handleStripeCheckout = async (req, res) => {
    try {
        const originUrl = req.headers['origin'];
        const productData = req.body;
        const storeId = req.query.storeId;


        //Get the stripe secret for the particular store
        const requestedStore = await storeCollection.findOne({ storeId: storeId });
        if (requestedStore) {
            const stripe = require("stripe")(requestedStore.stripeSecret);


            const items = productData.map(item => ({

                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productName,
                        description: `${item?.additionalData?.map((data, index) => {
                            const [key, value] = Object.entries(data)[0];
                            return `${key}: ${value}`;
                        }).join(', ')}` || '',
                        images: [item.image],

                    },
                    unit_amount: Math.ceil(item.price * 100),
                },
                quantity: item.quantity,
            }));

            //Checkout session
            const session = await stripe.checkout.sessions.create({
                line_items: items,
                mode: 'payment',
                billing_address_collection: 'required',
                shipping_address_collection: {
                    allowed_countries: ["US", "AU", "CA"],
                },
                // success_url: `${originUrl}/thank-you`,
                success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&origin=${originUrl}&storeId=${storeId}&secret=${requestedStore.stripeSecret}&products=${JSON.stringify(productData)}`,
                cancel_url: `${originUrl}/cancel`,

            });


            res.send(session.url)
            return;

        }

        res.status(400).send({ message: "Invalid store!" })

    }
    catch (error) {
        res.send(error.message)
    }
}


module.exports = handleStripeCheckout;