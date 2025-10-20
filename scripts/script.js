import { setupDarkModeToggle } from '../UI/UI.js';
setupDarkModeToggle('.dark-mode-toggle-button'); 
import {products} from '../data/products.js';
import {cart} from '../data/cart-classes.js';

const productsGrid = document.querySelector('.products-grid');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const chartPopUp = document.querySelector('.chart-view'); 

let productsHTML = ''; 

function generateProductHTML(product) {
    const productPrice = product.getPrice();
    
    return `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.img}" loading="lazy">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getRatingURL()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${productPrice}
        </div>

        <div class="product-quantity-container">
          <select class="product-quantity" data-product-id="${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <div class="isadded">
            <img src="images/icons/checkmark.png">
            <p>Added</p>
          </div>
          <button class="delete-from-cart" data-product-id="${product.id}" data-product-value=${productPrice}>Delete</button>
        </div>

        <button class="add-to-cart-button button-primary" data-product-Id="${product.id}" data-product-value=${productPrice}>
          Add to Cart
        </button>
      </div>`;
}

function attachProductListeners() {
    cart.refreshCartCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const selectedQuantity = button.parentElement.querySelector('.product-quantity').value;
            const addedToCart = button.parentElement.querySelector('.added-to-cart');
            addedToCart.classList.add('added');
            
            setTimeout(() => {
                addedToCart.classList.remove('added')
            }, 2000); 

            const {productId} = button.dataset;
            cart.addToCart(productId, selectedQuantity);
            cart.refreshCartCount();
        })
    }); 

    const deleteButtons = document.querySelectorAll('.delete-from-cart');
    deleteButtons.forEach((deletebtn) => {
        deletebtn.addEventListener('click', () => {
            deletebtn.parentElement.classList.remove('added');
            const { productId } = deletebtn.dataset;
            cart.removeFromCart(productId);
            cart.refreshCartCount();
        });
    });

    const sizechartlinks = document.querySelectorAll('.size-chart-link');
    sizechartlinks.forEach((link) => {
        const {sizeChart} = link.dataset
        link.addEventListener('click', () => {
            const img = document.createElement('img');
            img.src = sizeChart;
            
            chartPopUp.innerHTML = '<a class="close">X</a>'; 
            chartPopUp.appendChild(img);

            chartPopUp.parentElement.style.display = 'flex';
            let closeButton = chartPopUp.querySelector('.close');
            
            closeButton.addEventListener('click', () => {
                chartPopUp.parentElement.style.display = 'none';
                chartPopUp.removeChild(img);
            });
        });
    });
}

function renderProductsGrid(productsToRender) {
    let html = '';
    productsToRender.forEach((product) => {
        html += generateProductHTML(product);
    });
    
    productsGrid.innerHTML = html;
    
    attachProductListeners();
}

function searchProducts() {
    const searchQuery = searchBar.value.trim().toLowerCase();
    
    if (searchQuery === '') {
        renderProductsGrid(products); 
        return;
    }

    let searchResult = [];
    
    products.forEach((product) => {
        const nameMatches = product.name.toLowerCase().includes(searchQuery);
        const keywordMatches = product.keywords && product.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchQuery)
        );

        if (nameMatches || keywordMatches) {
            searchResult.push(product);
        }
    });

    renderProductsGrid(searchResult);
}

searchButton.addEventListener('click', searchProducts);
searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

renderProductsGrid(products);




