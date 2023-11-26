export class ProductSelected {
    constructor(uuid, name, path, price, quantity = 1) {
      this._uuid = uuid;
      this._name = name;
      this._path = path;
      this._price = price;
      this._quantity = quantity; 
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