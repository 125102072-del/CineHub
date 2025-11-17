import React, { useState } from "react";
import "./loginpage.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Simple validation (you can replace this with real auth)
    if (email === "user@example.com" && password === "password123") {
      setMsg("Login successful!");
      setTimeout(() => {
        navigate("/home"); // Redirect to homepage
      }, 500);
    } else {
      setMsg("Invalid email or password.");
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
