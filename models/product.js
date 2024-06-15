const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(require.main.path, "data", "product.json");

function readProductDataFile(callBack) {
  fs.readFile(dataFilePath, null, (err, fileContent) => {
    if (err) return callBack([]);

    return callBack(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    readProductDataFile((products) => {
      products.push(this);

      fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAllProduct(callBack) {
    readProductDataFile(callBack);
  }
};
