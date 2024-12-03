const customerEmailTemplate = (store, order) => {
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
          border-bottom: 1px solid #ddd;
      }
      .order-summary h2 {
          margin-top: 0;
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
      .contact-info {
          padding: 20px 0;
      }
      .contact-info h3 {
          font-size: 18px;
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
          line-height: 1.5;
      }
      .address-list span {
          color: #6E717D;
      }
      .bold {
          font-weight: bold;
          color: #333;
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

  <div class="order-summary">
      <h2>A new order has been placed by <span class="bold">${order?.shipping_details?.name}</span>.</h2>
      <p>Order Number: <strong>${order?.orderNumber}</strong></p>
      
      <div class="order-item">
          ${order?.products?.map(product => `
              <div class="product-wrapper">
                  <div class="product-image-wrapper">
                      <img class="product-image" src="${product?.image}" alt="Image unavailable" />
                      <div class="product-details">
                          <h3>${product?.productName}</h3>
                          <p>Quantity: ${product?.quantity}</p>
                      </div>
                  </div>
                        <p class="product-price">${store?.storeCurrency}${parseFloat((product?.price * product?.quantity) || 0).toFixed(2)}</p>
              </div>
          `).join('')}
      </div>
    
      <div class="total">Total: <span class="bold">${store?.storeCurrency}${(order?.subtotal / 100).toFixed(2)}</span></div>
  </div>

  <div class="contact-info">
      <h3>Shipping Address</h3>
      <ul>
          <li class="address-list">Name: <span>${order?.shipping_details?.name}</span></li>
          <li class="address-list">Email: <span>${order?.shipping_details?.email}</span></li>
          <li class="address-list">Address:
              <ul>
                  ${Object.entries(order?.shipping_details?.address || {})
            .filter(([key]) => key !== 'additionalData')
            .map(([key, value], index, array) => `
                      <li class="address-list">${key}: <span>${typeof value === 'object' && value !== null ? JSON.stringify(value) : value}</span>
                      ${index !== array.length - 1 ? ', ' : ''}</li>
                  `).join('')}
              </ul>
          </li>
          ${order?.shipping_details?.address?.additionalData?.map((data, index) => `
              <li class="address-list">
                  Additional: ${Object.entries(data).map(([key, value]) => `
                  <span>${key}: <span class="additional-address">${value}</span></span>`).join(', ')}
              </li>
          `).join('')}
      </ul>
      <p><strong>Payment Method:</strong> ${order?.paymentMethod}</p>
      <p><strong>Ordered At:</strong> ${order?.orderedAt}</p>
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
