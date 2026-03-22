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
    // Use VALUES(?, ?, ?, ?) to prevent SQL injection
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description],
    );
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

  static findById(id, cb) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
