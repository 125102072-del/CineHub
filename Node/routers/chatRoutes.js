// routes/chatRoutes.js
const express = require("express");
const { chatController } = require("../controllers/chatController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/chat" ,  chatController);

module.exports = router;
