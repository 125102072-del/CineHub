const express = require("express");
const cors = require("cors");
const authRoutes = require("./routers/authRoutes");
const bodyParser = require("body-parser");
const movieRoutes = require("./routers/movieRoutes");
const theatreRoutes = require("./routers/theatreRoutes");
const chatRoutes = require("./routers/chatRoutes");

const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());

app.use(express.json());
app.use("/", authRoutes);
app.use("/", movieRoutes);
app.use("/",theatreRoutes);
app.use("/", chatRoutes);


app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
