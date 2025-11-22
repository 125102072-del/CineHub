import React, { useEffect, useMemo, useRef, useState } from "react";
import "./seat_selection_page.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { movies } from "../../data/movies";
import Topbar from "../../components/TopBar/Topbar";


const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const SEATS_PER_ROW = 11;
const PRICE_PER_TICKET = 12.0;

const BLOCKED_SEATS = new Set([
    "D7",
    "D8",
    "C7",
    "C8",
    "E7",
    "E8",
    "F6",
    "F7",
]);

const TIME_SLOTS = ["14:15", "17:20", "20:05", "22:10"];

const DATE_OPTIONS = [
    { id: 0, label: "Tue, Oct 7" },
    { id: 1, label: "Wed, Oct 8" },
    { id: 2, label: "Thu, Oct 9" },
];

export default function SeatSelection() {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const location = useLocation();

    const [user] = useState({
        name: "Aarav Patel",
        email: "aarav.patel@example.com",
        photo: "https://i.pravatar.cc/150?img=12",
    });

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userBtnRef = useRef(null);
    const userMenuRef = useRef(null);

    const passed = location.state ?? {};
    const [activeTime, setActiveTime] = useState(passed.showtime || "20:05");
    const [activeDateId, setActiveDateId] = useState(
        typeof passed.dateId === "number" ? passed.dateId : 1
    );

    const [selectedSeats, setSelectedSeats] = useState([]);

    const movie = useMemo(() => {
        return movies.find((m) => String(m.id) === String(movieId)) || movies[0];
    }, [movieId]);

    const activeDate = DATE_OPTIONS.find((d) => d.id === activeDateId);

    const totalPrice = useMemo(
        () => selectedSeats.length * PRICE_PER_TICKET,
        [selectedSeats]
    );

    useEffect(() => {
        function handleClick(e) {
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

        function handleKey(e) {
            if (e.key === "Escape") setUserMenuOpen(false);
        }

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [userMenuOpen]);

    function handleLogoClick() {
        navigate("/");
    }

    function handleLogout() {
        navigate("/login");
    }

    function toggleSeat(seatId) {
        if (BLOCKED_SEATS.has(seatId)) return;

        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    }

    function handleProceed() {
        if (!selectedSeats.length) return;

        navigate("/order-summary", {
            state: {
                movieId: movie.id,
                showtime: activeTime,
                dateLabel: activeDate?.label || "",
                seats: selectedSeats,
                pricePerTicket: PRICE_PER_TICKET,
                total: totalPrice,
                cinemaName: "CineHub Dublin Central",
            },
        });
    }

    return (
        <div className="seat-root">
            <Topbar showUser={true} showBack={true} />

            <div className="seat-page">
                <main className="seat-layout">
                    <section className="seat-map-card">
                        <div className="screen-bar">    </div>
                        <div className="seat-grid">
                            <div className="seat-cell seat-cell--empty" />
                            {Array.from({ length: SEATS_PER_ROW }, (_, idx) => (
                                <div key={`col-${idx + 1}`} className="seat-col-label">
                                    {idx + 1}
                                </div>
                            ))}

                            {ROWS.map((row) => (
                                <React.Fragment key={row}>
                                    <div className="seat-row-label">{row}</div>
                                    {Array.from({ length: SEATS_PER_ROW }, (_, idx) => {
                                        const seatId = `${row}${idx + 1}`;
                                        const isBlocked = BLOCKED_SEATS.has(seatId);
                                        const isSelected = selectedSeats.includes(seatId);
                                        let cls = "seat";
                                        if (isBlocked) cls += " seat--blocked";
                                        if (isSelected) cls += " seat--selected";

                                        return (
                                            <button
                                                key={seatId}
                                                className={cls}
                                                onClick={() => toggleSeat(seatId)}
                                                disabled={isBlocked}
                                                type="button"
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="seat-legend">
                            <div className="seat-legend-item">
                                <span className="legend-box legend-box--available" /> Available
                            </div>
                            <div className="seat-legend-item">
                                <span className="legend-box legend-box--selected" /> Selected
                            </div>
                            <div className="seat-legend-item">
                                <span className="legend-box legend-box--blocked" /> Unavailable
                            </div>
                        </div>
                    </section>

                    <aside className="order-card">
                        <h2 className="order-title">Order Summary</h2>

                        <div className="order-row">
                            <span className="order-label">Movie:</span>
                            <span className="order-value">{movie.title}</span>
                        </div>

                        <div className="order-row">
                            <span className="order-label">Showtime:</span>
                            <span className="order-value">
                                {activeDate?.label || "Wed, Oct 8"} • {activeTime}
                            </span>
                        </div>

                        <div className="order-row">
                            <span className="order-label">Seats:</span>
                            <span className="order-value">
                                {selectedSeats.length
                                    ? selectedSeats.join(", ")
                                    : "No seats selected"}
                            </span>
                        </div>

                        <div className="order-row">
                            <span className="order-label">Tickets:</span>
                            <span className="order-value">
                                {selectedSeats.length} × €{PRICE_PER_TICKET.toFixed(2)}
                            </span>
                        </div>

                        <div className="order-total-row">
                            <span className="order-label">Total:</span>
                            <span className="order-total">€{totalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            className="btn primary order-proceed-btn"
                            onClick={handleProceed}
                            disabled={!selectedSeats.length}
                        >
                            Proceed
                        </button>
                    </aside>
                </main>
            </div>
        </div>
    );
}
