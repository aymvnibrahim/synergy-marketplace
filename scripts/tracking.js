import { cart } from "../data/cart-classes.js";
import { orderToTrack, trackMyOrder } from "../data/orderToTrack.js";
import { setupDarkModeToggle } from '../UI/UI.js';
setupDarkModeToggle('.dark-mode-toggle-button'); 

cart.refreshCartCount();
console.log(orderToTrack)
 
let html;
const mainDiv = document.querySelector('.main')
orderToTrack.forEach((order)=>{
    let name = order.productName
    let img = order.productImg
    let quantity = order.quantity
    let date = order.deliveryDate



html = `      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${date}
        </div>

        <div class="product-info">
          ${name}
        </div>

        <div class="product-info">
          Quantity: 1
        </div>

        <img class="product-image" src="${img}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`
})

      mainDiv.innerHTML = html