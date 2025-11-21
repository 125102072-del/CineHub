const express = require("express");
const { fetchMoviesController , fetchMovieByIdController } = require("../controllers/movieController");

const router = express.Router();

router.get("/movies", fetchMoviesController);
router.get("/movies/:id", fetchMovieByIdController);

module.exports = router;
