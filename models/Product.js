const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);

