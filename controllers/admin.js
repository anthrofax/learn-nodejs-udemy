const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      // .select("title price -_id")
      // .populate("userId", "name");

    return res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = async (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  try {
    const newCreatedProduct = new Product({
      title,
      price,
      imageUrl,
      description,
      userId: req.user,
    });
    await newCreatedProduct.save();

    return res.redirect("/admin/products");
  } catch (error) {
    console.log("Error!");
    return console.log(error);
  }
};

exports.getEditProduct = async (req, res) => {
  console.log('Holaa')
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  try {
    const product = await Product.findById(prodId);

    if (!product) {
      return res.render("404", {
        pageTitle: "Page Not Found",
        path: "",
        isAuthenticated: req.session.isLoggedIn,
      });
    }

    return res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res) => {
  const { id, title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findById(id);

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;
    await product.save();

    return res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndDelete(productId);

    return res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};
