import { useState } from "react";

export default function SearchHero({ onSearch }) {
    const [term, setTerm] = useState("");

    const submit = (e) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <div className="hero card container">
            <div style={{ marginBottom: 10, color: "#93c5fd", fontWeight: 700 }}>
                Now Showing in Dublin Central
            </div>
            <div style={{ color: "#94a3b8", marginBottom: 16 }}>
                Browse screenings. Click a card to view showtimes and seats.
            </div>

            <form className="hero-top" onSubmit={submit}>
                <input
                    className="hero-input"
                    placeholder="Search movies"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <button className="hero-btn">Explore</button>
            </form>
        </div>
    );
}
