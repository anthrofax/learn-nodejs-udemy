const User = require("../models/user");

exports.getLogin = (req, res) => {
  const isLoggedIn =
    req.get("Cookie")?.split(";")[0].trim().split("=")[1] === "true";

  console.log(req.session.isLoggedIn);
  console.log(req.session.user);
  console.log(req.get("Cookie"));
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = async (req, res) => {
  try {
    const user = await User.findById("675e99eca58ecc3d9f170745");

    if (user) {
      req.session.user = user;
      req.session.isLoggedIn = true;
      
      return res.redirect("/");
    }
  } catch (error) {
    console.log(`Error on logging in with existing user: ${error}`);
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);

    res.redirect("/");
  });
};
