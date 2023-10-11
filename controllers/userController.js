const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const userService = require('../services/userService');

const { HttpError, catchAsync } = require("../helpers");

exports.register = catchAsync(async (req, res) => {
  const { password } = req.body;
  
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { user, token } = await userService.loginUser(req.body);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

exports.getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;
  
  res.json({
    email,
    subscription,
  });
});

exports.logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
})

exports.updateSubscription = catchAsync(async (req, res) => {
  const { _id } = req.user;

 const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    subscription: result.subscription,
  });
})