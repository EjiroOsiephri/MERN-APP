const uuid = require("uuid");
const { HttpError } = require("../models/http-error");

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const users = DUMMY_PLACES.find((creator) => creator.creator === userId);

  if (!users) {
    return next(
      new HttpError("Cannot find place with a user with a specific id", 404)
    );
  }

  res.json({ users });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, creator, address } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
