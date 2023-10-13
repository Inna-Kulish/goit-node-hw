const { catchAsync, HttpError, userValidators } = require('../helpers');
const User = require("../models/userModel");

exports.checkRegisterUserData = catchAsync(async (req, res, next) => {
  const { error } = userValidators.registerSchema(req.body);
    
  if (error) {
    throw HttpError(400, error.message);
  }
    
    const { email } = req.body;
    const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  next();
});

exports.checkLoginUserData = catchAsync(async (req, res, next) => {
    const { error } = userValidators.loginSchema(req.body);

    if (error) {
    throw HttpError(400, error.message);
    }
    
  next();
})

exports.checkUpdateSubscription = (req, res, next) => {
  const { error } = userValidators.updateSubscription(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  next();
}