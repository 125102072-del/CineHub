const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
  theatre_id: Number,
  name: String,
  base_location: String,
  address: String,
  city: String,
  phone_number: String,
});

module.exports = mongoose.model("Theatre", theatreSchema);
