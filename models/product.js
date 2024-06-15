const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getProductById(id, callBack) {
    getProductsFromFile((products) => {
      const selectedProduct = products.find((item) => item.id === id);

      callBack(selectedProduct);
    });
  }

  static editProduct(edittedProductData, callBack) {
    getProductsFromFile((products) => {
      const edittingProduct = products.findIndex(
        (item) => item.id === edittedProductData.id
      );

      products[edittingProduct].title = edittedProductData.title;
      products[edittingProduct].imageUrl = edittedProductData.imageUrl;
      products[edittingProduct].description = edittedProductData.description;
      products[edittingProduct].price = edittedProductData.price;

      fs.writeFile(p, JSON.stringify(products), (err) =>
        console.log("Edit Product Error Log: " + err)
      );

      callBack();
    });
  }

  static deleteProduct(productId, callBack) {
    getProductsFromFile((products) => {
      const filteredProducts = products.filter((item) => item.id !== productId);

      fs.writeFile(p, JSON.stringify(filteredProducts), (err) => {
        if (err) console.log("Delete Product Error Log: " + err);

        callBack();
      });
    });
  }
};
