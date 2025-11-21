const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  showtime_id: Number,
  movie_id: Number,
  theatre_id: Number,
  show_date: String,
  screen_id: Number,
  start_time: [String],
  ticket_price: Number,
});

module.exports = mongoose.model("Showtime", showtimeSchema);
