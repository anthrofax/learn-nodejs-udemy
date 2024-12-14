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

    try {
      const cartProductIndex = this.cart?.items.findIndex(
        (cp) => cp._id.toString() === product._id.toString()
      );

      let updatedCart = [...this.cart.items];

      if (cartProductIndex >= 0) {
        updatedCart[cartProductIndex].quantity =
          this.cart.items[cartProductIndex].quantity + 1;
      } else {
        updatedCart.push({ _id: product._id, quantity: 1 });
      }

      await db
        .collection("users")
        .updateOne(
          { _id: this._id },
          { $set: { cart: { items: updatedCart } } }
        );
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

  async getCart() {
    const db = getDb();

    try {
      const userCartItemIds = this.cart.items.map((item) => item._id);

      const rawProductDataInCart = await db
        .collection("products")
        .find({ _id: { $in: userCartItemIds } })
        .toArray();

      const products = rawProductDataInCart.map((rawItem) => {
        return {
          ...rawItem,
          quantity: this.cart.items.find(
            (i) => i._id.toString() === rawItem._id.toString()
          ).quantity,
        };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async addOrder() {
    const db = getDb();

    try {
      const products = await this.getCart();

      await db.collection("orders").insertOne({
        items: products,
        user: {
          _id: this._id,
          name: this.username,
        },
      });

      this.cart.items = [];
      await db.collection("users").updateOne(
        { _id: this._id },
        {
          $set: {
            cart: {
              items: [],
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    const db = getDb();

    try {
      const orders = await db
        .collection("orders")
        .find({ "user._id": this._id })
        .toArray();

      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItemFromCart(productId) {
    const db = getDb();

    try {
      await db.collection("users").updateOne(
        { _id: this._id },
        {
          $set: {
            cart: {
              items: this.cart.items.filter(
                (cartItem) => cartItem._id.toString() !== productId
              ),
            },
          },
        }
      );

      console.log("The item successfully deleted!");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
