const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const { verifyToken } = require("../services/auth");

router.get("/", verifyToken, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
