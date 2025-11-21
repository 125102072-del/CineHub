import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./order_summary_page.css";
import { movies } from "../../data/movies";

export default function OrderSummary() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};

    const {
        movieId,
        showtime,
        dateLabel,
        seats = [],
        pricePerTicket = 12,
        total = 0,
        cinemaName = "CineHub Dublin Central",
    } = state;

    useEffect(() => {
        if (!movieId || !showtime || !dateLabel || !seats.length) {
            navigate("/", { replace: true });
        }
    }, [movieId, showtime, dateLabel, seats, navigate]);

    const movie = useMemo(
        () => movies.find((m) => String(m.id) === String(movieId)) ?? movies[0],
        [movieId]
    );

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

    function handleBackToSeats() {
        if (!movieId) {
            navigate(-1);
            return;
        }

        navigate(`/movie/${movieId}/seats`, {
            state: {
                showtime,
                dateLabel,
                seats,
                pricePerTicket,
                total,
                cinemaName,
            },
        });
    }

    function handleProceedPayment() {
        alert("Proceeding to payment gateway…");
    }

    const ticketsCount = seats.length;
    const finalTotal = total || ticketsCount * pricePerTicket;

    return (
        <div className="os-root">
            <header className="topbar">
                <button
                    className="brand clicky"
                    onClick={() => navigate("/")}
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

            <main className="os-page">
                <header className="os-header">
                    <h1 className="os-title">Order Summary</h1>
                    <p className="os-subtitle">
                        Review your booking and proceed to payment.
                    </p>
                </header>

                <section className="os-grid">
                    <div className="os-card order-card">
                        <h2 className="order-movie-title">{movie.title}</h2>
                        <p className="order-movie-meta">
                            PG-13 • {movie.duration ?? "132m"} •{" "}
                            {(movie.genres ?? []).join(", ")} • {cinemaName}
                        </p>

                        <div className="order-section">
                            <div className="order-row">
                                <span className="order-label">Date</span>
                                <span className="order-value">{dateLabel}</span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">Showtime</span>
                                <span className="order-value">{showtime}</span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">Seats</span>
                                <span className="order-value">
                                    {seats.length ? seats.join(", ") : "—"}
                                </span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">Tickets</span>
                                <span className="order-value">
                                    {ticketsCount} × €{pricePerTicket.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="order-total-row">
                            <span className="order-total-label">Total</span>
                            <span className="order-total-value">
                                €{finalTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="os-card payment-card">
                        <h2 className="payment-title">Payment Details</h2>
                        <p className="payment-hint">
                            Use your provider widget here (e.g., Stripe).
                        </p>

                        <div className="payment-field">
                            <label className="field-label" htmlFor="card-number">
                                Card number
                            </label>
                            <input
                                id="card-number"
                                className="field-input"
                                placeholder="4242 4242 4242 4242"
                            />
                        </div>

                        <div className="payment-row">
                            <div className="payment-field">
                                <label className="field-label" htmlFor="expiry">
                                    Expiry
                                </label>
                                <input
                                    id="expiry"
                                    className="field-input"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div className="payment-field">
                                <label className="field-label" htmlFor="cvc">
                                    CVC
                                </label>
                                <input id="cvc" className="field-input" placeholder="123" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="os-actions">
                    <button className="btn ghost big" onClick={handleBackToSeats}>
                        Back to Seats
                    </button>
                    <button
                        className="btn primary big"
                        onClick={handleProceedPayment}
                        disabled={!seats.length}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </main>
        </div>
    );
}
