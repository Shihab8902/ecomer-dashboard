const customerSubject = "Order placed.";
const customerBody = `
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

`;

const ownerSubject = "A new order received!";
const ownerBody = `
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

`;




const customerDefaultEmailTemplate = { subject: customerSubject, template: customerBody };
const ownerDefaultEmailTemplate = { subject: ownerSubject, template: ownerBody };

export const templates = { customerDefaultEmailTemplate, ownerDefaultEmailTemplate };