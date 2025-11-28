import React, { useMemo, useState, useEffect } from "react";
import "./homepage.css";
import { movies as allMovies } from "../../data/movies";

import Header from "../../components/Header";
import MovieGrid from "../../components/MovieGrid";

import Chatbot from "../../components/ChatBot/chatbot";
import ChatFab from "../../components/ChatBot/ChatFab";

export default function Home() {
  const [query, setQuery] = useState("");
  const [locationText, setLocationText] = useState("City Centre, Cork");
  const [chatOpen, setChatOpen] = useState(false);

  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [user] = useState({
    name: "Aarav Patel",
    email: "aarav.patel@example.com",
    photo: "https://i.pravatar.cc/150?img=12",
  });

  // ⬅️ Fetch movies on page load
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("http://localhost:8000/movies" , {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }});
        const result = await res.json();
        setMovies(result.data);  // store only data field
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  function resetHome() {
    setQuery("");
    setLocationText("City Centre, Cork");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLocationKeyDown(e) {
    if (e.key === "Enter") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? movies.filter(m => m.name?.toLowerCase().includes(q)) 
      : movies;
  }, [query, movies]);

  if (loading) {
    return <div className="home-root"><div className="empty-state">Loading movies...</div></div>;
  }

  return (
    <div className="home-root">
      <Header
        query={query}
        onQueryChange={setQuery}
        locationText={locationText}
        onLocationChange={setLocationText}
        onLocationEnter={handleLocationKeyDown}
        onLogoClick={resetHome}
        user={user}
      />
      <MovieGrid movies={filtered} />
      <Chatbot chatOpen={chatOpen} />
      <ChatFab chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </div>
  );
}
