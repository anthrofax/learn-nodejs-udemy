const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(async (req, res, next) => {
//   const user = await User.fetchUserById("675d3d933f5c8a92509214c2");

//   if (user) {
//     req.user = new User({
//       userId: user._id,
//       username: user.username,
//       password: user.password,
//       cart: user.cart,
//     });
//     next();
//   }
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://anthrofax:Qz5JnvHh3ljaKMX4@nodejs-udemy-ecomerce.gmbku.mongodb.net/shop"
  )
  .then(() => {
    app.listen(3000);
    console.log("Server successfully run on localhost:3000")
  })
  .catch((err) =>
    console.log(
      `Error connecting to the mongodb database with mongoose; Error: ${err}`
    )
  );
