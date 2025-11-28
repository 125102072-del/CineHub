const express = require("express");
const { fetchMoviesController , fetchMovieByIdController } = require("../controllers/movieController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/movies", auth, fetchMoviesController);
router.get("/movies/:id", auth,  fetchMovieByIdController);

module.exports = router;
