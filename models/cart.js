// import { ProductSelected, Render } from "./index.js";
import { Render } from "./render.js"; 
import { ProductSelected } from "./producSelected.js";
import { Services } from "../services/service.js";

export class Cart {
    constructor(selector) {
      this._cartCounter = this.cartCounter;
      this.selector = selector;
      this.services = new Services();
      this.initCart();
    }
  
    getProductsInCartAsArray() {
      return window.localStorage.getItem("productsInCar")
        ? JSON.parse(window.localStorage.getItem("productsInCar"))
        : [];
    }
  
    productAlreadyInCart(products = [], uuid) {
      console.log(products.find((product) => product._uuid === uuid))
      return products.find((product) => product._uuid === uuid);
    }
  
    removeItemsFromCart(products = [], uuid) {
      return products.filter((product) => product._uuid !== uuid);
    }
  
    async addToCart(uuid) {
      let productsInCar = await this.getProductsInCartAsArray();
      const product = await this.services.getProductsByUuid(uuid);
      const productoAdded = new ProductSelected(
        product.uuid,
        product.name,
        product.path,
        product.price
      );
      // if product is already in cart
      if(this.productAlreadyInCart(productsInCar,uuid)){
        productoAdded.quantity = this.productAlreadyInCart(productsInCar,uuid)._quantity + 1;
        productsInCar = this.removeItemsFromCart(productsInCar, uuid)
      } 
        productsInCar.push(productoAdded);
      
  
      // save products in localStorage
      window.localStorage.setItem("productsInCar", JSON.stringify(productsInCar));
      const selectorCartCounter = this.selector.selectCartCounter;
      selectorCartCounter.textContent = productsInCar.length;
      selectorCartCounter.style.display = "block";
  
      // aside cart
      const asideCart = this.selector.selectAsideCart;
      asideCart.style.transform = 'translateX(0%)';
      asideCart.style.transition = 'transform 0.3s ease-in-out';
      const render = new Render(this.selector);
      this.productsInCar().then(products => {
          render.showProductsInCart(products.reverse());
      });
    }
  
    get cartCounter() {
      return window.localStorage.getItem("productsInCar")
        ? JSON.parse(window.localStorage.getItem("productsInCar")).length
        : "0";
    }
  
    async productsInCar() {
      return window.localStorage.getItem("productsInCar")
        ? JSON.parse(window.localStorage.getItem("productsInCar"))
        : [];
    }
  
    initCart() {
      const carCounter = this.selector.selectCartCounter;
      carCounter.textContent = this._cartCounter;
      carCounter.style.display =
        carCounter.textContent === "0" ? "none" : "block";
    }
  
    clearCart() {
      window.localStorage.removeItem("productsInCar");
      this.initCart();
      const render = new Render(this.selector);
      this.productsInCar().then(products => {
        render.showProductsInCart(products.reverse());
    });
    }
  }