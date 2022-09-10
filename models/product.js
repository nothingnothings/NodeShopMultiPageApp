const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    required: true,
    type: String,
  },

  price: {
    required: true,
    type: Number,
  },

  description: {
    required: true,
    type: String,
  },

  imageUrl: {
    required: true,
    type: String,
  },

  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Product', productSchema);
