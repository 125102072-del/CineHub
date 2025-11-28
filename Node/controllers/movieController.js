const { getAllMovies, getMovieById } = require("../services/movie");

const fetchMoviesController = async (req, res) => {
  try {
    const response = await getAllMovies();
    res.status(200).json({
      status: 200,
      message: "Movies fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const fetchMovieByIdController = async (req, res) => {
    try {
      const response = await getMovieById(req.params.id);
      res.status(200).json({
        status: 200,
        message: "Movie fetched successfully",
        data: response,
      });
    } catch (error) {
      res.status(404).json({ status: 404, error: error.message });
    }
  };

module.exports = { fetchMoviesController, fetchMovieByIdController };
