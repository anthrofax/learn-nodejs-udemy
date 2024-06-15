const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(require.main.path, "data", "product.json");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(dataFilePath, null, (err, fileContent) => {
      let products = [];

      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAllProduct(callBack) {
    fs.readFile(dataFilePath, null, (err, fileContent) => {
      if (err) callBack([]);

      return callBack(JSON.parse(fileContent));
    });
  }
};
