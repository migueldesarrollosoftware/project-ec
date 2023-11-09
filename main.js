import { Products } from './models.js';

// [init] cartCounter
const carCounter = document.querySelector('#car_counter');
carCounter.textContent = window.localStorage.getItem('productsInCar') ? JSON.parse(window.localStorage.getItem('productsInCar')).length : '0';
carCounter.style.display =  carCounter.textContent === '0' ? 'none' : 'block';

// [get] products
const p = new Products();
const products  = await p.getProducts();
const productsIterator = products.values();
const documentProducts = document.querySelector('#products');

// [add] products to cart
const addToCart = (id)=> {
    console.log("click" + id)
    let productsInCar = window.localStorage.getItem('productsInCar');
    productsInCar = productsInCar ? JSON.parse(productsInCar) : [];
    productsInCar.push(id);
    window.localStorage.setItem('productsInCar', JSON.stringify(productsInCar));
    carCounter.textContent = productsInCar.length;
    carCounter.style.display = 'block';
}

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
    addToCartButton.addEventListener('click', () => addToCart(p.uuid));
}


