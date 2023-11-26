export class Product {
  constructor() {
    this.products = getItems();
  }

  async getProducts() {
    return this.products;
  }
}
