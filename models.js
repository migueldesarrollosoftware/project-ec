class Services {

  async getProducts() {
    try {
      const fetched = await fetch("./database/products.json");
      const products = await fetched.json();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByUuid(uuid) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.uuid === uuid);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

class Render {
  constructor(selector) {
    this.selector = selector;
  }
  async showProducts(products, cart) {
    const productsIterator = products.values();
    if (products.length === 0) {
      this.selector.selectProducts.innerHTML = `
            <div class="col-12 text-center">
                <h3>Ups! Producto no encontrado con ese nombre</h3>
                <p>Intenta buscando algún otro</p>
            </div>
        `;
    }
    // [add] populate products
    for (const p of productsIterator) {
      const productContainer = document.createElement("div");
      productContainer.className = "col-12 col-sm-6 col-md-4 col-lg-3 my-3 text-black rounded ";
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
                            <p><strong class="text-warning">S/.${p.price}</strong></p>
                            <button class="btn btn-danger shadow text-white" id="${p.uuid}">
                                <img src="./assets/svg/add-shopping-cart.svg" alt="add_cart">
                            </button>
                        </div>
                    </div>
                </div>
            `;
      this.selector.selectProducts.appendChild(productContainer);
      const addToCartButton = productContainer.querySelector(`#${p.uuid}`);
      // [add] event to addToCartButton
      addToCartButton.addEventListener(
        "click",
        async () => await cart.addToCart(p.uuid)
      );
    }
  }

  cleanStoreProducts(){
    this.selector.selectProducts.innerHTML = '';
  }

  async showProductsInCart(productsInCar) {
    const productsIterator = productsInCar.values();
    const selectorCartProducts = this.selector.selectAsideCartProducts;
    selectorCartProducts.innerHTML = "";
    // [add] populate products
    for (const product of productsIterator) {
      const productContainer = document.createElement("div");
      productContainer.className = "d-flex flex-column my-3 text-black rounded";
      // ${product._name} | ${product._price} | ${product._quantity}
      //<input type="number" class="mx-1 text-center" value="${product._quantity}" min="1" max="10">
      //
      productContainer.innerHTML = `<div class="d-flex justify-content-center align-items-center  border rounded shadow flex-md-row flex-column mx-sm-auto p-2">
      <div class="cart_prd_img w-md-100 p-3">
      <img src="${product._path}" alt="${product._name}" class="rounded shadow img-cart w-md-100">
      </div>
      <div class="cart_prd_details d-flex flex-column justify-content-center align-items-center">
        <p class="mx-1 title-color">${product._name}</p>
        <p class="mx-1">S/.${product._price * product._quantity}</p>
        <p class="mx-1 p__quantity">${product._quantity}</p>        
      </div>
      </div>`;
      selectorCartProducts.appendChild(productContainer);
    }
  }
}

class Product {
  constructor() {
    this.products = getItems();
  }

  async getProducts() {
    return this.products;
  }
}

class Searcher {

  async search(search) {
    try {
      const service = new Services();
      const products = await service.getProducts();
      const searched = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      return searched;
    } catch (error) {
      console.log(error);
    }
  }
}

// {
//     "uuid": "aa0a-a0a0-a0a0-a0a0-a0a0a0a0a16",
//     "name": "pastel 17",
//     "description": "pastel de chocolate",
//     "type": "cake",
//     "path": "./assets/products/p-17.jpg",
//     "price": 120.99
// },

class ProductSelected {
  constructor(uuid, name, path, price) {
    this._uuid = uuid;
    this._name = name;
    this._path = path;
    this._price = price;
    this._quantity = 1; 
  }
  // getters and setters
  get uuid() {
    return this._uuid;
  }
  set uuid(uuid) {
    this._uuid = uuid;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(quantity) {
    this._quantity = quantity;
  }
}

class Cart {
  constructor(selector) {
    this._cartCounter = this.cartCounter;
    this.selector = selector;
    this.services = new Services();
    this.initCart();
  }

  async addToCart(uuid) {
    console.log("click" + uuid);
    let productsInCar = window.localStorage.getItem("productsInCar");
    productsInCar = productsInCar ? JSON.parse(productsInCar) : [];
    const product = await this.services.getProductsByUuid(uuid);
    console.log("product", product);
    const productoAdded = new ProductSelected(
      product.uuid,
      product.name,
      product.path,
      product.price
    );
    productsInCar.push(productoAdded);
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

class Selector {
  constructor() {
    this._selectCartCounter = document.querySelector("#car_counter");
    this._selectProducts = document.querySelector("#products");
    this._selectBtnCartReturn = document.querySelector("#btn-cart-return");
    this._selectAsideCart = document.querySelector("#aside-cart");
    this._selectAsideCartProducts = document.querySelector(
      "#aside-cart-products"
    );
    this._selectCartBtn = document.querySelector("#cart-btn");
    this._selectCartBtnClear = document.querySelector("#cart-btn-clear");
    this._searcher =  document.querySelector('#searcher');
  }
  get selectCartCounter() {
    return this._selectCartCounter;
  }
  get selectProducts() {
    return this._selectProducts;
  }
  get selectBtnCartReturn() {
    return this._selectBtnCartReturn;
  }
  get selectAsideCart() {
    return this._selectAsideCart;
  }
  get selectAsideCartProducts() {
    return this._selectAsideCartProducts;
  }
  get selectCartBtn() {
    return this._selectCartBtn;
  }
  get selectCartBtnClear() {
    return this._selectCartBtnClear;
  }
  get searcher() {
    return this._searcher;
  }
}
export { Product, Searcher, Cart, ProductSelected, Selector, Render, Services };
