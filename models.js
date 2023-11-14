class Services {
  constructor() {}

  async getProducts() {
    try {
      const fetched = await fetch("./database/products.json");
      const products = await fetched.json();
      return products;
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
    // [add] populate products
    for (const p of productsIterator) {
      const productContainer = document.createElement("div");
      productContainer.className = "col-3 my-3 text-black rounded ";
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
      this.selector.selectProducts.appendChild(productContainer);
      const addToCartButton = productContainer.querySelector(`#${p.uuid}`);
      // [add] event to addToCartButton
      addToCartButton.addEventListener("click", () =>
        cart.addToCart(p.uuid, this.selector.selectCartCounter)
      );
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
  constructor() {}

  async search(search) {
    try {
      const service = new Services();
      const products = service.getProducts();
      const searched = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      return searched;
    } catch (error) {
      console.log(error);
    }
  }
}

class ProductSelected {
  constructor(id) {
    this._id = id;
    this._quantity = 1;
  }
  // getters and setters
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
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
    this.initCart();
  }

  addToCart(id, cartCounterSelector) {
    console.log("click" + id);
    let productsInCar = window.localStorage.getItem("productsInCar");
    productsInCar = productsInCar ? JSON.parse(productsInCar) : [];
    const productoAdded = new ProductSelected(id);
    productsInCar.push(productoAdded);
    window.localStorage.setItem("productsInCar", JSON.stringify(productsInCar));
    cartCounterSelector.textContent = productsInCar.length;
    cartCounterSelector.style.display = "block";
  }

  get cartCounter() {
    return window.localStorage.getItem("productsInCar")
      ? JSON.parse(window.localStorage.getItem("productsInCar")).length
      : "0";
  }

  initCart() {
    const carCounter = this.selector.selectCartCounter;
    carCounter.textContent = this._cartCounter;
    carCounter.style.display =
      carCounter.textContent === "0" ? "none" : "block";
  }
}

class Selector {
  constructor() {
    this._selectCartCounter = document.querySelector("#car_counter");
    this._selectProducts = document.querySelector("#products");
    this._selectBtnCartReturn = document.querySelector("#btn-cart-return");
    this._selectAsideCart = document.querySelector("#aside-cart");
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
}
export { Product, Searcher, Cart, ProductSelected, Selector, Render, Services };
