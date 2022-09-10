const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
const authCheckerAndRedirecter = require('../middleware/isAuth');


router.get('/', shopController.getStartingPage);

router.get('/products/:productId', shopController.getProductDetailPage);
router.get('/products', shopController.getProductsPage);

router.post('/cart', authCheckerAndRedirecter, shopController.postToCart);
router.get('/cart', authCheckerAndRedirecter, shopController.getCart);
router.post(
  '/cart/delete-cart-item',
  authCheckerAndRedirecter,
  shopController.deleteCartItem
);

router.get('/orders', authCheckerAndRedirecter, shopController.getOrdersPage);
router.get(
  '/orders/:orderId',
  authCheckerAndRedirecter,
  shopController.getFatura
);

router.get(
  '/checkout',
  authCheckerAndRedirecter,
  shopController.getCheckoutPage
);

module.exports = router;
