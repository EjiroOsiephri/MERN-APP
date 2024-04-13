import React from "react";
import PlaceList from "../components/PlaceList";

import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    tittle: "Empire State Building",
    description: "One of the most famous buildings in the world",
    imageUrl:
      "https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484445,
      lon: -73.9882393,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous buildings in the world",
    imageUrl:
      "https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484445,
      lon: -73.9882393,
    },
    creator: "u2",
  },
];

const UserPlace = () => {
  const userID = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userID);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlace;
