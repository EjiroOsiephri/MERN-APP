const apiKey = "pk.ade473654fff62000ecaf4e7ee0fc47e";
const axios = require("axios");
const { HttpError } = require("../models/http-error");

const getCoordsForAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
        address
      )}&format=json`
    );

    if (!response.data || response.data.length === 0) {
      throw new HttpError("Could not find place for the specified address");
    }

    // Extracting coordinates from the first result
    const coordinates = {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };

    return coordinates;
  } catch (error) {
    throw new HttpError(
      "Could not fetch coordinates for the specified address",
      500
    );
  }
};

exports.getCoordsForAddress = getCoordsForAddress;
