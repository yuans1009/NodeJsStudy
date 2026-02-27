const express = require('express');

const router = express.Router();

router.get('/admin/add-product', (req, res, next) => {
  res.send('<form action="/admin/products" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

router.post('/admin/products', (req, res, next) => {
   console.log(req.body); // undefined, because we haven't set up body parsing middleware yet
   res.redirect('/'); // redirect to the root path
});

module.exports = router;