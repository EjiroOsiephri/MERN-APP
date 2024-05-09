const uuid = require("uuid");
const { validationResult } = require("express-validator");

const { HttpError } = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

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
    return next(new HttpError("Enter valid inputs for the users field"));
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
    const error = new HttpError("User already exists, login instead");
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    const err = new HttpError("Error signing up, please try again later", 500);
    return next(err);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    const err = new HttpError("User signup failed", 500);
    return next(err);
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Could not log in, credentials seem to be wrong.", 401)
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
