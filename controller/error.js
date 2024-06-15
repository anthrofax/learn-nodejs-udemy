exports.getError = (req, res) => {
  res.render("404", { title: "Page Not Found", path: "" });
};
