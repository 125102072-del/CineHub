import React, { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { movies } from "../../data/movies";
import "./movies_detail_page.css";

export default function MovieDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const movie = useMemo(() => movies.find((m) => m.id === id), [id]);

    if (!movie) {
        return (
            <div className="md-root">
                <div className="md-card">
                    <p>Movie not found.</p>
                    <Link to="/" className="btn primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    const tags = ["IMAX", "Dolby", "English", "Subtitles"];

    // Generate 6 selectable dates
    const today = new Date();
    const dateOptions = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dow = d.toLocaleDateString(undefined, { weekday: "short" });
        const dd = d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
        return { key: d.toISOString().slice(0, 10), labelTop: dow, labelBottom: dd };
    });

    const [selectedDate, setSelectedDate] = useState(dateOptions[1].key);
    const [selectedShow, setSelectedShow] = useState(movie.times?.[2] ?? null);

    const theatres = [
        { id: "savoy", name: "Savoy Cinema", addr: "St Patrick's St, Cork", from: "€9.50", shows: movie.times },
        { id: "gate", name: "Gate Multiplex", addr: "North Main St, Cork", from: "€8.90", shows: ["11:45", "14:20", "17:10", "20:05"] },
    ];

    return (
        <div className="md-root">
            {/* Topbar */}
            <header className="md-topbar">
                <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">‹</button>
                <div className="brand-mini">CINE<span>&</span>HUB</div>
                <div className="user-mini">
                    <button className="link">Logout</button>
                    <span className="avatar tiny" />
                </div>
            </header>

            {/* Hero Section */}
            <section className="md-hero">
                <div className="md-card">
                    <div className="md-left">
                        <div className="poster-lg" style={{ backgroundImage: `url(${movie.poster})` }} />
                    </div>

                    <div className="md-right">
                        <div className="crumbs"><Link to="/">Home</Link> › Movie › {movie.title}</div>

                        <h1 className="md-title">{movie.title}</h1>

                        <div className="md-meta">
                            <span className="star">★</span> {movie.rating.toFixed(1)}
                            <span className="sep">•</span> {movie.duration}
                            <span className="sep">•</span> {movie.genres.join(", ")}
                            <span className="sep">•</span> {movie.badge}+
                        </div>

                        <p className="md-desc">
                            A rogue physicist assembles a crew to ‘steal’ time from a parallel lab.
                            As timelines blur, the team must pull off one last jump before reality snaps back.
                        </p>

                        <div className="md-tags">
                            {tags.map((t) => (
                                <button key={t} className="tag ghost">{t}</button>
                            ))}
                        </div>

                        <div className="md-section-title">Select Date</div>
                        <div className="date-row">
                            {dateOptions.map((d) => (
                                <button
                                    key={d.key}
                                    className={`date-pill ${selectedDate === d.key ? "selected" : ""}`}
                                    onClick={() => setSelectedDate(d.key)}
                                >
                                    <span className="top">{d.labelTop}</span>
                                    <span className="bottom">{d.labelBottom}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Theatres */}
            <section className="md-theatres">
                <h3 className="md-subheading">Available Theatres & Showtimes</h3>
                <p className="md-hint">Choose a theatre and time slot. Then tap Book Tickets.</p>

                <div className="theatre-list">
                    {theatres.map((t) => (
                        <div key={t.id} className="theatre-card">
                            <div className="th-left">
                                <div className="th-name">{t.name}</div>
                                <div className="th-addr">{t.addr} • from {t.from}</div>
                            </div>

                            <div className="th-times">
                                {t.shows.map((s) => (
                                    <button
                                        key={s}
                                        className={`slot ${selectedShow === s ? "active" : ""}`}
                                        onClick={() => setSelectedShow(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                                <button className="slot disabled" disabled>23:30</button>
                            </div>

                            <div className="th-actions">
                                <button className="btn ghost">F&B</button>
                                <button className="btn ghost">Parking</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="md-footer">
                <button className="btn cta">Book Tickets →</button>
            </footer>
        </div>
    );
}
