exports.error404 = (req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Page not Found',
    path: '',
    isLoggedIn: req.session.isLoggedIn,
    cartNumber: !req.user ? null : req.user.cart.products.length
  });
};

exports.error500 = (req, res) => {
  res.status(500).render('500', {
    pageTitle: 'Something went wrong',
    path: '',
    isLoggedIn: req.session.isLoggedIn,
    cartNumber: !req.user ? null : req.user.cart.products.length
  });
};
