const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.fetchProductById(productId);

    res.render("shop/product-detail", {
      product,
      path: "/products",
      pageTitle: `Detail Product | ${productId}`,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res) => {
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

exports.postCart = async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.fetchProductById(productId);

    console.log(req.user);
    await req.user.addToCart(product);

    return res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }

  // let userCart;
  // let newQty = 1;

  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     userCart = cart;
  //     return cart.getProducts({
  //       where: {
  //         id: productId,
  //       },
  //     });
  //   })
  //   .then((products) => {
  //     let product;

  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       newQty = product.cart_item.qty + 1;

  //       return product;
  //     }

  //     return Product.findByPk(productId);
  //   })
  //   .then((product) => {
  //     return userCart.addProduct(product, { through: { qty: newQty } });
  //   })
  //   .then(() => res.redirect("/cart"))
  //   .catch((err) => console.log(err));
};

exports.deleteCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts({ where: { id: req.body.productId } }))
    .then((products) => {
      const product = products[0];

      return product.cart_item.destroy();
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res) => {
  let userCart;

  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.order_item = { qty: product.cart_item.qty };

              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      return userCart.setProducts(null);
    })
    .then(() => res.redirect("/orders"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
