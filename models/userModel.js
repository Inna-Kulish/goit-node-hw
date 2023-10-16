const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const userSubscription = require('../constans/userSubscription');

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscription),
      default: userSubscription.STARTER,
    },
    token: {
      type: String,
      default: ""
    },
    avatarURL: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post("save", handleMongooseError);

const User = model("User", userSchema);

module.exports = User;
