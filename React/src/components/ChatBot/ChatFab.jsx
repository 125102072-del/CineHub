import React from "react";
import "./Chatbot.css"; 

export default function ChatFab({ chatOpen, setChatOpen }) {
  return (
    <button
      className="fab main"
      onClick={() => setChatOpen(prev => !prev)}
      title={chatOpen ? "Close assistant" : "Open assistant"}
    >
      💬
    </button>
  );
}
