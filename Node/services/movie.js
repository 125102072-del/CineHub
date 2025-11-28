const Movie = require("../models/Movie");

const getAllMovies = async () => {
  const movies = await Movie.find(
    {},
    {
      _id: 0,
      movie_id: 1,
      name: 1,
      badge: 1,
      genre: 1,
      duration: 1,
      times: 1,
      poster: 1
    }
  );
  return movies;
};

const getMovieById = async (id) => {
    const movie = await Movie.findOne(
      { movie_id: Number(id) },
      {
        _id: 0,
        movie_id: 1,
        badge: 1,
        genre: 1,
        duration: 1,
        times: 1,
        poster: 1,
        name: 1,
        rating: 1,
        tag: 1,
        description: 1,
        release_date: 1
      }
    );
  
    if (!movie) throw new Error("Movie not found");
    return movie;
  };

module.exports = { getAllMovies , getMovieById };
