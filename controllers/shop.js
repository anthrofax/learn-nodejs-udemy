const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  // Product.findAll({
  //   where: {
  //     id: productId,
  //   },
  // })
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       path: "/products",
  //       pageTitle: `Detail Product | ${productId}`,
  //     });
  //   })
  //   .catch((err) => console.log("Find by ID Internal Error: " + err));

  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product,
        path: "/products",
        pageTitle: `Detail Product | ${productId}`,
      });
    })
    .catch((err) => console.log("Find by ID Internal Error: " + err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          });
        })
        .catch((err) =>
          console.log("Getting product in user cart internal error" + err)
        );
    })
    .catch((err) => console.log("Getting cart internal error: " + err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let userCart;
  let newQty = 1;

  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({
        where: {
          id: productId,
        },
      });
    })
    .then((products) => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        newQty = product.cart_item.qty + 1;

        return product;
      }

      return Product.findByPk(productId);
    })
    .then((product) => {
      return userCart.addProduct(product, { through: { qty: newQty } });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
  // Product.getProductById(productId, (product) => {
  //   Cart.addCart(productId, product.price, () => {
  //     res.redirect("/cart");
  //   });
  // });
};

exports.deleteCart = (req, res, next) => {
  Product.getProductById(req.body.productId, (product) => {
    Cart.deleteProductById(product.id, product.price, () => {
      res.redirect("/cart");
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
