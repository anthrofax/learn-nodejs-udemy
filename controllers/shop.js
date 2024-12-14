const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.fetchProductById(productId);

    res.render("shop/product-detail", {
      product,
      path: "/products",
      pageTitle: `Detail Product | ${productId}`,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = async (req, res) => {
  try {
    const products = await req.user.getCart();

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.fetchProductById(productId);

    console.log(req.user);
    await req.user.addToCart(product);

    return res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCart = async (req, res) => {
  const productId = req.body.productId;

  try {
    await req.user.deleteItemFromCart({ userId: req.user._id, productId });

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res) => {
  try {
    await req.user.addOrder();

    return res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders();

    console.log(orders)

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
