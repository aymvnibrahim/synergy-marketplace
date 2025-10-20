import '../data/cart-classes.js';

export function renderOrderSummary(cart, products, checkoutHTML, orderSummary){
    cart.cartObjects.forEach((cartitem, index) => {
        let matchingProduct;
        let productId = cartitem.productId;
        let itemIndex = index
        products.forEach((product)=>{
            if(product.id === productId){
            matchingProduct = product;
            }
        })
    
        let productName = matchingProduct.name;
        let productImage = matchingProduct.img;
        let productPrice = matchingProduct.priceCents / 100;
        let selectedQuantity = cartitem.quantity;
        
       
    
        checkoutHTML = checkoutHTML + `<div class="cart-item-container">
        
                <div class="delivery-date">
                
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${productImage}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${productName}
                    </div>
                    <div class="product-price">
                      $${productPrice.toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${selectedQuantity}</span>
                      </span>
                    <input type="number" min="1" class="update-quantity-input">
            
                    <span class="update-quantity-link link-primary" data-product-id="${productId}">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary" data-product-id="${productId}">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option delivery-select-${index}">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${index}"
                        data-price="0" data-date="fivedays"> 
                      <div>
                        <div class="delivery-option-date fivedays">
                          
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option delivery-select-${index}">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${index}"
                        data-price="499" data-date="threedays">
                      <div>
                        <div class="delivery-option-date threedays">
                          
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option delivery-select-${index}">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${index}"
                        data-price="999" data-date="tomorrow">
                      <div>
                        <div class="delivery-option-date tomorrow">
                          
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
    
            orderSummary.innerHTML = checkoutHTML;
    
     })


}