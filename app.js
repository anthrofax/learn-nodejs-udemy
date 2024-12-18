const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("675e99eca58ecc3d9f170745");

    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(`Error on logging in with existing user: ${error}`);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://anthrofax:Qz5JnvHh3ljaKMX4@nodejs-udemy-ecomerce.gmbku.mongodb.net/shop"
  )
  .then(async () => {
    const user = await User.findOne();

    if (!user) {
      const newUser = new User({
        name: "Afridho Ikhsan",
        password: "123123123",
        cart: { items: [] },
      });

      newUser.save();
    }

    app.listen(3000);
    console.log("Server successfully run on localhost:3000");
  })
  .catch((err) =>
    console.log(
      `Error connecting to the mongodb database with mongoose; Error: ${err}`
    )
  );
