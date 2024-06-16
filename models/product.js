const db = require("../helpers/db");
const Cart = require("./cart");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    this.id = Math.random().toString();

    return db.execute(`INSERT INTO products VALUES (?, ?, ?, ?)`, [
      this.title,
      this.price,
      this.description,
      this.imageUrl,
    ]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static getProductById(id) {
    return db.execute(`SELECT * FROM products WHERE id=?`, [id]);
  }

  static editProduct(edittedProductData) {
    const { title, imageUrl, price, description } = edittedProductData;

    return db
      .execute(`UPDATE products SET title = ? WHERE id = ?`, [
        title,
        edittedProductData.id,
      ])
      .then(() => {
        db.execute(`UPDATE products SET imageUrl = ? WHERE id = ?`, [
          imageUrl,
          edittedProductData.id,
        ]);
      })
      .then(() => {
        db.execute(`UPDATE products SET price = ? WHERE id = ?`, [
          price,
          edittedProductData.id,
        ]);
      })
      .then(() => {
        db.execute(`UPDATE products SET description = ? WHERE id = ?`, [
          description,
          edittedProductData.id,
        ]);
      });
  }

  static deleteProduct(productId) {
    return db.execute(`DELETE FROM products WHERE id = '${productId}'`);
  }
};
