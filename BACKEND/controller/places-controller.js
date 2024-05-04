const { uuid } = require("uuid");
const { HttpError } = require("../models/http-error");

const { validationResult } = require("express-validator");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most famous buildings in the world",
    address: "54 NEW YORK SRTREET",
    location: {
      lat: 40.32345,
      lon: -73.3457,
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!places) {
    throw new HttpError("Cannot find place with a specific id", 404);
  }

  res.json(places);
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((creator) => creator.creator === userId);

  if (!places || places.length === 0) {
    return next(
      new HttpError("Cannot find place with a user with a specific id", 404)
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, creator, address } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes, please check your data", 422);
  }

  const createdPlace = {
    id: uuid,
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new Error("Cannot find place with this Id");
  }
  let filteredPlaces = DUMMY_PLACES.filter((p) => p.id !== placeId);

  DUMMY_PLACES = filteredPlaces;

  res.status(200).json({ message: "deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesdByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
