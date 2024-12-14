const { ObjectId } = require("mongodb");

const { getDb } = require("../helpers/db");

class User {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
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