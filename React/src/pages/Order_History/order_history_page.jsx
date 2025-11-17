import React from "react";
import "./order_history_page.css";
import { useNavigate } from "react-router-dom";

export default function OrderHistoryPage() {
    const navigate = useNavigate();

    // Example past orders — replace later with real data from backend
    const orders = [
        {
            id: "ORD-2023-001",
            movie: "Peaky Blinders",
            date: "2023-12-18",
            time: "17:20",
            theatre: "Savoy Cinema",
            seats: ["B4", "B5"],
            poster:
                "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1600&auto=format&fit=crop",
        },
        {
            id: "ORD-2023-002",
            movie: "Deadpool vs Wolverine",
            date: "2023-12-10",
            time: "20:05",
            theatre: "Gate Cinemas",
            seats: ["C2", "C3"],
            poster:
                "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?q=80&w=1600&auto=format&fit=crop",
        },
    ];

    return (
        <div className="oh-root">
            {/* Topbar */}
            <header className="oh-topbar">
                <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
                <div className="brand-mini">CINE<span>&</span>HUB</div>
            </header>

            <h1 className="oh-title">Order History</h1>

            {orders.length === 0 ? (
                <p className="oh-empty">No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map((o) => (
                        <div key={o.id} className="order-card">
                            <div
                                className="order-poster"
                                style={{ backgroundImage: `url(${o.poster})` }}
                            />

                            <div className="order-info">
                                <h2 className="movie-title">{o.movie}</h2>

                                <div className="meta">
                                    <span>Date: {o.date}</span>
                                    <span>Time: {o.time}</span>
                                    <span>Theatre: {o.theatre}</span>
                                </div>

                                <div className="seats">
                                    Seats: {o.seats.join(", ")}
                                </div>

                                <button
                                    className="btn primary small"
                                    onClick={() => navigate(`/movie/${o.movieId}`)}
                                >
                                    Book Again
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
