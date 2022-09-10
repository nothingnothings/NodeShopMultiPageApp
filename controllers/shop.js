const Product = require('../models/product');

const stripe = require('stripe')(
  'sk_test_51JzRu5CmbCw1fMfwoGYpGL1UxowTNGxpiFigIrmYjprkWQj6rk9wAVl1oIGGnG4kyhAFJEtd0VQqVMpPkbrQUNeb00B11Axm7L'
);

const fs = require('fs');

const PDFDocument = require('pdfkit');

const ObjectId = require('mongodb').ObjectId;

const Order = require('../models/order');

const { validationResult } = require('express-validator');

const path = require('path');

const pdfPath = path.join(__dirname, '..', 'faturas');

const ITEMS_PER_PAGE = 3;

exports.getStartingPage = (req, res, _next) => {
  res.render('shop/index', {
    path: '/',
    pageTitle: 'The Shop',
    cartNumber: !req.user ? null : req.user.cart.products.length,
  });
};

exports.getCheckoutPage = (req, res, next) => {
  req.user
    .populate('cart.products.productId')
    .then((user) => {
      res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        products: user.cart.products,
        cartNumber: !req.user ? null : req.user.cart.products.length,
        totalPrice: user.cart.products
          .map((product) => {
            return product.productId.price * product.quantity;
          })
          .reduce((prevValue, curValue) => {
            return prevValue + curValue;
          }, 0),
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.products.productId')
    .then((user) => {
      let totalPrice = 0;
      user.cart.products.forEach((product) => {
        totalPrice += product.quantity * product.productId.price;
      });

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: user.cart.products,
        totalPrice: totalPrice,
        cartNumber: !req.user ? null : req.user.cart.products.length,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.id;

  req.user
    .deleteCartItem(productId)
    .then((_result) => {
      res.status(302).redirect('/cart');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrdersPage = (req, res, next) => {
  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  const errors = validationResult(req);
  const validationErrors = errors.array();

  Order.find({ user: { userId: req.user._id } })
    .populate('products.product')
    .then((orders) => {
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        orders: orders,
        path: '/orders',
        cartNumber: !req.user ? null : req.user.cart.products.length,
        errorMessage: message,
        validationErrors: validationErrors,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postToCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((_result) => {
      res.redirect('/cart');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProductDetailPage = (req, res, next) => {
  const productId = req.params.productId.trim();

  if (productId.length < 24) {
    return;
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return;
      }

      res.render('shop/product-detail', {
        pageTitle: product.title,
        cartNumber: !req.user ? null : req.user.cart.products.length,
        path: '/products',
        product: product,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.orderPost = (req, res, _next) => {
  const token = req.body.stripeToken;
  let totalPrice = 0;

  req.user.populate('cart.products.productId').then((user) => {
    user.cart.products.forEach((product) => {
      totalPrice += product.productId.price * product.quantity;
    });

    const products = user.cart.products.map((product) => {
      return {
        quantity: product.quantity,

        product: { ...product.productId._doc },
      };
    });

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },

      products: products,

      totalPrice: products
        .map((product) => {
          return product.product.price * product.quantity;
        })
        .reduce((prevValue, curValue) => {
          return prevValue + curValue;
        }, 0),
    });

    order.save().then((result) => {
      const charge = stripe.charges.create({
        amount: Math.round(totalPrice * 100),
        currency: 'usd',
        description: 'Demo Order',
        source: token,
        metadata: { order_id: result._id.toString() },
      });

      return req.user.clearCart().then((_result) => {
        res.status(302).redirect('/orders');
      });
    });
  });
};

exports.getProductsPage = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  let totalItems;

  Product.countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;

      return Product.find()
        .skip((pageNumber - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .populate('userId', 'name')
        .then((products) => {
          res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products',
            hasProducts: products.length > 0,
            cartNumber: !req.user ? null : req.user.cart.products.length,
            currentPage: +pageNumber,
            hasNextPage: ITEMS_PER_PAGE * pageNumber < totalItems,
            hasPreviousPage: +pageNumber > 1,
            nextPageNumber: +pageNumber + 1,
            previousPageNumber: pageNumber - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
            paginationPath: '/products',
          });
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFatura = (req, res, _next) => {
  const orderId = req.params.orderId;
  const invoiceName = 'fatura-' + orderId + '.pdf';
  const invoicePath = `${pdfPath}/${invoiceName}`;

  Order.findById(ObjectId(orderId)).then((order) => {
    if (!order) {
      req.flash('error', 'Your order could not be found.');
      return res.redirect('/orders');
    } else {
      if (order.user.userId.toString() !== req.user._id.toString()) {
        req.flash('error', 'Your user was not responsible for that order.');
        return res.redirect('/orders');
      } else {
        const pdfDoc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          `inline; filename="${invoiceName}"`
        );

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        pdfDoc.fontSize(26).text('Fatura', {
          align: 'center',
        });
        pdfDoc.text('------------------------------------------------------');
        order.products.forEach((prod) => {
          pdfDoc
            .fontSize(20)
            .text(
              'Produto: ' +
                prod.product.title +
                ' - ' +
                prod.quantity +
                'x' +
                ' $ ' +
                prod.product.price
            );
        });
        pdfDoc.fontSize(25).text(' ');
        pdfDoc.text('------------------------------------------------------');
        pdfDoc.fontSize(25).text('Preço total: $' + order.totalPrice);
        pdfDoc.end();
      }
    }
  });
};
