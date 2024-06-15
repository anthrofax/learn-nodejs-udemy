const path = require("path");

const express = require("express");

const rootDir = require("../helpers/rootPath");

const router = express.Router();

const product = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    title: "App | Add Product",
    path: "add-product",
    activeAddProduct: true,
    formCSS: true,
    productCSS: true,
  });
});

router.post("/add-product", (req, res, next) => {
  product.push({ title: req.body.title });

  res.redirect("/");
});

exports.router = router;
exports.product = product;
