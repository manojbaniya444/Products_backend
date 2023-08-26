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
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrR7-sAA1GY2OMSz7p7blb843He9oGOAs6IA&usqp=CAU",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
