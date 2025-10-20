import { confirmedOrder, getOrdersHTML } from "../data/confirmedOrder.js";
import { clearTracking, orderToTrack, trackMyOrder } from "../data/orderToTrack.js";
import { products } from "../data/products.js";
import '../data/cart-classes.js';
import { cart } from '../data/cart-classes.js';
import { setupDarkModeToggle } from '../UI/UI.js';
setupDarkModeToggle('.dark-mode-toggle-button'); 

const orderSummary = document.querySelector('.orders-grid');

getOrdersHTML(products, orderSummary);

cart.refreshCartCount();



const buyAgainButtons = document.querySelectorAll('.buy-again-button')

buyAgainButtons.forEach((button)=>{
  const {productId} = button.dataset
  let selectedQuantity = 1
  button.addEventListener('click', ()=>{
    cart.addToCart(productId, selectedQuantity)
    cart.refreshCartCount();
    alert('item has been added to cart')

  })
  
})


const trackingBtns = document.querySelectorAll('.track-package-button')
trackingBtns.forEach((button)=>{
  clearTracking();
  const {productId, quantity, productName, productImg, deliveryDate} = button.dataset 

  button.addEventListener('click', ()=>{
    orderToTrack.push({productName, productImg, quantity, productId})
    trackMyOrder(productId, quantity, productName, productImg, deliveryDate);
    window.location.href = 'tracking.html';
  })
})

