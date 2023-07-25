const getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ messsage: "Successfully get all users from users api." });
};

module.exports = { getAllUsers };
