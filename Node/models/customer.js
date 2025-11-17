const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: Number,
  username: String,
  email: String,
  phone_number: String,
  profile_photo: String,
  date_of_birth: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Customer", customerSchema);
