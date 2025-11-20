import React, { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { movies } from "../../data/movies";
import "./movies_detail_page.css";

export default function MovieDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user] = useState({
        name: "Aarav Patel",
        email: "aarav.patel@example.com",
        photo: "https://i.pravatar.cc/150?img=12",
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

    function handleLogout() {
        navigate("/login");
    }

    const movie = useMemo(
        () => movies.find((m) => String(m.id) === String(id)),
        [id]
    );

    if (!movie) {
        return (
            <div className="md-root">
                <div className="md-card">
                    <p>Movie not found.</p>
                    <Link to="/" className="btn primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const tags = ["IMAX", "Dolby", "English", "Subtitles"];

    const today = new Date();
    const dateOptions = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dow = d.toLocaleDateString(undefined, { weekday: "short" });
        const dd = d.toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
        });
        return {
            id: i,
            key: d.toISOString().slice(0, 10),
            labelTop: dow,
            labelBottom: dd,
        };
    });

    const [selectedDateId, setSelectedDateId] = useState(dateOptions[1].id);
    const [selectedShow, setSelectedShow] = useState(movie.times?.[2] ?? null);

    const theatres = [
        {
            id: "savoy",
            name: "Savoy Cinema",
            addr: "St Patrick's St, Cork",
            from: "€9.50",
            shows: movie.times,
        },
        {
            id: "gate",
            name: "Gate Multiplex",
            addr: "North Main St, Cork",
            from: "€8.90",
            shows: ["11:45", "14:20", "17:10", "20:05"],
        },
    ];

    function handleBookTickets() {
        if (!selectedShow) return;

        navigate(`/movie/${id}/seats`, {
            state: {
                showtime: selectedShow,
                dateId: selectedDateId,
            },
        });
    }

    return (
        <div className="md-root">
            {/* Topbar */}
            <header className="md-topbar">
                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                    aria-label="Back"
                >
                    ‹
                </button>

                <button
                    className="brand-mini clicky"
                    onClick={() => navigate("/")}
                    title="Go home"
                >
                    CINE<span>&</span>HUB
                </button>

                <div className="user-wrap">
                    <button className="link" onClick={handleLogout}>
                        Logout
                    </button>

                    <button
                        ref={userBtnRef}
                        className="avatar-btn"
                        aria-haspopup="menu"
                        aria-expanded={userMenuOpen}
                        onClick={() => setUserMenuOpen((v) => !v)}
                        title="Account menu"
                    >
                        <img
                            src={user.photo}
                            alt={user.name}
                            className="avatar-img"
                            draggable="false"
                        />
                    </button>

                    {userMenuOpen && (
                        <div
                            ref={userMenuRef}
                            className="user-menu"
                            role="menu"
                            aria-label="Account"
                        >
                            <div className="user-menu__header">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="avatar avatar--sm"
                                />
                                <div>
                                    <div className="um-name">{user.name}</div>
                                    <div className="um-email">{user.email}</div>
                                </div>
                            </div>
                            <button
                                className="menu-item"
                                role="menuitem"
                                onClick={() => navigate("/order-history")}
                            >
                                Order history
                            </button>
                            <button className="menu-item" role="menuitem">
                                Account settings
                            </button>
                            <div className="menu-sep" />
                            <button
                                className="menu-item danger"
                                role="menuitem"
                                onClick={handleLogout}
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="md-hero">
                <div className="md-card">
                    <div className="md-left">
                        <div
                            className="poster-lg"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                        />
                    </div>

                    <div className="md-right">
                        <div className="crumbs">
                            <Link to="/">Home</Link> › Movie › {movie.title}
                        </div>

                        <h1 className="md-title">{movie.title}</h1>

                        <div className="md-meta">
                            <span className="star">★</span> {movie.rating.toFixed(1)}
                            <span className="sep">•</span> {movie.duration}
                            <span className="sep">•</span> {movie.genres.join(", ")}
                            <span className="sep">•</span> {movie.badge}+
                        </div>

                        <p className="md-desc">
                            A rogue physicist assembles a crew to ‘steal’ time from a parallel
                            lab. As timelines blur, the team must pull off one last jump
                            before reality snaps back.
                        </p>

                        <div className="md-tags">
                            {tags.map((t) => (
                                <button key={t} className="tag ghost">
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="md-section-title">Select Date</div>
                        <div className="date-row">
                            {dateOptions.map((d) => (
                                <button
                                    key={d.key}
                                    className={`date-pill ${selectedDateId === d.id ? "selected" : ""
                                        }`}
                                    onClick={() => setSelectedDateId(d.id)}
                                >
                                    <span className="top">{d.labelTop}</span>
                                    <span className="bottom">{d.labelBottom}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="md-theatres">
                <h3 className="md-subheading">Available Theatres & Showtimes</h3>
                <p className="md-hint">
                    Choose a theatre and time slot. Then tap Book Tickets.
                </p>

                <div className="theatre-list">
                    {theatres.map((t) => (
                        <div key={t.id} className="theatre-card">
                            <div className="th-left">
                                <div className="th-name">{t.name}</div>
                                <div className="th-addr">
                                    {t.addr} • from {t.from}
                                </div>
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
                                <button className="slot disabled" disabled>
                                    23:30
                                </button>
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
                <button
                    className="btn cta"
                    onClick={handleBookTickets}
                    disabled={!selectedShow}
                >
                    Book Tickets →
                </button>
            </footer>
        </div>
    );
}
