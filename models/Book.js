const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedDate: Date,
  isbn: {
    type: String,
    unique: true,
  },
  description: String,
  coverImage: String,
  tradePrice: Number,
  retailPrice: Number,
  quantity: Number,
  isAvailable: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Book", BookSchema);
