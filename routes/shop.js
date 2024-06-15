const path = require("path");

const express = require("express");

const rootDir = require("../helpers/rootPath");
const { product } = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render('shop', {title: 'App | Shop', product, path: 'shop'})
});

module.exports = router;
