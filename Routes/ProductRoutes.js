const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

// POST (Create)
router.post("/", createProduct);

// GET (Read)
router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

// PATCH (Update)

router.patch("/:id", updateProduct);

// DELETE (Delete)

router.delete("/:id", deleteProduct);

module.exports = router;
