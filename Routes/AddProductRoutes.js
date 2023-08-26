const express = require("express");
const router = express.Router();

const {
  addNewProduct,
  deleteUserProduct,
  deleteAll,
  getUserProducts,
  getSingleProduct,
} = require("../controllers/userProducts");

router.post("/add", addNewProduct);
router.delete("/delete/:id", deleteUserProduct);
router.get("/:productId", getSingleProduct);
router.get("/", getUserProducts);
router.delete("/deleteall", deleteAll);

module.exports = router;
