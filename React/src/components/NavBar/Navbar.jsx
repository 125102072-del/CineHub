import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/cinehub-logo.png";
import "./NavBar.css"


export default function Navbar({
    query,
    onQueryChange,
    locationText,
    onLocationChange,
    onLocationEnter,
    onLogoClick,
    user,
}) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userBtnRef = useRef(null);
    const userMenuRef = useRef(null);

    useEffect(() => {
        function onDocClick(e) {
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
        function onKey(e) {
            if (e.key === "Escape") setUserMenuOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [userMenuOpen]);

    return (
        <header className="topbar">
            <button
                type="button"
                className="brand clicky"
                onClick={onLogoClick}
                title="Go home"
            >
                <img src={logo} alt="CINEHUB Logo" className="logo-img" />
            </button>

            <div className="location-pill">
                <input
                    className="location-input"
                    placeholder="Type a place…"
                    value={locationText}
                    onChange={(e) => onLocationChange?.(e.target.value)}
                    onKeyDown={onLocationEnter}
                />
            </div>

            <div className="search-wrap">
                <input
                    className="search-input"
                    placeholder="Search movies"
                    value={query}
                    onChange={(e) => onQueryChange?.(e.target.value)}
                />
                <button type="button" className="btn primary">
                    Explore
                </button>
            </div>

            <div className="user-wrap">
                <button type="button" className="link">
                    Logout
                </button>

                <button
                    type="button"
                    ref={userBtnRef}
                    className="avatar-btn"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen((v) => !v)}
                    title="Account menu"
                >
                    <img
                        src={user.photo}
                        alt={user.name}
                        className="avatar-img"
                        draggable="false"
                    />
                </button>

                {userMenuOpen && (
                    <div
                        ref={userMenuRef}
                        className="user-menu"
                        role="menu"
                        aria-label="Account"
                    >
                        <div className="user-menu__header">
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="avatar avatar--sm"
                            />
                            <div>
                                <div className="um-name">{user.name}</div>
                                <div className="um-email">{user.email}</div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="menu-item"
                            role="menuitem"
                            onClick={() => (window.location.href = "/order-history")}
                        >
                            Order history
                        </button>
                        <button type="button" className="menu-item" role="menuitem">
                            Account settings
                        </button>
                        <div className="menu-sep" />
                        <button
                            type="button"
                            className="menu-item danger"
                            role="menuitem"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
