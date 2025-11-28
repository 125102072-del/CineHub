import React, { useState, useRef, useEffect } from "react";
import "./topBar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/cinehub-logo.png";

export default function Topbar({ showUser = true, showBack = false }) {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Aarav Patel",
    email: "aarav.patel@example.com",
    photo: "https://i.pravatar.cc/150?img=12",
  });

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userBtnRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClose(e) {
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
    function handleEsc(e) {
      if (e.key === "Escape") setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClose);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClose);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [userMenuOpen]);

  function handleLogout() {
    localStorage.removeItem("token");
  
    navigate("/login", { replace: true });
  
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      navigate("/login", { replace: true });
    });
  }

  return (
    <header className="topbar">
        <div className="left-group">
        {showBack && (
            <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
            ‹
            </button>
        )}
        <button
            className="brand clicky"
            onClick={() => navigate("/home")}
            title="Go home"
        >
            <img src={logo} alt="CINEHUB Logo" className="logo-img" />
        </button>
        </div>

        {showUser && (
        <div className="user-wrap">
            <button className="link" onClick={handleLogout}>
            Logout
            </button>
            <button
            ref={userBtnRef}
            className="avatar-btn"
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
            onClick={() => setUserMenuOpen(v => !v)}
            title="Account menu"
            >
            <img src={user.photo} alt={user.name} className="avatar-img" draggable="false" />
            </button>
        </div>
        )}

    </header>
  );
}
