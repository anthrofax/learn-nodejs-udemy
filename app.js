const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./helpers/db").connection;
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const user = await User.fetchUserById("675d099b3f5c8a92509214be");

  if (user) {
    req.user = user;
    next();
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(async () => {
  try {
    // const initUser = await User.fetchUserById("675d099b3f5c8a92509214be");

    // if (!initUser) {
    //   const user = new User("anthrofax", "123123");

    //   await user.save();
    // }

    app.listen(3000);
    console.log("Server is started on PORT:3000");
  } catch (error) {
    console.log(error);
  }
});
