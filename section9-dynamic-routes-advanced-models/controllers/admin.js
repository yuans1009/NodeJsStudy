const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // Product.build()
  // create immediately saves to the database, so we don't need to call save() after it
  Product.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  })
    .then((result) => {
      console.log("Created Product!", result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/admin/products");
  }
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

   Product.findByPk(productId)
     .then((product) => {
       product.title = updatedTitle;
       product.price = updatedPrice;
       product.description = updatedDescription;
       product.imageUrl = updatedImageUrl;

       // NOTE: return the promise so it can be handled in the next then() block
       return product.save();
     })
     .then(() => {
       console.log("Updated Product!");
       res.redirect("/admin/products");
     })
     .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Solution 1
  // Product.destroy({ where: { id: prodId } });

  // Solution 2
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("Deleted Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};;;

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
