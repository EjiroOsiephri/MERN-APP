const { HttpError } = require("../models/http-error");
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most famous buildings in the world",
    location: {
      lat: 40.32345,
      lon: -73.3457,
    },
    creatorId: "u1",
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
  const users = DUMMY_PLACES.find((creator) => creator.creatorId === userId);

  if (!users) {
    return next(
      new HttpError("Cannot find place with a user with a specific id", 404)
    );
  }

  res.json({ users });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
