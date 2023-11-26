import {Services} from "../services/service.js"
export class Searcher {

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
  