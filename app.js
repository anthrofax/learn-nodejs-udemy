const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./helpers/db");
const User = require("./models/user");
const Product = require("./models/product");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) =>
      console.log("Find first initialization user internal error: " + err)
    );
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user)
      return User.create({
        name: "Afridho Ikhsan",
        email: "afridhoikhsan@gmail.com",
      });

    return user;
  })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
