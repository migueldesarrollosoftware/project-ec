export class Selector {
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
    this._searcher = document.querySelector("#searcher");
    this._selectTotalPrice = document.querySelector("#cart-total");
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
  get selectTotalPrice() {
    return this._selectTotalPrice;
  }
}
