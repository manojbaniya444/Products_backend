const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const { createToken } = require("../services/auth");

const getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ messsage: "Successfully get all users from users api." });
};

// User registration logic
const registerUser = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username,
      password: hash,
    })
      .then(() => {
        res.status(200).json({ message: "User registered successfully." });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  });
};

// User login logic
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Username doesnt exist in our database." });
  }

  const hashedDbPassword = user.password;

  const isValidPassword = await bcrypt.compare(password, hashedDbPassword);

  if (!isValidPassword) {
    console.log("Incorrect password check again.");
    return res.status(401).json({ err: "Incorrect password." });
  } else {
    console.log("logged in.");

    const accessToken = createToken(user);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged in successfully.", accessToken });
  }
};

module.exports = { getAllUsers, registerUser, loginUser };
