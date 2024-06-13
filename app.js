const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("This always run");

  next();
});

app.use("/add-product", (req, res, next) => {
  const { url } = req;

  res.send("<h1>Add Product Page</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello Express!</h1>");
});

app.listen(3000);
