export class Render {
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
      productContainer.className =
        "col-12 col-sm-6 col-md-4 col-lg-3 my-3 text-black rounded ";
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

  cleanStoreProducts() {
    this.selector.selectProducts.innerHTML = "";
  }

  async showProductsInCart(productsInCar) {
    // [add] total price
    const totalPrice = productsInCar.reduce(
      (acc, product) => acc + product._price * product._quantity,
      0
    );
    const selectorTotalPrice = this.selector.selectTotalPrice;
    selectorTotalPrice.textContent = `S/.${totalPrice.toFixed(2)}`;
    // [add] populate products
    const productsIterator = productsInCar.values();
    const selectorCartProducts = this.selector.selectAsideCartProducts;
    selectorCartProducts.innerHTML = "";
    for (const product of productsIterator) {
      const productContainer = document.createElement("div");
      productContainer.className = "d-flex flex-column my-3 text-black rounded";
      productContainer.innerHTML = `<div class="d-flex justify-content-center align-items-center  border rounded shadow flex-md-row flex-column mx-sm-auto p-2">
        <div class="cart_prd_img w-md-100 p-3">
        <img src="${product._path}" alt="${
        product._name
      }" class="rounded shadow img-cart w-md-100">
        </div>
        <div class="cart_prd_details d-flex flex-column justify-content-center align-items-center">
          <p class="mx-1 title-color">${product._name}</p>
          <p class="mx-1">S/.${(product._price * product._quantity).toFixed(
            2
          )}</p>
          <p class="mx-1 p__quantity">${product._quantity}</p>        
        </div>
        </div>`;
      selectorCartProducts.appendChild(productContainer);
    }
  }
}
