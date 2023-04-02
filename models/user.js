const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  resetToken: String,
  expiryDate: Date,

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  cart: {
    products: [
      {
        type: new Schema(
          {
            productId: {
              type: Schema.Types.ObjectId,
              ref: 'Product',
              required: true,
            },
            quantity: { type: Number, required: true },
          },
          {
            timestamps: true,
          }
        ),
      },
    ],
  },
});

userSchema.methods.clearCart = function () {
  this.cart = {
    products: [],
  };

  return this.save();
};

userSchema.methods.deleteCartItem = function (productId) {
  const updatedProducts = this.cart.products.filter((product) => {
    return productId.toString() !== product.productId.toString();
  });

  this.cart.products = updatedProducts;

  return this.save()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.products.findIndex((prod) => {
    return product._id.toString() === prod.productId.toString();
  });

  let newQuantity = 1;

  const updatedCartItems = [...this.cart.products];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.products[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    products: updatedCartItems,
  };

  this.cart = updatedCart;
  this.save();
};

module.exports = mongoose.model('User', userSchema);
