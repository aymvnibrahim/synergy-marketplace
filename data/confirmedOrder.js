export let confirmedOrder = JSON.parse(localStorage.getItem('confirmedOrder'));

if(!confirmedOrder){
    confirmedOrder = [];
}


export function confirmOrder(){
localStorage.setItem('confirmedOrder', JSON.stringify(confirmedOrder));
}

export function getOrdersHTML(products, orderSummary){
    confirmedOrder.forEach((order)=>{
        let orderDetails = order.myOrders
        let orderTotal = (order.orderTotal / 100).toFixed(2)
        let orderID = order.orderID
        let orderPlacedDate = order.orderPlaced
        let itemInOrderHtml = ``;
        let productImage;
        let productName
    
        orderDetails.forEach((orderItem)=>{
             let productID = orderItem.productId
             let quantity = orderItem.quantity
             let deliveryDate = orderItem.toBeDeliveredOn
    
            let matchingProduct
            products.forEach((product)=>{
                if(product.id === productID){
                    matchingProduct = product
                }
            })
    
            productName = matchingProduct.name
            productImage = matchingProduct.img
    
    
            itemInOrderHtml += `<div class="order-item">
                    <div class="order-details-grid">
                        <div class="product-image-container">
                        <img src="${productImage}">
                        </div>
    
                        <div class="product-details">
                        <div class="product-name">
                            ${productName}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${deliveryDate}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${quantity}
                        </div>
                        <button class="buy-again-button button-primary" data-product-id="${productID}">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                        </div>
    
                        <div class="product-actions">
                            <button class="track-package-button button-secondary" data-product-id="${productID}" data-quantity="${quantity}" data-product-name="${productName}" data-product-Img="${productImage}" data-delivery-date="${deliveryDate}">
                            Track package
                            </button>
                        </div>
                    </div>
                    </div>
                    `
        })
    
    
    
    
        
    
        let orderHTML = `
            <div class="order-container">
    
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderPlacedDate}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${orderTotal}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${orderID}</div>
                </div>
              </div>
                    <div class="order-items">
                        ${itemInOrderHtml}
                    </div>
            </div>        
        `
        let currentHtml = orderSummary.innerHTML
        orderSummary.innerHTML = orderHTML + currentHtml
    
    }) 
    
}