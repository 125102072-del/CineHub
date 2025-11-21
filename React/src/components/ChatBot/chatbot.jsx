import React from "react";
import "./Chatbot.css";  // 

export default function Chatbot({ chatOpen }) {
  return (
    <div className={`cinehub-chat ${chatOpen ? "open" : ""}`}>
      <div className="chat-head">
        <div className="chat-title">CineHub Assistant</div>
        <div className="online">Online</div>
      </div>

      <div className="chat-body">
        <div className="bubble bot">Hi! Need help finding seats or showtimes?</div>
        <div className="bubble user">Show best seats for 8pm</div>

        <div className="chat-actions">
          <button className="btn ghost">Recommend seats</button>
          <button className="btn ghost">Change time</button>
        </div>
      </div>

      <div className="chat-input">
        <input placeholder="Type a message..." />
        <button className="btn primary">Send</button>
      </div>
    </div>
  );
}
