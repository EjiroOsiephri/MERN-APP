const uuid = require("uuid");
const { validationResult } = require("express-validator");
const { HttpError } = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    console.log(err);
    const error = new HttpError("Cannot get users data, try again later", 500);
    return next(error);
  }

  res.json({ user: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Enter valid inputs for the users field", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    const err = new HttpError("User signup failed", 500);
    return next(err);
  }

  if (existingUser) {
    const error = new HttpError("User already exists, login instead", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Error hashing password, please try again", 500);
    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    const err = new HttpError("Error signing up, please try again later", 500);
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      "super-secret",
      { expiresIn: "1hr" }
    );
  } catch (error) {
    console.log(error);
    const err = new HttpError("Error signing up, please try again later", 500);
    return next(err);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    const err = new HttpError("Login failed, please try again later", 500);
    return next(err);
  }

  if (!existingUser) {
    return next(
      new HttpError("Could not log in, credentials seem to be wrong.", 401)
    );
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new HttpError(
      "Could not log user in, credentials seem to be wrong.",
      500
    );
    return next(err);
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Could not log in, credentials seem to be wrong.", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "super-secret",
      { expiresIn: "1hr" }
    );
  } catch (error) {
    console.log(error);
    const err = new HttpError("Error logging in, please try again later", 500);
    return next(err);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
