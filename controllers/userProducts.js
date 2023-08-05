const UserProducts = require("../models/UserProductsModel");

const addNewProduct = async (req, res, next) => {
  const { name, available, limit, description, price, url } = req.body;

  try {
    const addedProduct = await UserProducts.create({
      name,
      // addedBy: req?.user.username,
      // userId: req.user.id,
      addedBy: "Manoj Baniya",
      // available,
      // limit,
      stockDetail: {
        available,
        limit,
      },
      description,
      price,
      url,
    });
    res
      .status(200)
      .json({ msg: "Item added to the database successfully", addedProduct });
  } catch (error) {
    res.status(402).json({ msg: "Error occured", error });
  }

  //   res.status(200).json({
  //     name,
  //     addedBy: req?.user.username,
  //     userId: req?.user.id,
  //     available,
  //     limit,
  //     description,
  //     price,
  //     url,
  //   });
};

const deleteUserProduct = async (req, res, next) => {
  const userProductId = req.params.id;

  // also check if the id is of type mongoose.schema.objectId

  try {
    const deletedUserProduct = await UserProducts.findByIdAndDelete(
      userProductId
    );
    if (!deletedUserProduct) {
      return res
        .status(400)
        .status({ msg: "Cannot find item so delete operation unsuccessful." });
    }
    res
      .status(200)
      .json({ msg: "Item deleted successfully", deletedUserProduct });
  } catch (err) {
    res.status(400).json({ msg: "Error deleting", err });
  }
};

const deleteAll = async (req, res, next) => {
  await UserProducts.deleteMany({});
  res.status(200).json({ msg: "All data deleted." });
};

module.exports = { addNewProduct, deleteUserProduct, deleteAll };
