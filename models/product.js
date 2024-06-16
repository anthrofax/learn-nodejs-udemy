const db = require("../helpers/db");
const Cart = require("./cart");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();

    return db.execute(
      `INSERT INTO products VALUES('${this.id}', '${this.title}', '${this.price}', '${this.description}', '${this.imageUrl}')`
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static getProductById(id) {
    return db.execute(`SELECT * FROM products WHERE id='${id}'`);
  }

  static editProduct(edittedProductData) {
    const { title, imageUrl, price, description } = edittedProductData;

    return db
      .execute(
        `UPDATE products SET title = '${title}' WHERE id = '${edittedProductData.id}'`
      )
      .then(() => {
        db.execute(
          `UPDATE products SET imageUrl = '${imageUrl}' WHERE id = '${edittedProductData.id}'`
        );
      })
      .then(() => {
        db.execute(
          `UPDATE products SET price = '${price}' WHERE id = '${edittedProductData.id}'`
        );
      })
      .then(() => {
        db.execute(
          `UPDATE products SET description = '${description}' WHERE id = '${edittedProductData.id}'`
        );
      });
  }

  static deleteProduct(productId) {
    return db.execute(`DELETE FROM products WHERE id = '${productId}'`);
  }
};
