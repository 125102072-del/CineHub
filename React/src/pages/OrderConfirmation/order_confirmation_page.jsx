import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../../components/TopBar/Topbar"; // 
import "./order_confirmation_page.css";

export default function OrderConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();

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

    const seatLabel = seats.length ? seats.join(", ") : "—";

    function handleBackToMain() {
        navigate("/home"); // 
    }

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
        <div className="md-root">
            <Topbar showUser={true} showBack={true} />

            <main className="confirm-container">
                <section className="confirm-card">
                    <div className="confirm-header">
                        <div className="confirm-icon">✔</div>
                        <div>
                            <h1>Order Confirmed</h1>
                            <p>Your booking is successful. We&apos;ve sent the tickets to your email.</p>
                        </div>
                    </div>

                    <div className="confirm-body">
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
