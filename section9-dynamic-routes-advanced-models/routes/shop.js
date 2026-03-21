const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// ":productId" signals express that this is a dynamic segment and it should match anything in that position and make it available in the request object as req.params.productId
router.get("/products/:productId", shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post("/cart", shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
