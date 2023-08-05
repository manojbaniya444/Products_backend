const express = require("express");
const router = express.Router();

const {
  addNewProduct,
  deleteUserProduct,
  deleteAll,
} = require("../controllers/userProducts");

router.post("/add", addNewProduct);
router.delete("/delete/:id", deleteUserProduct);

router.delete("/deleteall", deleteAll);

module.exports = router;
