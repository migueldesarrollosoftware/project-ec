export class Services {
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
