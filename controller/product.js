const product = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    title: "App | Add Product",
    path: "add-product",
    activeAddProduct: true,
    formCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  product.push({ title: req.body.title });

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    title: "App | Shop",
    product,
    path: "shop",
    hasProduct: product.length > 0,
    activeShop: true,
  });
};
