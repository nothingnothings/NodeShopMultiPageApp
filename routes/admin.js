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

// router.post(
//   '/edit-product',

//   [
//     check('title')
//       .isString()
//       .withMessage('Products must contain only letters.')
//       .trim(),

//     check('price')
//       .isFloat({ min: 1 })
//       .withMessage('Price must be a number, and must be greater than 0.')
//       .isDecimal({ force_decimal: true, decimal_digits: 2 })
//       .withMessage('Price must include cents.')
//       .trim()
//       .toFloat(),
//     check('description')
//       .isLength({ min: 6 })

//       .isString()
//       .withMessage('Your description must contain only letters'),
//   ],
//   authCheckerAndRedirecter,
//   adminController.editProduct
// );



// router.post(
//   '/add-product',

//   check('title')
//     .isString()
//     .withMessage('Product titles must contain only letters.')
//     .trim()
//     .custom((value, { req }) => {
//       return Product.findOne({ title: value }).then((product) => {
//         if (product) {
//           return Promise.reject(
//             'A product with the chosen title already exists, please choose another one.'
//           );
//         } else {
//           return value;
//         }
//       });
//     }),

//   check('price')
//     .isFloat({ min: 1 })
//     .withMessage('Price must be a number, and must be greater than 0.')
//     .isDecimal({ force_decimal: false, decimal_digits: 2 })
//     .withMessage('Price must include cents.')
//     .toFloat(),

//   check('description')
//   .matches(
//     /^[\.a-zA-Z0-9,!? ]*$/
//   )
//   .withMessage('Your description must contain only text.'),

//   authCheckerAndRedirecter,
//   adminController.postAddProduct
// );

module.exports = router;
