import { cart } from './cart-classes.js';
import { products } from './products.js';

export function getTotalPrice() {
  let priceSum = 0;
  let shippingFeeSum = 0;
  let totalBeforeTax = 0;
  let tax = 0;
  let orderTotal = 0;

  cart.cartObjects.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    const itemPrice = product.priceCents * cartItem.quantity;
    const shipping = cartItem.shippingCostCents || 0;

    priceSum += itemPrice;
    shippingFeeSum += shipping;
  });

  totalBeforeTax = priceSum + shippingFeeSum;
  tax = Math.round(totalBeforeTax * 0.10);
  orderTotal = totalBeforeTax + tax;

  return {
    priceSum,
    shippingFeeSum,
    totalBeforeTax,
    tax,
    orderTotal
  };
}

