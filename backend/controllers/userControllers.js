const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const { default: mongoose } = require("mongoose");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Plase include all fields");
  }

  // find if user already exists

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  res.send("Login User");
});

module.exports = {
  registerUser,
  loginUser,
};
