export default function MovieCard({ movie }) {
  const { title, cert, genres, runtime, rating, times } = movie;

  return (
    <div className="movie-card card">
      {/* Top strip (poster placeholder) */}
      <div className="movie-poster" />

      {/* Certification badge */}
      <div className="movie-row">
        <span className="badge">{cert}</span>
        <span className="rating">{rating.toFixed(1)}</span>
      </div>

      {/* Title */}
      <div className="movie-title">{title}</div>

      {/* Meta */}
      <div className="movie-meta">
        {genres.join(" • ")} • {runtime}m
      </div>

      {/* Times */}
      <div className="time-row">
        {times.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
