import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/TopBar/Topbar"; // ✅ reuse your Topbar
import "./order_confirmation_page.css";

export default function OrderConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Data sent from OrderSummary via navigate("/order-confirmation", { state: {...} })
    const state = location.state || {};

    const {
        movieName,
        cinemaName = "CineHub Dublin Central",
        movieId,
        showtime,
        dateLabel,
        seats = [],
        pricePerTicket = 12,
        total,
    } = state;

    const safeMovieName = movieName || "Movie";


    const ticketsCount = seats.length;
    const finalTotal =
        typeof total === "number" ? total : ticketsCount * pricePerTicket;

    // Nice readable strings
    const seatLabel = seats.length ? seats.join(", ") : "—";

    function handleBackToMain() {
        navigate("/home"); // or "/" depending on your app
    }

    // If someone lands here directly without state, show a fallback
    if (!showtime || !dateLabel || !ticketsCount) {
        return (
            <div className="confirm-root">
                <Topbar showUser={true} showBack={true} />
                <main className="confirm-container">
                    <section className="confirm-card">
                        <div className="confirm-header">
                            <div className="confirm-icon">!</div>
                            <div>
                                <h1>No booking data</h1>
                                <p>We couldn&apos;t find an active booking. Please start again.</p>
                            </div>
                        </div>
                        <button
                            className="btn primary confirm-back-btn"
                            onClick={handleBackToMain}
                        >
                            Back to Main Page
                        </button>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="confirm-root">
            {/* 🔥 This gives you CineHub left + Logout + avatar right */}
            <Topbar showUser={true} showBack={false} />

            <main className="confirm-container">
                <section className="confirm-card">
                    {/* HEADER */}
                    <div className="confirm-header">
                        <div className="confirm-icon">✔</div>
                        <div>
                            <h1>Order Confirmed</h1>
                            <p>Your booking is successful. We&apos;ve sent the tickets to your email.</p>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="confirm-body">
                        {/* LEFT SIDE – basic booking details */}
                        <div className="confirm-details-left">
                            <h2 className="confirm-movie">{movieName}</h2>
                            <p className="confirm-theatre">{cinemaName}</p>
                            <p className="confirm-datetime">
                                {dateLabel} • {showtime}
                            </p>
                            <p className="confirm-seats">
                                Seats: {seatLabel} ({ticketsCount} tickets)
                            </p>
                        </div>

                        {/* RIGHT SIDE – price summary */}
                        <div className="confirm-details-right">
                            <div className="confirm-row">
                                <span>Ticket price</span>
                                <span>
                                    €{Number(pricePerTicket).toFixed(2)} × {ticketsCount}
                                </span>
                            </div>

                            <div className="confirm-row">
                                <span>Convenience fees</span>
                                <span>€0.00</span>
                            </div>

                            <div className="confirm-row confirm-total">
                                <span>Amount Paid</span>
                                <span>€{Number(finalTotal).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER BUTTON */}
                    <button
                        className="btn primary confirm-back-btn"
                        onClick={handleBackToMain}
                    >
                        Back to Main Page
                    </button>
                </section>
            </main>
        </div>
    );
}
