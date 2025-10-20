class Cart {
  cartObjects;
  #storageKey;

  constructor(storageKey){
  this.#storageKey = storageKey;

  this.#loadFromStorage();

  }

#loadFromStorage(){
  
this.cartObjects = JSON.parse(localStorage.getItem(this.#storageKey));

if(!this.cartObjects){
    this.cartObjects = [];
}

}

saveCartData(){
localStorage.setItem(this.#storageKey, JSON.stringify(this.cartObjects));
}

addToCart(productId, selectedQuantity) {
      
        let matchingItem;
        this.cartObjects.forEach((cartitem) => {
          if (cartitem.productId === productId) {
            matchingItem = cartitem;        
          }
        });

        if (matchingItem) {
        matchingItem.quantity = Number(matchingItem.quantity) + Number(selectedQuantity);

        }


        else {
          this.cartObjects.push({
            productId,
            quantity: Number(selectedQuantity),
            toBeDeliveredOn: 'default',
            shippingCostCents: 0
          });
        }

        this.saveCartData();

    }

         removeFromCart(productId) {
    // find the item in the cart
     const item = this.cartObjects.find(cartitem => cartitem.productId === productId);

    if (item) {
      const itemQuantity = Number(item.quantity);
      // remove from cart
      this.cartObjects.splice(this.cartObjects.findIndex(i => i.productId === productId), 1);
    }

    this.saveCartData();
    }

       refreshCartCount(){
        let totalCartQ = 0;
          this.cartObjects.forEach((item)=>{
            let addQ = Number(item.quantity)
            totalCartQ += addQ;
          })

          // cart quantity count
      document.querySelectorAll('.cart-quantity').forEach((quantityText) => {
        quantityText.textContent = totalCartQ
      })
      }

}

 
export const cart = new Cart('cart-oop');
const secondCart = new Cart('secondCart');



