import { Product, ProductSelected, Cart, Selector} from './models.js';

// [TODO] add carCounter in CartConstructor to get de selector also use the logic to instance de cartCounter

// [init] cartCounter
const carCounter = document.querySelector('#car_counter');
carCounter.textContent = window.localStorage.getItem('productsInCar') ? JSON.parse(window.localStorage.getItem('productsInCar')).length : '0';
carCounter.style.display =  carCounter.textContent === '0' ? 'none' : 'block';

// [get] products
const p = new Product();
const cart = new Cart();
const selector = new Selector();
const products  = await p.getProducts();
const productsIterator = products.values();
const documentProducts = document.querySelector('#products');


// [add] populate products
for (const p of productsIterator) {
    const productContainer = document.createElement('div');
    productContainer.className = 'col-3 my-3 text-black rounded ';
    productContainer.innerHTML = `
        <div class="p-3 h-100 rounded border ">
            <div class="d-flex justify-content-between align-items-center flex-column h-100">
                <div class="d-flex justify-content-center align-items-center flex-column h-100">
                    <img src="${p.path}" alt="${p.name}" class="img-fluid rounded shadow">
                </div>
                <div class="w-100 text-center">
                    <hr class="w-100">
                    <h4>${p.name}</h4>
                    <p>${p.description}</p>
                    <p><strong class="text-danger">${p.price}</strong></p>
                    <button class="btn btn-danger shadow text-white" id="${p.uuid}">
                        <img src="./assets/svg/add-shopping-cart.svg" alt="add_cart">
                    </button>
                </div>
            </div>
        </div>
    `;
    documentProducts.appendChild(productContainer);
    const addToCartButton = productContainer.querySelector(`#${p.uuid}`);
    // [add] event to addToCartButton
    addToCartButton.addEventListener('click', () => cart.addToCart(p.uuid, selector.selectCartCounter));
}

//[add] event hide/show cart
const btnCartReturn = document.querySelector('#btn-cart-return');
const asideCart = document.querySelector('#aside-cart');
btnCartReturn.addEventListener('click', () => {
    asideCart.style.transform = 'translateX(100%)'; 
    asideCart.style.transition = 'transform 0.3s ease-in-out';
});