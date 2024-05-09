const { uuid } = require("uuid");
const { HttpError } = require("../models/http-error");

const { validationResult } = require("express-validator");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");
const { getCoordsForAddress } = require("../util/location");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something wnet wrong, couldnt find a place",
      404
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Cannot find place with a specific id", 404);
    return next(error);
  }

  res.json({ place: place?.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;

  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (error) {
    console.log(error);
    const err = new HttpError("Fetching places failed, please try again", 500);
    return next(err);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError("Cannot find place with a user with a specific id", 404)
    );
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const { title, description, creator, address } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passes, please check your data", 422)
    );
  }

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  let users;

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    creator,
  });

  try {
    users = await User.findById(creator);
  } catch (error) {
    console.log(error);
    const err = new HttpError("An error occured,try again later", 500);
    return next(err);
  }

  if (!users) {
    const error = new HttpError("Could not find user for provided id");
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    users.places.push(createdPlace);
    await users.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passes, please check your data", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occured could not update place", 500);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occured could not update place", 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred, could not delete place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find place with corresponding user id",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ placeId, session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred, could not delete place",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesdByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
