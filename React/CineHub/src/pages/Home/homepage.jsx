import React, { useMemo, useRef, useState, useEffect } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { movies as allMovies } from "../../data/movies";

export default function Home() {
  const [query, setQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [locationText, setLocationText] = useState("City Centre, Cork");

  const [user] = useState({
    name: "Aarav Patel",                      
    email: "aarav.patel@example.com",         
    photo: "https://i.pravatar.cc/150?img=12" 
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userBtnRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (
        userMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

 function resetHome() {
    setQuery("");
    setLocationText("City Centre, Cork");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onLocationKeyDown(e) {
    if (e.key === "Enter") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? allMovies.filter(m => m.title.toLowerCase().includes(q)) : allMovies;
  }, [query, allMovies]);

  return (
    <div className="home-root">
      <header className="topbar">
        <button className="brand clicky" onClick={resetHome} title="Go home">
          <span className="logo">CIN<span>&</span>HUB</span>
        </button>

        <div className="location-pill">
          <input
            className="location-input"
            placeholder="Type a place…"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            onKeyDown={onLocationKeyDown}
          />
        </div>

        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn primary">Explore</button>
        </div>

        <div className="user-wrap">
          <button className="link">Logout</button>

          <button
            ref={userBtnRef}
            className="avatar-btn"
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
            onClick={() => setUserMenuOpen(v => !v)}
            title="Account menu"
          >
            <img src={user.photo} alt={user.name} className="avatar-img" draggable="false" />
          </button>

          {userMenuOpen && (
            <div
              ref={userMenuRef}
              className="user-menu"
              role="menu"
              aria-label="Account"
            >
              <div className="user-menu__header">
                <img src={user.photo} alt={user.name} className="avatar avatar--sm" />
                <div>
                  <div className="um-name">{user.name}</div>
                  <div className="um-email">{user.email}</div>
                </div>
              </div>
              <button className="menu-item" role="menuitem" onClick={() => window.location.href = "/order-history"}>Order history</button>
              <button className="menu-item" role="menuitem">Account settings</button>
              <div className="menu-sep" />
              <button className="menu-item danger" role="menuitem">Sign out</button>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-card">
          <h3 className="hero-title">Now Showing in {locationText}</h3>
          <p className="hero-sub">
            Browse screenings. Click a card to view showtimes and seats.
          </p>
        </div>
      </section>

      {/* ---------- Movies grid (cards link to /movie/:id) ---------- */}
      <main className="grid-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">No movies found.</div>
        ) : (
          filtered.map((m) => (
            <Link
              key={m.id}
              to={`/movie/${m.id}`}
              className="movie-card link-reset"
            >
              <div
                className="poster"
                style={{ backgroundImage: `url(${m.poster})` }}
              >
                <span className="badge">{m.badge}</span>
              </div>

              <div className="card-body">
                <div className="title-row">
                  <h4 className="title">{m.title}</h4>
                  <span className="rating">{m.rating?.toFixed?.(1) ?? "—"}</span>
                </div>

                <div className="meta">
                  <span>{(m.genres ?? []).join(" • ")}</span>
                  <span className="dot">•</span>
                  <span>{m.duration ?? "—"}</span>
                </div>

                <div className="times">
                  {(m.times ?? []).map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </main>

      {/* ---------- Chat Drawer + FAB ---------- */}
      <div className={`chat ${chatOpen ? "open" : ""}`}>
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

      <button
        className="fab main"
        onClick={() => setChatOpen(v => !v)}
        title="Open assistant"
      >
        💬
      </button>
    </div>
  );
}
