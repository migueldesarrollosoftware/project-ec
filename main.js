import { Products } from './models.js';
// const productsInCar = window.localStorage.getItem('productsInCar');

// carCounter shows the number of products in the car
const carCounter = document.querySelector('#car_counter');
carCounter.style.display =  carCounter.textContent === '0' ? 'none' : 'block';


const p = new Products();
const products  = await p.getProducts();
const productsIterator = products.values();

const documentProducts = document.querySelector('#products');
for (const p of productsIterator) {
    // <h3>${p.name}</h3><p>${p.description}</p><p>${p.price}</p>
    // <button class="btn btn-primary" id="${p.id}">Add to car</button>
    documentProducts.innerHTML += `
    <div class="col-3 my-3 text-black rounded ">
        <div class="p-3 h-100 rounded  border ">
            <div class="d-flex justify-content-between align-items-center flex-column h-100">
                <div class="d-flex justify-content-center align-items-center flex-column h-100">
                    <img src="${p.path}" alt="${p.name}" class="img-fluid rounded shadow">
                </div>
                <div class="w-100 text-center">
                    <hr class="w-100">
                    <h4>${p.name}</h4>
                    <p>${p.description}</p>
                    <p></p><strong class="text-danger">${p.price}</strong></p>
                    <button class="btn btn-danger shadow text-white" id="${p.id}">Add to car</button>
                </div>
            </div>
        </div>
    </div>`;
}




