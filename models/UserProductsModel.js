const mongoose = require("mongoose");

const UserProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
    stockDetail: {
      available: {
        type: Boolean,
        default: true,
      },
      limit: {
        type: Number,
        default: 1,
      },
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    // },
    // available: {
    //   type: Boolean,
    //   default: true,
    // },

    // limit: {
    //   type: Number,
    //   default: 1,
    // },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserProducts", UserProductsSchema);
