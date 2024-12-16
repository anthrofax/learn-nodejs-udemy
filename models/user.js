const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (product) {
  try {
    console.log(this);
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      console.log(cp);
      return cp.productId.toString() === product._id.toString();
    });

    console.log(cartProductIndex);

    let updatedCart = [...this.cart.items];

    if (cartProductIndex >= 0) {
      updatedCart[cartProductIndex].quantity =
        this.cart.items[cartProductIndex].quantity + 1;
    } else {
      updatedCart.push({ productId: product, quantity: 1 });
    }

    this.cart.items = updatedCart;

    await this.save();
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.deleteItemFromCart = async function (productId) {
  try {
    const updatedCart = this.cart.items.filter(
      (cartItem) => cartItem.productId.toString() !== productId
    );

    this.cart.items = updatedCart;

    await this.save();

    console.log("The item successfully deleted!");
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.clearCart = async function () {
  this.cart.items = [];

  await this.save();
};

module.exports = mongoose.model("users", userSchema);
