const { ObjectId } = require("mongodb");

const { getDb } = require("../helpers/db");

class Product {
  constructor({ title, price, imageUrl, description, id }) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.id = ObjectId.createFromHexString(id);
  }

  async save() {
    const db = getDb();
    let dbOp;

    try {
      if (!this.id) {
        dbOp = await db.collection("products").insertOne(this);
      } else {
        dbOp = await db
          .collection("products")
          .updateOne({ _id: this.id }, { $set: this });
      }

      return dbOp;
    } catch (error) {
      return console.log(`Error: ${error}`);
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
