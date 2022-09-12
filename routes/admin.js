const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const authCheckerAndRedirecter = require('../middleware/isAuth');

router.get(
  '/product-list-admin',
  authCheckerAndRedirecter,
  adminController.getProductsAdminPage
);

router.get(
  '/edit-product/:productId',
  authCheckerAndRedirecter,
  adminController.getEditProductPage
);

router.get(
  '/add-product',
  authCheckerAndRedirecter,
  adminController.getAddProductPage
);

module.exports = router;
