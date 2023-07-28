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
const { CardGiftcard } = require("@material-ui/icons");

// const checkAdminRole = (req, res, next) => {
//   if (req.user.role === "admin") {
//     return next();
//   }

// if (req.method === "GET") {
//   return next();
// }

//   return res
//     .status(403)
//     .json({ error: "Access denied to unauthorized users." });
// };

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
