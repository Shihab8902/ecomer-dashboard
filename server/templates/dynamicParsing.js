
const dynamicHTML = (userInput, store, order) => {
    // HTML Blocks
    const productSummaryBlock = `
<div class="order-summary">  
  <div class="order-item order-summary">
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
`;

    const shippingDetailsBlock = `
<div>
        <div>
            <li class="address-list">
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
                    ${Object.entries(data).map(([key, value]) => `
                    ${key}: <span class="additional-address">${value}</span>`).join(', ')}
                </li>
            `).join('')}
        </div>
</div>
`;

    //HTML block protected replacement
    let result = userInput
        .replace(/{{product-summary}}/, '%%PRODUCT_SUMMARY%%')
        .replace(/{{shipping-details}}/, '%%SHIPPING_DETAILS%%');


    result = result
        .replace(/{{(.*?)}}/g, (_, key) => {
            switch (key?.trim()) {
                case "store-name":
                    return store?.storeName;
                case "customer-name":
                    return order?.shipping_details?.name;
                case "order-number":
                    return order?.orderNumber;
                case "customer-email":
                    return order?.shipping_details?.email;
                case "payment-method":
                    return order?.paymentMethod;
                case "order-date":
                    return order?.orderedAt;
                default:
                    return '';
            }
        })

        //Replacement conditions for style elements
        .replace(/<b>(.*?)<\/b>/g, (_, text) => `<b>${text}</b>`)
        .replace(/\s*---\s*/g, '<hr style="border: none; border-top: 1px solid #ccc; margin: 10px 0;">')
        .replace(/(\n)(?!<hr)/g, '<br>')
        .replace(/<hr><br>/g, '<hr>')
        .replace(/ {2,}/g, match => '&nbsp;'.repeat(match.length));

    // Restore formatted HTML blocks
    result = result
        .replace('%%PRODUCT_SUMMARY%%', productSummaryBlock)
        .replace('%%SHIPPING_DETAILS%%', shippingDetailsBlock);

    return result;
};

module.exports = dynamicHTML;


