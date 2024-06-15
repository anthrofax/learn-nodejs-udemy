const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  console.log("This always run");

  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.render("404", { title: "Page Not Found", path: '' });
});

app.listen(3000);
