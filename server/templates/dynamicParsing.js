const dynamicHTML = (userInput, store, order) => {
    return userInput.replace(/(.*?)\{\{(.*?)\}\}/g, (match, beforeText, variableName) => {
        if (variableName === "store-name") {
            return ` <div class="header">
                        <h1>${beforeText} ${store?.storeName}</h1>
                     </div>`
        } else if (variableName === "customer-name-0") {
            return ` <h2 class="order-summary-h2">${beforeText} <span class="bold">${order?.shipping_details?.name}</span>.</h2>`
        } else if (variableName === "order-number") {
            return `<p>${beforeText} <strong>${order?.orderNumber}</strong></p>`
        } else if (variableName === "order-summary") {
            return `
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
            
            `
        } else if (variableName === "shipping-title") {
            return ` <h3 class="contact-info-h3">${beforeText}</h3>`
        } else if (variableName === "customer-name-1") {
            return ` <li class="address-list">Name: <span>${order?.shipping_details?.name}</span></li>`
        } else if (variableName === "customer-email") {
            return `<li class="address-list">Email: <span>${order?.shipping_details?.email}</span></li>`
        } else if (variableName === "other-shipping-details") {
            return `    <div>
                        <p class="address-list-title">${beforeText}</p>
                            <div>
                                <li class="address-list">
                                    <ul >
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
     
                    </div>`
        } else if (variableName === "payment-method") {
            return ` <p><strong>Payment Method:</strong> ${order?.paymentMethod}</p>`
        } else if (variableName === "order-date") {
            return ` <p><strong>Ordered At:</strong> ${order?.orderedAt}</p>
`
        }

        return `${beforeText.trim()} ${variableName}`;
    })
}


module.exports = dynamicHTML;

