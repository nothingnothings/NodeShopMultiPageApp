const Product = require('../models/product');

const { validationResult } = require('express-validator');

const ITEMS_PER_PAGE = 3;

exports.getAddProductPage = (req, res) => {
  const editMode = req.query.edit;

  const errors = validationResult(req);
  validationErrors = errors.array();

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    cartNumber: !req.user ? null : req.user.cart.products.length,
    editing: editMode,
    errorMessage: null,
    validationErrors,
  });
};

exports.getEditProductPage = (req, res, next) => {
  const editMode = req.query.edit;

  const errors = validationResult(req);
  validationErrors = errors.array();

  if (!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        req.flash('error', 'Product not found');
        return res.redirect('/admin/product-list-admin');
      } else {
        return res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: editMode,
          errorMessage: null,
          cartNumber: !req.user ? null : req.user.cart.products.length,
          validationErrors,
          prod: {
            image: product.imageUrl,
            title: product.title,
            price: product.price,
            description: product.description,
            _id: product._id,
          },
        });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProductsAdminPage = (req, res, next) => {
  const userId = req.session.user._id;
  const pageNumber = req.query.page || 1;
  let totalItems;

  const errors = validationResult(req);
  validationErrors = errors.array();

  Product.countDocuments({ userId: userId })
    .then((numProducts) => {
      totalItems = numProducts;

      return Product.find({ userId: userId })
        .skip((pageNumber - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((products) => {
          if (!products) {
            res.render('admin/product-list-admin', {
              path: '/admin/products-list',
              pageTitle: 'Admin Products Page',
              prods: [],
              currentPage: +pageNumber,
              hasNextPage: ITEMS_PER_PAGE * pageNumber < totalItems,
              cartNumber: !req.user ? null : req.user.cart.products.length,
              hasPreviousPage: +pageNumber > 1,
              nextPageNumber: +pageNumber + 1,
              previousPageNumber: pageNumber - 1,
              lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
            });
          }

          res.render('admin/product-list-admin', {
            path: '/admin/products-list',
            pageTitle: 'Admin Products Page',
            prods: products,
            cartNumber: !req.user ? null : req.user.cart.products.length,
            errorMessage: null,
            validationErrors: validationErrors,
            currentPage: +pageNumber,
            hasNextPage: ITEMS_PER_PAGE * pageNumber < totalItems,
            hasPreviousPage: +pageNumber > 1,
            nextPageNumber: +pageNumber + 1,
            previousPageNumber: pageNumber - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
            paginationPath: '/admin/product-list-admin',
          });
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
