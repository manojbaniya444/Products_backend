const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      requird: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Boolean,
      required: true,
      default: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
