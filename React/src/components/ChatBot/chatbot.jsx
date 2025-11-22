import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

export default function Chatbot({ chatOpen }) {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Need help finding seats or showtimes?" }
  ]);
  const [input, setInput] = useState("");

  const bodyRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput })
      });

      const data = await res.json();
      const botMessage = { type: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "⚠️ Unable to connect to server." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={`cinehub-chat ${chatOpen ? "open" : ""}`}>
      <div className="chat-head">
        <div className="chat-title">CineHub Assistant</div>
        <div className="online">Online</div>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.type}`}>
            {m.text}
          </div>
        ))}

        {/* Optional action buttons */}
        <div className="chat-actions">
          <button className="btn ghost">Recommend seats</button>
          <button className="btn ghost">Change time</button>
        </div>
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button className="btn primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
