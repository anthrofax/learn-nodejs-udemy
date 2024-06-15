const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    title: "App | Add Product",
    path: "add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const newProduct = new Product(req.body.title);

  newProduct.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const product = Product.fetchAllProduct((product) => {
    res.render("shop", {
      title: "App | Shop",
      product,
      path: "shop",
    });
  });
};
