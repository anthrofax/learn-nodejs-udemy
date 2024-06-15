const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug')
app.set('views', 'views')

app.use((req, res, next) => {
  console.log("This always run");

  next();
});

app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((req, res) => {
  res.render('404')
});

app.listen(3000);
