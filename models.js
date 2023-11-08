//getting  the products from the json file
const getItems = async () => {
    try {
        const fetched = await fetch('./database/products.json');
        const products = await fetched.json();
        return products;
    } catch (error) {
        console.log(error);
    }
}

class Products {
    constructor() {
        this.products = getItems();
    }

    async getProducts() {
        try {
            return this.products;;
        } catch (error) {
            console.log(error);
        }
    }
}

class Searcher {
    constructor() {
        this.products = getItems();
    }

    async search(search) {
        try {
            const products = await this.products;
            const searched = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
            return searched;
        } catch (error) {
            console.log(error);
        }
    }
}

export { Products, Searcher };