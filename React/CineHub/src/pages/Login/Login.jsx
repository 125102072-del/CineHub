import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) ? "" : "Invalid email format";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    return password.length >= 6 ? "" : "Password must be at least 6 characters";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setErrors({ email: "", password: "" });
    setIsSubmitting(true);

    setTimeout(() => {
      setSuccess(true);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {!success ? (
          <>
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email Address</label>
                  <span className="focus-border"></span>
                </div>
                {errors.email && <span className="error-message show">{errors.email}</span>}
              </div>

              <div className="form-group">
                <div className="input-wrapper password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <span className={`eye-icon ${showPassword ? "show-password" : ""}`}></span>
                  </button>
                  <span className="focus-border"></span>
                </div>
                {errors.password && <span className="error-message show">{errors.password}</span>}
              </div>


              <button type="submit" className={`login-btn btn ${isSubmitting ? "loading" : ""}`}>
                <span className="btn-text">{isSubmitting ? "Signing In..." : "Sign In"}</span>
                {isSubmitting && <span className="btn-loader"></span>}
              </button>


              <div className="signup-link">
                <p>
                  Don’t have an account? <a href="#">Sign up</a>
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="success-message show">
            <div className="success-icon">✓</div>
            <h3>Login Successful!</h3>
            <p>Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
