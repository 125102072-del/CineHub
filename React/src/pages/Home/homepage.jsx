import React, { useMemo, useState } from "react";
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

  const [user] = useState({
    name: "Aarav Patel",
    email: "aarav.patel@example.com",
    photo: "https://i.pravatar.cc/150?img=12",
  });

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
    return q ? allMovies.filter(m =>
      m.title.toLowerCase().includes(q)
    ) : allMovies;
  }, [query]);

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
