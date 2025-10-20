import { products } from '../data/products.js';
import dayjs from "https://unpkg.com/dayjs@1.11.18/esm/index.js";
import { getTotalPrice } from '../data/getTotalPrice.js';
import { confirmedOrder, confirmOrder } from '../data/confirmedOrder.js';
import { setupDarkModeToggle } from '../UI/UI.js';
import { renderOrderSummary } from '../data/orderSummary.js';
setupDarkModeToggle('.dark-mode-toggle-button'); 
import '../data/cart-classes.js';
import { cart } from '../data/cart-classes.js';


// render cart
const orderSummary = document.querySelector('.order-summary');
let checkoutHTML = '';
if (cart.cartObjects.length > 0){
  


renderOrderSummary(cart, products, checkoutHTML, orderSummary);


    // delete quantity
  const deleteQuantityLinks = document.querySelectorAll('.delete-quantity-link');
  deleteQuantityLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
    const {productId} = link.dataset;
    cart.removeFromCart(productId);
    link.closest('.cart-item-container').remove();
    cart.refreshCartCount();
    updateQuantityOnPage();

    });
  });


cart.refreshCartCount();



// order summary side

const totalCost = document.querySelector('.payment-summary-money');
const handlingFeeText = document.querySelector('.shipping-fee-text')
const totalBeforeTaxText = document.querySelector('.total-before-tax')
const Tax = document.querySelector('.tax')
const orderTotalText = document.querySelector('.orderTotal')


function updateQuantityOnPage() {
  const totals = getTotalPrice(); // get fresh totals

  totalCost.innerHTML = `$${(totals.priceSum / 100).toFixed(2)}`;
  handlingFeeText.textContent = `$${(totals.shippingFeeSum / 100).toFixed(2)}`;
  totalBeforeTaxText.textContent = `$${(totals.totalBeforeTax / 100).toFixed(2)}`;
  Tax.textContent = `$${(totals.tax / 100).toFixed(2)}`;
  orderTotalText.textContent = `$${(totals.orderTotal / 100).toFixed(2)}`;

}




updateQuantityOnPage();


//// update Quantity
const UpdateLinks = document.querySelectorAll('.update-quantity-link')
let submitChange;
UpdateLinks.forEach((link)=>{
    let InputActive = false
    const Input = link.parentElement.querySelector('.update-quantity-input')
    const CurrentQuantityText = link.parentElement.querySelector('.quantity-label')
    const {productId} = link.dataset;
    let matchingItem;
    link.addEventListener('click', ()=>{

        submitChange = () => {
            let newQuantity = Input.value
            matchingItem.quantity = Number(newQuantity)
            CurrentQuantityText.textContent = matchingItem.quantity                    
            InputActive = false
            link.textContent = 'Update'
            Input.classList.remove('active')
            CurrentQuantityText.style.display = 'inline'
            cart.refreshCartCount();
            updateQuantityOnPage();
            cart.saveCartData();
            
        }

        cart.cartObjects.forEach((cartItem)=>{
        if (cartItem.productId === productId){
            matchingItem = cartItem
        }
    })

        if (InputActive === false){
            InputActive = true
            Input.classList.add('active')
            Input.focus();
            Input.value = matchingItem.quantity
            link.textContent = 'Save'
            CurrentQuantityText.style.display = 'none';

                        /// Logic
        }
        else if (InputActive === true ){
            submitChange(); // when hitting save
        }

    })
})



// Input Handling
const quantityInputs = document.querySelectorAll('.update-quantity-input');

quantityInputs.forEach(input => {
  input.addEventListener('input', () => {
    // Remove any non-digit characters (like -, +, e)
    input.value = input.value.replace(/[^0-9]/g, '');

    // Prevent empty or zero value
    if (input.value === '' || Number(input.value) < 1) {
      input.value = 1;
    }
  });

  // Prevent typing "+", "-", "e" directly (for number input quirks)
  input.addEventListener('keydown', (e) => {
    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
    else if (e.key === 'Enter') {
      submitChange();
    }
  });
});

let deliveryChoice1;
let deliveryChoice2;
let deliveryChoice3

const today = dayjs()
const tomorrow = document.querySelectorAll('.tomorrow')

tomorrow.forEach((day)=>{
    deliveryChoice3 = 'Tomorrow ,' + today.add(1, 'day').format('MMMM, DD')
    day.textContent = deliveryChoice3
})

const threedays = document.querySelectorAll('.threedays')

threedays.forEach((day)=>{
deliveryChoice2 = today.add(3, 'day').format('dddd, MMMM, DD');
day.textContent = deliveryChoice2

})

const fivedays = document.querySelectorAll('.fivedays')
fivedays.forEach((day)=>{
deliveryChoice1 = today.add(5, 'day').format('dddd, MMMM, DD')
day.textContent = deliveryChoice1

})


 


cart.cartObjects.forEach((cartItem, index)=>{
    
   let defaultDate = deliveryChoice1
   if(cartItem.toBeDeliveredOn === 'default'){
    cartItem.toBeDeliveredOn = defaultDate}
    let shippingCost;
    let MatchingRadio;
    let savedOption = cartItem.shippingCostCents;


    let RadioOptions = document.querySelectorAll(`input[name=delivery-option-${index}]`)
    RadioOptions.forEach((radio)=>{
        const {price, date} = radio.dataset
        const deliveryDateText = radio.closest('.cart-item-container').querySelector('.delivery-date');
        deliveryDateText.textContent = 'Delivery Date: ' + defaultDate;
        let deliveryDate;
        
      if (Number(price) === Number(savedOption)){
      radio.checked = true; 
      }

       

  let RadioCont = radio.parentElement;
  RadioCont.addEventListener('click', ()=>{
        radio.checked = true;

 if (date === 'fivedays'){
        deliveryDate = deliveryChoice1;
        cartItem.toBeDeliveredOn = deliveryChoice1
        cartItem.shippingCostCents = 0
        deliveryDateText.textContent = 'Delivery Date: ' + deliveryChoice1;
        shippingCost = 0
        
        }
        else if (date === 'threedays'){
        deliveryDate = deliveryChoice2;
        cartItem.toBeDeliveredOn = deliveryChoice2
        cartItem.shippingCostCents = 499
        deliveryDateText.textContent = 'Delivery Date: ' + deliveryChoice2;
        shippingCost = 4.99
        }
        else if (date === 'tomorrow'){
        deliveryDate = deliveryChoice3;
        cartItem.toBeDeliveredOn = deliveryChoice3
        cartItem.shippingCostCents = 999
        deliveryDateText.textContent = 'Delivery Date: ' + deliveryChoice3;

        shippingCost = 9.99
        
        }
            updateQuantityOnPage();
            cart.saveCartData();
              })
    })
})


const placeOrder = document.querySelector('.place-order-button')

placeOrder.addEventListener('click', ()=>{
  if (cart.cartObjects.length === 0){
    alert('Your cart is empty')
    return
  }

  else if (cart.cartObjects.length !== 0){
    alert('Your order has been placed')
  
const getPrice = getTotalPrice();

  function generateId() {
  const part = () => Math.random().toString(36).substring(2, 6); // 4 random chars
  return `${part()}-${part()}-${part()}-${part()}-${part()}`;
}


 const capturedTime = today.format('DD-MMMM-YY');

console.log(cart.cartObjects)
let myOrders = cart.cartObjects;
const randomId = generateId()

      confirmedOrder.push({myOrders, orderID: randomId, orderTotal: getPrice.orderTotal, orderPlaced: capturedTime})
    

    confirmOrder();
    cart.cartObjects.splice(0, cart.cartObjects.length);
    cart.saveCartData();
    updateQuantityOnPage();
    window.location.href = 'orders.html';
}

  })


}

else if(cart.cartObjects.length === 0){
 orderSummary.innerHTML = `<p>Your Cart is empty</p>`
}
  
  

