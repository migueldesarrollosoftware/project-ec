import { Products } from './models.js';
// const productsInCar = window.localStorage.getItem('productsInCar');

// carCounter shows the number of products in the car
const carCounter = document.querySelector('#car_counter');
carCounter.style.display =  carCounter.textContent === '0' ? 'none' : 'block';


const p = new Products();
console.log(await p.getProducts());


