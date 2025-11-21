const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_id: Number,
  name: String,
  release_date: String,
  badge: String,
  description: String,
  genre: [String],
  duration: String,
  rating: Number,
  poster: String,
  tag: [String],
  times: [String]
});

module.exports = mongoose.model("Movie", movieSchema);
