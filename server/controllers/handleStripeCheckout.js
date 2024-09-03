const stripe = require("stripe")(process.env.STRIPE_SECRET);


const handleStripeCheckout = async (req, res) => {
    try {
        const originUrl = req.headers['origin'];
        const productData = req.body;
        const items = productData.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productName,
                    description: `Size: ${item.size}, Color: ${item.color}`,
                    images: [item.image],

                },
                unit_amount: item.price * 100,
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
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&origin=${originUrl}&products=${JSON.stringify(productData)}`,
            cancel_url: `${originUrl}/cancel`,

        });


        res.send(session.url)
    }
    catch (error) {
        res.send(error.message)
    }
}


module.exports = handleStripeCheckout;