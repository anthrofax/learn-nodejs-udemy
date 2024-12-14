const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  try {
    const newCreatedProduct = new Product(title, price, imageUrl, description);
    await newCreatedProduct.save();

    return res.redirect("/admin/products");
  } catch (error) {
    console.log("Error!");
    return console.log(error);
  }
};

exports.getEditProduct = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  try {
    const product = await Product.fetchProductById(prodId);

    if (!product) {
      return res.render("404", { pageTitle: "Page Not Found", path: "" });
    }

    return res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res) => {
  const { id, title, price, imageUrl, description } = req.body;
  const product = new Product({ id, title, price, imageUrl, description });

  try {
    await product.save({
      id,
      title,
      price,
      imageUrl,
      description,
    });

    return res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.deleteProductById(productId);

    return res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();

    return res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.log(error);
  }
};
