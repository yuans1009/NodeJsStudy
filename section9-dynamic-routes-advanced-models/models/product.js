const db = require("../util/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      const updatedProducts = [...products];
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id,
        );
        if (existingProductIndex >= 0) {
          updatedProducts[existingProductIndex] = this;
        }
      } else {
        this.id = Math.random().toString();
        updatedProducts.push(this);
      }

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    });
  }

  static deleteById(id) {
    if (!id) {
      return;
    }

    getProductsFromFile((products) => {
      if (!products) {
        console.log("products not found");
        return;
      }
      const product = products.find((p) => p.id === id);
      if (!product) {
        console.log("product not found");
        return;
      }

      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProductById(id, product.price);
        }

        console.log(err);
      });
    });
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id, cb) {}
};
