const Showtime = require("../models/Showtime");
const Theatre = require("../models/Theatre");

const getTheatresByMovie = async (movieId, show_date) => {
  let query = { movie_id: Number(movieId) };
  if (show_date) query.show_date = show_date;

  const showtimes = await Showtime.find(query).lean();

  if (!showtimes.length) return [];

  const theatreIds = showtimes.map(st => st.theatre_id);

  const theatres = await Theatre.find({ theatre_id: { $in: theatreIds } }).lean();

  return theatres.map(theatre => ({
    theatre_id: theatre.theatre_id,
    name: theatre.name,
    address: theatre.address,
    city: theatre.city,
    showtimes: showtimes
      .filter(st => st.theatre_id === theatre.theatre_id)
      .map(st => ({
        showtime_id: st.showtime_id,
        show_date: st.show_date,
        start_time: st.start_time,  // array of timings
        ticket_price: st.ticket_price
      }))
  }));
};

module.exports = { getTheatresByMovie };
