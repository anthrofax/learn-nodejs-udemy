exports.getLogin = (req, res) => {
  const isLoggedIn =
    req.get("Cookie")?.split(";")[0].trim().split("=")[1] === "true";

  console.log(req.session.isLoggedIn);
  console.log(req.get("Cookie"));
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
