// src/pages/Seat_Selection/seat_selection_page.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./seat_selection_page.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { movies } from "../../data/movies";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const SEATS_PER_ROW = 14;
const PRICE_PER_TICKET = 12.0;

const BLOCKED_SEATS = new Set([
    "D7",
    "D8",
    "C7",
    "C8",
    "E7",
    "E8",
    "F6",
    "F7",
]);

const TIME_SLOTS = ["14:15", "17:20", "20:05", "22:10"];

const DATE_OPTIONS = [
    { id: 0, label: "Tue, Oct 7" },
    { id: 1, label: "Wed, Oct 8" },
    { id: 2, label: "Thu, Oct 9" },
];

export default function SeatSelection() {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const location = useLocation();

    const [user] = useState({
        name: "Aarav Patel",
        email: "aarav.patel@example.com",
        photo: "https://i.pravatar.cc/150?img=12",
    });

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userBtnRef = useRef(null);
    const userMenuRef = useRef(null);

    const passed = location.state ?? {};
    const [activeTime, setActiveTime] = useState(passed.showtime || "20:05");
    const [activeDateId, setActiveDateId] = useState(
        typeof passed.dateId === "number" ? passed.dateId : 1
    );

    const [selectedSeats, setSelectedSeats] = useState([]);

    const movie = useMemo(
        () => movies.find((m) => String(m.id) === String(movieId)) ?? movies[0],
        [movieId]
    );

    const activeDate = DATE_OPTIONS.find((d) => d.id === activeDateId);

    const totalPrice = useMemo(
        () => selectedSeats.length * PRICE_PER_TICKET,
        [selectedSeats]
    );

    useEffect(() => {
        function handleClick(e) {
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
        function handleKey(e) {
            if (e.key === "Escape") setUserMenuOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [userMenuOpen]);

    function handleLogoClick() {
        navigate("/");
    }

    function handleLogout() {
        navigate("/login");
    }

    function toggleSeat(seatId) {
        if (BLOCKED_SEATS.has(seatId)) return;

        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    }

    // 🔴 THIS WAS alert(...) BEFORE
    function handleProceed() {
        if (!selectedSeats.length) return;

        navigate("/order-summary", {
            state: {
                movieId: movie.id,
                showtime: activeTime,
                dateLabel: activeDate?.label || "",
                seats: selectedSeats,
                pricePerTicket: PRICE_PER_TICKET,
                total: totalPrice,
                cinemaName: "CineHub Dublin Central", // adjust if needed
            },
        });
    }

    return (
        <div className="seat-root">
            <header className="topbar">
                <button
                    className="brand clicky"
                    onClick={handleLogoClick}
                    title="Back to home"
                >
                    <span className="logo">
                        CIN<span>&</span>HUB
                    </span>
                </button>

                <div className="topbar-spacer" />

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

            <div className="seat-page">
                <section className="seat-movie-card">
                    <div className="seat-movie-left">
                        <div
                            className="seat-movie-poster"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                        />
                    </div>

                    <div className="seat-movie-right">
                        <div className="crumbs">
                            <span className="crumb-link" onClick={() => navigate("/")}>
                                Home
                            </span>{" "}
                            ›{" "}
                            <span className="crumb-link" onClick={() => navigate(-1)}>
                                Movie
                            </span>{" "}
                            › <span className="crumb-current">{movie.title}</span>
                        </div>

                        <h1 className="seat-movie-title">{movie.title}</h1>

                        <div className="seat-movie-meta">
                            <span>⭐ {movie.rating?.toFixed?.(1) ?? "—"}</span>
                            <span className="dot">•</span>
                            <span>{movie.duration ?? "132m"}</span>
                            <span className="dot">•</span>
                            <span>{(movie.genres ?? []).join(", ") || "Sci-Fi"}</span>
                            <span className="dot">•</span>
                            <span>PG-13</span>
                        </div>

                        <p className="seat-movie-sub">
                            {movie.description ||
                                "Select your seats for this showtime. Choose your preferred row and seats, then proceed to confirm your booking."}
                        </p>

                        <div className="seat-pill-row">
                            <button className="pill">IMAX</button>
                            <button className="pill">Dolby</button>
                            <button className="pill">English</button>
                            <button className="pill">Subtitles</button>
                        </div>

                        <div className="seat-date-time">
                            <div className="seat-date-block">
                                <div className="label">Date</div>
                                <div className="date-row">
                                    {DATE_OPTIONS.map((d) => (
                                        <button
                                            key={d.id}
                                            className={
                                                "date-pill" +
                                                (d.id === activeDateId ? " date-pill--active" : "")
                                            }
                                            onClick={() => setActiveDateId(d.id)}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="seat-time-block">
                                <div className="label">Showtime</div>
                                <div className="time-row">
                                    {TIME_SLOTS.map((t) => (
                                        <button
                                            key={t}
                                            className={
                                                "time-pill" +
                                                (t === activeTime ? " time-pill--active" : "")
                                            }
                                            onClick={() => setActiveTime(t)}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <main className="seat-layout">
                    <section className="seat-map-card">
                        <div className="screen-bar">SCREEN</div>

                        <div className="seat-grid">
                            <div className="seat-cell seat-cell--empty" />
                            {Array.from({ length: SEATS_PER_ROW }, (_, idx) => (
                                <div key={`col-${idx + 1}`} className="seat-col-label">
                                    {idx + 1}
                                </div>
                            ))}

                            {ROWS.map((row) => (
                                <React.Fragment key={row}>
                                    <div className="seat-row-label">{row}</div>
                                    {Array.from({ length: SEATS_PER_ROW }, (_, idx) => {
                                        const seatId = `${row}${idx + 1}`;
                                        const isBlocked = BLOCKED_SEATS.has(seatId);
                                        const isSelected = selectedSeats.includes(seatId);
                                        let cls = "seat";
                                        if (isBlocked) cls += " seat--blocked";
                                        if (isSelected) cls += " seat--selected";

                                        return (
                                            <button
                                                key={seatId}
                                                className={cls}
                                                onClick={() => toggleSeat(seatId)}
                                                disabled={isBlocked}
                                                type="button"
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="seat-legend">
                            <div className="seat-legend-item">
                                <span className="legend-box legend-box--available" /> Available
                            </div>
                            <div className="seat-legend-item">
                                <span className="legend-box legend-box--selected" /> Selected
                            </div>
                            <div className="seat-legend-item">
                                <span className="legend-box legend-box--blocked" /> Unavailable
                            </div>
                        </div>
                    </section>

                    <aside className="order-card">
                        <h2 className="order-title">Order Summary</h2>

                        <div className="order-row">
                            <span className="order-label">Movie:</span>
                            <span className="order-value">{movie.title}</span>
                        </div>

                        <div className="order-row">
                            <span className="order-label">Showtime:</span>
                            <span className="order-value">
                                {activeDate?.label || "Wed, Oct 8"} • {activeTime}
                            </span>
                        </div>

                        <div className="order-row">
                            <span className="order-label">Seats:</span>
                            <span className="order-value">
                                {selectedSeats.length
                                    ? selectedSeats.join(", ")
                                    : "No seats selected"}
                            </span>
                        </div>

                        <div className="order-row">
                            <span className="order-label">Tickets:</span>
                            <span className="order-value">
                                {selectedSeats.length} × €{PRICE_PER_TICKET.toFixed(2)}
                            </span>
                        </div>

                        <div className="order-total-row">
                            <span className="order-label">Total:</span>
                            <span className="order-total">
                                €{totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <button
                            className="btn primary order-proceed-btn"
                            onClick={handleProceed}
                            disabled={!selectedSeats.length}
                        >
                            Proceed
                        </button>
                    </aside>
                </main>
            </div>
        </div>
    );
}
