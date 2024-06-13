const path = require("path");

const express = require("express");

const rootDir = require("../helpers/rootPath");
const { product } = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(product)
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
