const jwt = require("jsonwebtoken");

// Create token
const createToken = (user) => {
  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
      role: user.role,
    },
    process.env.SECRET_KEY
  );

  return accessToken;
};

// To verify Token and allow access

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated." });
  }

  try {
    const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (validToken) {
      req.authenticated = true; // Setting the authenticated value true after successful jwt verification
      // req.user = validToken Attach user data to the request object/
      // now use this req.user.role === "Admin" for authorization

      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createToken, verifyToken };
