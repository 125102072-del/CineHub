import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ items }) {
    return (
        <div className="container">
            <div className="grid">
                {items.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                ))}
            </div>
        </div>
    );
}
