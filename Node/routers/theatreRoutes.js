const express = require("express");
const { fetchTheatresByMovieController } = require("../controllers/theatreController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/theatres/:movieId", auth, fetchTheatresByMovieController);

module.exports = router;
