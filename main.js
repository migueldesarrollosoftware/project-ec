import { Selector } from './models/selector.js';
import { Render } from './models/render.js';
import { Searcher } from './models/searcher.js';
import { Cart } from './models/cart.js';
import { Services } from './services/service.js';

// [get] products
const selector = new Selector();
const cart = new Cart(selector);
const service = new Services();
const products  = await service.getProducts();
const render = new Render(selector);
const searcher = new Searcher();

// [initial] render products
render.showProducts(products, cart);
render.showProductsInCart((await cart.productsInCar()).reverse());

//[add] event hide cart
const asideCart = selector.selectAsideCart;
selector.selectBtnCartReturn.addEventListener('click', () => {
    asideCart.style.transform = 'translateX(100%)'; 
    asideCart.style.transition = 'transform 0.3s ease-in-out';
});

// [add] event show cart aside
selector.selectCartBtn.addEventListener('click', () => {
    asideCart.style.transform = 'translateX(0%)';
    asideCart.style.transition = 'transform 0.3s ease-in-out';
    cart.productsInCar().then(products => {
        render.showProductsInCart(products.reverse());
    });
});

// [add] event to clear cart
selector.selectCartBtnClear.addEventListener('click', async () => {
    await cart.clearCart();
});

// [add] debounce function
function debounce(func){
    let timer = null;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, 500);
    } 
}

//[add] event changed input search
selector.searcher.addEventListener('input', debounce(async (e) => {
    console.log(e.target.value);
    const productsSearched =  await searcher.search(e.target.value);
    render.cleanStoreProducts();
    render.showProducts(productsSearched, cart);
    selector.selectProducts.scrollIntoView({behavior: 'smooth'});
}));