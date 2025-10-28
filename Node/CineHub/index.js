const express = require("express");
const authRoutes = require("./routers/authRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});