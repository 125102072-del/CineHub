export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <strong style={{ fontSize: 20 }}>CineHub</strong>

                <div className="pill">
                    <span>📍</span>
                    <span>Location: Dublin Central</span>
                </div>

                <div className="nav-spacer" />

                <div className="nav-links">
                    <a href="#">Movies</a>
                    <a href="#">Login</a>
                    <a href="#">Admin</a>
                </div>
            </div>
        </nav>
    );
}
