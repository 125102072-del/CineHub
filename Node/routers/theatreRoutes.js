const express = require("express");
const { fetchTheatresByMovieController } = require("../controllers/theatreController");

const router = express.Router();

router.get("/theatres/:movieId", fetchTheatresByMovieController);

module.exports = router;
