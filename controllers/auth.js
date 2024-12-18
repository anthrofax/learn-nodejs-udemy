exports.getLogin = (req, res) => {
  const isLoggedIn = req.get("Cookie")?.split(";")[0].trim().split("=")[1] === 'true';

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  res.setHeader("Set-Cookie", "isLoggedIn=true; HttpOnly");
  res.redirect("/");
};