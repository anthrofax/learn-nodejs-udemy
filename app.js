const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("This always run");

  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='product' method='POST'><input name='namaProduk' /><button>Tambah produk</button></form>"
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);

  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello Express!</h1>");
});

app.listen(3000);
