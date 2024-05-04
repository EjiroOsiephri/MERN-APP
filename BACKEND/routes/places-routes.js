const express = require("express");
const placesController = require("../controller/places-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/users/:uid", placesController.getPlacesdByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);
router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
