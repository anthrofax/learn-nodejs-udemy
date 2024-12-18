const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    res.render("shop/product-detail", {
      product,
      path: "/products",
      pageTitle: `Detail Product | ${productId}`,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = async (req, res) => {
  const products = await Product.find();

  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getCart = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");

    const products = user.cart.items;

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.findById(productId);

    await req.user.addToCart(product);

    return res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCart = async (req, res) => {
  const productId = req.body.productId;

  try {
    await req.user.deleteItemFromCart(productId);

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");

    const products = user.cart.items.map((itemInCart) => {
      return {
        quantity: itemInCart.quantity,
        product: { ...itemInCart.productId._doc },
      };
    });

    const newOrder = new Order({
      user: {
        name: user.name,
        userId: user,
      },
      products,
    });

    await newOrder.save();
    await req.user.clearCart();

    return res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};

exports.getOrdersPage = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const orders = await user.getOrders();

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    isAuthenticated: req.session.isLoggedIn,
  });
};
