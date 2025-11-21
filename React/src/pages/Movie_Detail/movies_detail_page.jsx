import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./movies_detail_page.css";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theatresData, setTheatresData] = useState([]);
  const [loadingTheatres, setLoadingTheatres] = useState(true);

  const movieTimes = movie?.times ?? [];
  const movieGenres = movie?.genre ?? [];
  const ticketTags = ["IMAX", "Dolby", ...(movie?.tag ?? [])];

  const today = new Date();
  const dateOptions = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      labelTop: d.toLocaleDateString(undefined, { weekday: "short" }),
      labelBottom: d.toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
    };
  });

  const [selectedDate, setSelectedDate] = useState(dateOptions[1]?.key ?? "");
  const [selectedShow, setSelectedShow] = useState(null); // updated

  const theatres = theatresData;


  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`http://localhost:8000/movies/${id}`);
        const json = await res.json();
        setMovie(json.data || null);
      } catch (err) {
        console.error("Error loading movie", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    async function fetchTheatres() {
      try {
        setLoadingTheatres(true);

        // Format yyyy-mm-dd -> dd-mm-yyyy for backend
        const dd = selectedDate.slice(8, 10);
        const mm = selectedDate.slice(5, 7);
        const yyyy = selectedDate.slice(0, 4);
        const formattedDate = `${dd}-${mm}-${yyyy}`;

        const res = await fetch(
          `http://localhost:8000/theatres/${id}?show_date=${formattedDate}`
        );
        const json = await res.json();
        setTheatresData(json.data || []);
        setSelectedShow(null); // reset selected show when date changes
      } catch (err) {
        console.error("Error loading theatres", err);
        setTheatresData([]);
      } finally {
        setLoadingTheatres(false);
      }
    }

    fetchTheatres();
  }, [id, selectedDate]);

  function handleBookTickets() {
    if (!selectedShow) return;

    navigate(`/movie/${id}/seats`, {
      state: {
        showtime: selectedShow,      // selected time
        selectedDate                 // chosen date
      }
    });
  }

  return (
    <div className="md-root">
      {loading ? (
        <div className="md-card"><p>Loading movie…</p></div>
      ) : !movie ? (
        <div className="md-card">
          <p>Movie not found.</p>
          <Link to="/" className="btn primary">Back to Home</Link>
        </div>
      ) : (
        <>
          <header className="md-topbar">
            <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
            <div className="brand-mini">CINE<span>&</span>HUB</div>
            <div className="user-mini">
              <button className="link">Logout</button>
              <span className="avatar tiny" />
            </div>
          </header>

          <section className="md-hero">
            <div className="md-card">
              <div className="md-left">
                <div className="poster-lg" style={{ backgroundImage: `url(${movie.poster})` }} />
              </div>

              <div className="md-right">
                <div className="crumbs"><Link to="/home">Home</Link> › Movie › {movie.name}</div>

                <h1 className="md-title">{movie.name}</h1>

                <div className="md-meta">
                  <span className="star">★</span> {movie.rating}
                  <span className="sep">•</span> {movie.duration}
                  <span className="sep">•</span> {movieGenres.join(", ")}
                  <span className="sep">•</span> {movie.badge}
                </div>

                <p className="md-desc">{movie.description}</p>

                <div className="md-tags">
                  {ticketTags.map((t) => <button key={t} className="tag ghost">{t}</button>)}
                </div>

                <div className="md-section-title">Select Date</div>
                <div className="date-row">
                  {dateOptions.map((d) => (
                    <button
                      key={d.key}
                      className={`date-pill ${selectedDate === d.key ? "selected" : ""}`}
                      onClick={() => setSelectedDate(d.key)}
                    >
                      <span className="top">{d.labelTop}</span>
                      <span className="bottom">{d.labelBottom}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="md-theatres">
            <h3 className="md-subheading">Available Theatres & Showtimes</h3>
            <p className="md-hint">Choose a theatre and time slot. Then tap Book Tickets.</p>

            {loadingTheatres ? (
              <p>Loading theatres…</p>
            ) : theatres.length === 0 ? (
              <p>No shows available on this date.</p>
            ) : (
              <div className="theatre-list">
                {theatres.map((t) => (
                  <div key={t.theatre_id} className="theatre-card">
                    <div className="th-left">
                      <div className="th-name">{t.name}</div>
                      <div className="th-addr">{t.address} • {t.city}</div>
                    </div>

                    <div className="th-times">
                      {t.showtimes.map((st) =>
                        st.start_time.map((slot) => (
                          <button
                            key={`${t.theatre_id}-${st.showtime_id}-${slot}`}
                            className={`slot ${selectedShow === slot ? "active" : ""}`}
                            onClick={() => setSelectedShow(slot)}
                          >
                            {slot}
                          </button>
                        ))
                      )}
                    </div>

                    <div className="th-actions">
                      <button className="btn ghost">F&B</button>
                      <button className="btn ghost">Parking</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>


          <footer className="md-footer">
            <button
              className="btn cta"
              onClick={handleBookTickets}
              disabled={!selectedShow}
            >
              Book Tickets →
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
