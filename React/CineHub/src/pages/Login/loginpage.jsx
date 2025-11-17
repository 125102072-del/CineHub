import React, { useState } from "react";
import "./loginpage.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMsg("Login successful!");
  
        // Save user info or JWT token
        localStorage.setItem("user", JSON.stringify(result.user));
  
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        setMsg(result.message || "Login failed");
      }
  
    } catch (err) {
      setMsg("Server error, try again later.");
    }
  }

  return (
    <div className="page-wrapper">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login to CineHub</h2>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" type="submit">
              Sign in
            </button>

            {msg && (
              <div className={`msg ${msg.includes("success") ? "success" : "error"}`}>
                {msg}
              </div>
            )}

            <div className="minor">
              <span>Not already registered?</span>
              <Link to="/register">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
