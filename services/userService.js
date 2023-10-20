const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { SECRET_KEY, BASE_URL } = process.env;
const { HttpError, sendEmail } = require("../helpers");
const User = require("../models/userModel");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

exports.registerUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({ ...userData, password: hashPassword, avatarURL, verificationToken });
  
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
  }
  
  await sendEmail(verifyEmail);

  return {newUser};
}

exports.verifyUser = async (params) => {
  const { verificationToken } = params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found")
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null, })
}

exports.resendEmail = async (body) => {
  const { email } = body;
  const user = await User.findOne({ email });

  if(!user) {
    throw HttpError(401, "Email not found")
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed")
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`
  }

  await sendEmail(verifyEmail);
}

exports.loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user.verify) {
    throw HttpError(401, "Email not verification");
  }

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(userData.password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    
    return { user, token };
}

exports.updateUserAvatar = async (user, file) => {
  const { _id } = user;
  const { path: tempUpload, originalname } = file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename)

// use jimp for resize avatar
  const originalAvatar = await Jimp.read(tempUpload);
  await originalAvatar.resize(250, 250).writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  return avatarURL;
}