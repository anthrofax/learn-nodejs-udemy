const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title,
    imageUrl,
    price,
    description,
  })
    .then((result) => {
      res.redirect("/admin/products");
      console.log(result);
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.getProductById(prodId)
    .then(([[product]]) => {
      if (!product) {
        return res.render("404", { pageTitle: "Page Not Found", path: "" });
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log("Database Retrieval Error: " + err));
};

exports.postEditProduct = (req, res, next) => {
  const editedProduct = { ...req.body };

  Product.editProduct(editedProduct).then(() => {
    res.redirect("/admin/products");
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.deleteProduct(productId).then(() => {
    res.redirect("/admin/products");
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
