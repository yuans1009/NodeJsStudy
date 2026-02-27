const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/products', (req, res, next) => {
   console.log(req.body); // undefined, because we haven't set up body parsing middleware yet
   res.redirect('/'); // redirect to the root path
});

module.exports = router;