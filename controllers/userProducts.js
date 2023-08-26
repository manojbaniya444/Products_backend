const UserProducts = require("../models/UserProductsModel");

const getUserProducts = async (req, res, next) => {
  const products = await UserProducts.find();
  res.status(200).json(products);
};

const getSingleProduct = async (req, res) => {
  const singleProduct = await UserProducts.findById(req.params.productId);
  if (!singleProduct) {
    return res.status(404).json({ err: "Product not found on our database." });
  }

  res.status(200).json(singleProduct);
};

const addNewProduct = async (req, res, next) => {
  const { name, available, limit, description, price, url } = req.body;

  try {
    const addedProduct = await UserProducts.create({
      productName: name,
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
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrR7-sAA1GY2OMSz7p7blb843He9oGOAs6IA&usqp=CAU",
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

module.exports = {
  getUserProducts,
  addNewProduct,
  deleteUserProduct,
  deleteAll,
  getSingleProduct,
};
