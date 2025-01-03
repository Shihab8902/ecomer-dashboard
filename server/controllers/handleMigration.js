const storeCollection = require("../model/storeModel");

const customerTemp = {
    subject: "Order placed",
    template: `
A new order has been placed by <b>{{customer-name}}</b>

<b>Order number:</b> {{order-number}}
{{product-summary}}
---
<b>Shipping Details</b>

<b>Name: </b> {{customer-name}}
<b>Email: </b> {{customer-email}}

<b>Address:</b> {{shipping-details}}

---
<b>Payment Method: </b> {{payment-method}}
<b>Ordered At: </b> {{order-date}}

`
}


const ownerTemp = {
    subject: "New order received.",
    template: `
A new order has been placed by <b>{{customer-name}}</b>

<b>Order number:</b> {{order-number}}
{{product-summary}}
---
<b>Shipping Details</b>

<b>Name: </b> {{customer-name}}
<b>Email: </b> {{customer-email}}

<b>Address:</b> {{shipping-details}}

---
<b>Payment Method: </b> {{payment-method}}
<b>Ordered At: </b> {{order-date}}

`
}

const handleMigration = async (req, res) => {
    try {

        // const result = await storeCollection.updateMany({}, {
        //     $set: {
        //         customerEmailTemplate: customerTemp,
        //         ownerEmailTemplate: ownerTemp
        //     }
        // })

        // res.send(result);

        res.status(403).send({ message: "forbidden" });


    }
    catch (error) {
        console.log(error);
    }
}


module.exports = handleMigration;