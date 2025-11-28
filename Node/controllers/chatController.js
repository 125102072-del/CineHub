// controllers/chatController.js
const { sendMessageToLex } = require("../services/chatService");

const chatController = async (req, res) => {
  try {
    const message = req.body.text;

    if (!message) {
      return res.status(400).json({ reply: "⚠️ No message received." });
    }

    const reply = await sendMessageToLex(message);

    res.status(200).json({ reply });

  } catch (err) {
    console.error("LEX ERROR:", err);
    res.status(500).json({
      reply: "Error connecting to CineHub chatbot"
    });
  }
};

module.exports = { chatController };
