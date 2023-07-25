const Product = require("../models/productModels");

// Creating a new product.
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(401).send(err);
  }
};

// Getting all Products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// Getting single Product
const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      return res.status(404).json({
        error: "The product you searched is not found on the database.",
      });
    }

    return res.status(200).json(singleProduct);
  } catch (error) {
    console.log("Get single Product error", error);
  }
};

// Update a single product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body });
    if (updatedProduct) {
      return res.status(202).json(updatedProduct);
    } else {
      return res.status(401).json({ message: "Cannot update debug please." });
    }
  } catch (error) {
    console.log("Error updating data", error);
  }
};

// Delete a single product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(400).json({ message: "Cannot delete" });
  }
  return res.status(200).json(deletedProduct);
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
