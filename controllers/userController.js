const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const { createToken } = require("../services/auth");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
};

// User registration logic
const registerUser = (req, res) => {
  // 1) Get the username password and role from the user through the body.
  const { username, password, role } = req.body;
   
  // 2) Then hash the password first using bcrpt library
  bcrypt.hash(password, 10).then((hash) => {

  // 3) Create the new user in the mongo db using mongoose schema with the username, role and the hashed pw.
    User.create({
      username,
      password: hash,
      role,
    })
      .then(() => {
        // res.cookie("access-token", accessToken, {
        //   maxAge: 60 * 60 * 1000,
        //   httpOnly: true,
        //   sameSite: "None",
        // });
        res
          .status(200)
          .json({ message: "Account created successfully.", status: 200 });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ error: error, status: 400, errorMessage: "Username exist" });
      });
  });
};

// User login logic
const loginUser = async (req, res) => {
  const { username, password } = req.body;
   // First check if the username is in the database or not.
  const user = await User.findOne({ username: username });

  if (!user) {
    return res
      .status(403)
      .json({ error: "Username doesnt exist in our database." });
  }

  const hashedDbPassword = user.password;
 // Compare the password with the encoded password using bcrypt library.
  const isValidPassword = await bcrypt.compare(password, hashedDbPassword);

  if (!isValidPassword) {
    console.log("Incorrect password check again.");
    return res.status(401).json({ err: "Incorrect password." });
  } else {
    console.log("logged in.");
     // Create the token after successful logged in the system.
    const accessToken = createToken(user);

    // Set the cookie.
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res
      .status(200)
      .json({ message: "Logged in successfully.", accessToken, username });
  }
};

module.exports = { getAllUsers, registerUser, loginUser };
