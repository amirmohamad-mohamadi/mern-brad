const expressAsyncHandler = require("express-async-handler");

const registerUser = expressAsyncHandler(async (req, res) => {
  res.send("Register User");
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { user, password, email } = req.body;
  if (!user || !password || !email) {
    res.status(400);
    throw new Error("Plase include all fields");
  }
  res.send("Login User");
});

module.exports = {
  registerUser,
  loginUser,
};
