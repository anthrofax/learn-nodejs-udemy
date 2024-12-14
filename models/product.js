const { ObjectId } = require("mongodb");

const { getDb } = require("../helpers/db");

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  async save() {
    const db = getDb();

    try {
      const result = await db.collection("products").insertOne(this);

      return console.log(result);
    } catch (error) {
      return console.log(`Error: ${err}`);
    }
  }

  static async fetchAll() {
    const db = getDb();

    try {
      const products = await db.collection("products").find().toArray();

      console.log(products);

      return products;
    } catch (err) {
      return console.log(err);
    }
  }

  static async fetchProductById(productId) {
    const db = getDb();

    try {
      const product = await db
        .collection("products")
        .find({ _id: ObjectId.createFromHexString(productId) })
        .next();

      return product;
    } catch (error) {
      return console.log(error);
    }
  }
}

module.exports = Product;
