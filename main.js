import {Cart, Selector, Render, Services} from './models.js';

// [get] products
const selector = new Selector();
const cart = new Cart(selector);
const service = new Services();
const products  = await service.getProducts();
const render = new Render(selector);

// [initial] render products
render.showProducts(products, selector, cart);

//[add] event hide/show cart
const btnCartReturn = selector._selectBtnCartReturn;
const asideCart = selector._selectAsideCart;
btnCartReturn.addEventListener('click', () => {
    asideCart.style.transform = 'translateX(100%)'; 
    asideCart.style.transition = 'transform 0.3s ease-in-out';
});