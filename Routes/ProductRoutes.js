const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { checkAdminRole } = require("../services/auth");

// POST (Create)
router.post("/", checkAdminRole, createProduct);

// GET (Read)
router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

// PATCH (Update)

router.patch("/:id", checkAdminRole, updateProduct);

// DELETE (Delete)

router.delete("/:id", checkAdminRole, deleteProduct);

module.exports = router;
