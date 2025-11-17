import "./registerpage.css";
import { Link } from "react-router-dom";

export default function Register() {
    function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        console.log("signup data:", data);
    }

    return (
        <div className="page-wrapper">
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Create your account</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <span>First name</span>
                            <input name="firstName" type="text" placeholder="Jane" required />
                        </div>

                        <div className="field">
                            <span>Last name</span>
                            <input name="lastName" type="text" placeholder="Doe" required />
                        </div>

                        <div className="field">
                            <span>Age</span>
                            <input name="age" type="number" min="0" placeholder="18" required />
                        </div>

                        <div className="field">
                            <span>Email</span>
                            <input name="email" type="email" placeholder="you@example.com" required />
                        </div>

                        <div className="field">
                            <span>Password</span>
                            <input name="password" type="password" placeholder="••••••••" required />
                        </div>

                        <button className="login-btn" type="submit">
                            Create account
                        </button>

                        <div className="minor">
                            <span>Already have an account?</span>
                            <Link to="/login">Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
