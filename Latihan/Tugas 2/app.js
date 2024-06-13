const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1");

  next();
});

app.use((req, res, next) => {
  console.log(`Middleware 2 - ${req.url}`);

  next();
});

app.use("/users", (req, res, next) => {
  res.send("<h1>Users page</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Homepage</h1>");
});

app.listen(3001);
