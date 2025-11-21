const { getTheatresByMovie } = require("../services/theatreService");

const fetchTheatresByMovieController = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const show_date = req.query.show_date || req.body?.show_date;

    const theatres = await getTheatresByMovie(movieId, show_date);

    res.status(200).json({
      status: 200,
      message: "Theatres fetched successfully",
      data: theatres
    });

  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = { fetchTheatresByMovieController };
