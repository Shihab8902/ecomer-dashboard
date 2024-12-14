const dynamicHTML = require("./dynamicParsing");

const customerEmailTemplate = (store, order) => {

    const emailTemplate = dynamicHTML(store?.customerEmailTemplate?.template, store, order);

  

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
          font-size: 16px;
      }
      .container {
          width: 80vw;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
          background-color: #333;
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
         
      }
      .order-summary-h2 {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 700;
          color: #333;
      }
      .order-item {
          padding: 15px 0;
      }
      .product-wrapper {
          display: flex;
          justify-content: space-between; 
          width : 100%;
          align-items: center; 
          padding: 5px 0;
          position: relative;
          border-bottom: 1px solid #e0e0e0;
      }
      .product-image-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
      }
      .product-details {
          height: fit-content;
      }
      .product-details h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
      }
      .product-details p {
          margin: 5px 0 0;
          font-size: 14px;
          color: #777;
      }
      .product-image {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          object-fit: cover;
      }
      .product-price {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          position: absolute; 
          margin-left: 60px;
          right: 10px;
      }
      .total {
          font-size: 18px;
          font-weight: bold;
          text-align: right;
          margin-top: 20px;
      }
    
      .contact-info-h3 {
          font-size: 18px;
          margin-top: 40px;
          font-weight: 700;
          margin-bottom: 10px;
      }
      .contact-info ul {
          padding: 0;
          margin: 0;
          list-style: none;
      }
      .address-list {
          font-size: 14px;
          font-weight: 600;
          color: #232327;
          list-style:none;
          line-height: 1.5;
      }
      .address-list span {
          color: #6E717D;
      }
          ul{
            padding-left: 0;
            margin-top: 0;
          }
            li {
                margin-left: 0;
            }
      .bold {
          font-weight: bold;
          color: #333;
      }
    .address-list-title {
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom : 0;
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
    <h1>New Order Placed at ${store?.storeName}</h1>
 </div>

<div style="font-size: 16px;">
 ${emailTemplate}
</div>

  <div class="footer">
      <p>Powered by eComer.</p>
  </div>
</div>

</body>
</html>
`;
}

module.exports = customerEmailTemplate;
