import "./loginpage.css";
import { Link } from "react-router-dom";

export default function Login() {
    function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <div className="page-wrapper">
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Login to CineHub</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="field">
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button className="login-btn" type="submit">
                            Sign in
                        </button>

                        <div className="minor">
                            <span>Not already registered?</span>
                            <Link to="/register">Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
