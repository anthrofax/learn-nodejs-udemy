const { ObjectId } = require("mongodb");

const { getDb } = require("../helpers/db");

class User {
  constructor({ userId, username, password, cart }) {
    this._id = userId;
    this.username = username;
    this.password = password;
    this.cart = cart;
  }

  async save() {
    const db = getDb();

    try {
      await db.collection("users").insertOne(this);

      console.log("User berhasil terdaftar");
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(product) {
    const db = getDb();
    console.log(product)

    try {
      const updatedCart = { items: [{ _id: product._id, quantity: 1 }] };

      await db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchUserById(userId) {
    const db = getDb();
    try {
      const user = await db
        .collection("users")
        .findOne({ _id: ObjectId.createFromHexString(userId) });

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
