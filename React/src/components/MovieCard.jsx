import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { id, poster, badge, title, rating, genres, duration, times } = movie;

  return (
    <Link to={`/movie/${id}`} className="movie-card link-reset">
      <div
        className="poster"
        style={{ backgroundImage: `url(${poster})` }}
      >
        {badge && <span className="badge">{badge}</span>}
      </div>

      <div className="card-body">
        <div className="title-row">
          <h4 className="title">{title}</h4>
          <span className="rating">{rating?.toFixed?.(1) ?? "—"}</span>
        </div>

        <div className="meta">
          <span>{(genres ?? []).join(" • ")}</span>
          <span className="dot">•</span>
          <span>{duration ?? "—"}</span>
        </div>

        <div className="times">
          {(times ?? []).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
