import React from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
    const hasMovies = movies && movies.length > 0;

    if (!hasMovies) {
        return (
            <main className="grid-wrap">
                <div className="empty-state">No movies found.</div>
            </main>
        );
    }

    return (
        <main className="grid-wrap">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
            ))}
        </main>
    );
}
