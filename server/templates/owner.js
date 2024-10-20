const ownerEmailTemplate = () => {

    const currentYear = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2f2f2f;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .order-summary {
            padding: 20px;
            border-bottom: 1px solid #ddd;
        }
        .order-summary h2 {
            margin-top: 0;
        }
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
        }
        .contact-info {
            padding: 20px;
        }
        .contact-info a {
            color: #2f2f2f;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            font-size: 12px;
            color: #888;
        }
    </style>
    <title>Order Notification</title>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>New Order Placed at [Store Name]</h1>
    </div>

    <div class="order-summary">
        <h2>A new order has been placed by [Customer Name].</h2>
        <p>Order Number: <strong>[Order Number]</strong></p>
        
        <div class="order-item">
            <div>Product 1 (Size: M)</div>
            <div>$30</div>
        </div>
        <div class="order-item">
            <div>Product 2 (Size: L)</div>
            <div>$45</div>
        </div>
        
        <div class="total">Total: $75</div>
    </div>

    <div class="contact-info">
        <p>Shipping Address: [Shipping Address]</p>
        <p>Payment Method: [Payment Method]</p>
        <p>Estimated Delivery: [Delivery Date]</p>
        <p>If you have any questions, feel free to <a href="mailto:support@store.com">contact us</a>.</p>
    </div>

    <div class="footer">
        <p>&copy; ${currentYear} [Store Name]. All rights reserved.</p>
    </div>
</div>

</body>
</html>
`;
}

module.exports = ownerEmailTemplate;
