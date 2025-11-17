const express = require("express");
const authRoutes = require("./routers/authRoutes");
require("dotenv").config();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB(); // Connect MongoDB

const app = express();

app.use(express.json());
app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use("/", require("./routers/authRoutes")); // your routes

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});