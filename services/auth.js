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
  // If the request is simply get allow the access
  if (req.method === "GET") {
    return next();
  }
  // getting the token from the cookies
  const accessToken = req.cookies["access-token"]; // or simply req.cookies.access-token ?

  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated." });
  }

  // If user is authenticated then the following logic will be applied.
  try {
    // Verifying if the token in the cookie is valid or not with JWT verify and providing the secret key.
    const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (validToken) {
      req.authenticated = true; // Setting the authenticated value true after successful jwt verification
      req.user = validToken; // Attach user data to the request object
      // now use this req.user.role === "Admin" for authorization
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// Authorize users.

const checkAdminRole = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Access denied to unauthorized users." });
};

module.exports = { createToken, verifyToken, checkAdminRole };
