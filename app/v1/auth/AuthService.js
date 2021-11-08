"use strict";
const debug = require("debug")("app:debug");
const User = require("../user/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.updateName = async (payload) => {
  const { email, firstName, lastName } = payload;
  const user = await User.findOneAndUpdate(
    { email: email },
    { firstName: firstName, lastName: lastName },
    { new: true }
  );
  if (user) return { data: user };
  return { error: "Failed to change name" };
};
exports.updateEmail = async (payload) => {
  const { email, new_email } = payload;
  const user = await User.findOneAndUpdate(
      { email: email },
      { email : new_email }
      ,{ new : true })
    

      if(user) return { data : user };

      return { error: "Error changing email"};
};
exports.updatePassword = async (payload) => {
  const { email, password } = payload;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true }
  );
  if (user) return { data: user };

  return { error: "Failed to change password" };
};

exports.login = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email: email });
  if (!user) return { error: "Invalid email or password" };

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return { error: "Invalid email or password" };

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "3h",
    }
  );
  return { data: { token: token } };
};

exports.createUser = async (payload) => {
  const {
    email,
    firstName,
    lastName,
    password,
    phone,
    address,
    img_src,
    userType,
  } = payload;

  // check if user exists
  const emailExist = await User.findOne({ email: email }).catch();
  if (emailExist) return { error: "User with email already exists" };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    address: address,
    phone: phone,
    img_src: img_src,
    userType: userType,
  });
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "2h",
    }
  );

  user.token = token;

  const userd = await user.save();
  console.log("Done ser ",userd);
  const { error } = userd;
  if (error) return { error: error };

  return { data: userd };
};
