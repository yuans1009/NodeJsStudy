const Product = require('../models/product');
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  // :productId is the name of the dynamic segment we defined in the route, so we can access it via req.params.productId
  const productId = req.params.productId;
  // NOTE: not findById
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};;;

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
   Cart.getCart((cart) => {
     Product.fetchAll()
       .then(([rows, fieldData]) => {
         const cartProducts = [];

         for (product of rows) {
           const cartProductData = cart.products.find(
             (prod) => prod.id === product.id,
           );
           if (cartProductData) {
             cartProducts.push({
               productData: product,
               qty: cartProductData.qty,
             });
           }
         }
         res.render("shop/cart", {
           path: "/cart",
           pageTitle: "Your Cart",
           products: cartProducts,
         });
       })
       .catch((err) => {
         console.log(err);
       });
   });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect("/cart");
};

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return;
    }
    Cart.deleteProductById(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
