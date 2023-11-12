//getting  the products from the json file
const getItems = async () => {
  try {
    const fetched = await fetch("./database/products.json");
    const products = await fetched.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

class Product {
  constructor() {
    this.products = getItems();
  }

  async getProducts() {
    return this.products;
  }
}

class Searcher {
  constructor() {
    this.products = getItems();
  }

  async search(search) {
    try {
      const products = await this.products;
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
  constructor() {
    this._cartCounter = window.localStorage.getItem("productsInCar")
      ? JSON.parse(window.localStorage.getItem("productsInCar")).length
      : "0";
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
    return this._cartCounter;
  }
}


class Selector {
    constructor() {
        this._selectCartCounter = document.querySelector('#car_counter');
        this._selectProducts = document.querySelector('#products');
        this._selectBtnCartReturn = document.querySelector('#btn-cart-return');
        this._selectAsideCart = document.querySelector('#aside-cart');
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
export { Product, Searcher, Cart, ProductSelected, Selector };
