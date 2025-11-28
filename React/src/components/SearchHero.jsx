import React from "react";

export default function SearchHero({ locationText }) {
    return (
        <section className="hero">
            <div className="hero-card">
                <h3 className="hero-title">Now Showing in {locationText}</h3>
                <p className="hero-sub">
                    Browse screenings. Click a card to view showtimes and seats.
                </p>
            </div>
        </section>
    );
}
