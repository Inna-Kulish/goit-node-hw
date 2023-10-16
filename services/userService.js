const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { SECRET_KEY } = process.env;
const { HttpError } = require("../helpers");
const User = require("../models/userModel");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

exports.loginUser = async (userData) => {
    
  const user = await User.findOne({ email: userData.email });

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