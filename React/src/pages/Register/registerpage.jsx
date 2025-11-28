import "./registerpage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/cinehub-logo.png";

export default function Register() {

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState(""); 
    const [errMessage, setErrMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

    const body = {
            userId: {
                email: email,
                phone_number: phoneNumber,
                age: age
            },
            username: username,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();
            console.log("Server response:", result);

            if (!response.ok) {
                setErrMessage(result.message || "Registration not successfull");
                return;
            }

            setMessage("Account created successfully !! Click on Sign in now");

        } catch (error) {
            setErrMessage("Account with same email already exist");

        }

        setUsername("");
        setPhoneNumber("");
        setAge("");
        setEmail("");
        setPassword("");

       
/*
        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        console.log("signup data:", data);
*/
    
    }



    return (
        <div className="page-wrapper">
            <div className="login-container">
                <div className="login-card">
                    <img src={logo} alt="CINEHUB Logo" className="logo-img" />

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <span>Username</span>
                            <input 
                            name="firstName" 
                            type="text" 
                            placeholder="Ex: Jane Doe" 
                             value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                            />
                        </div>

                        <div className="field">
                            <span>PhoneNumber</span>
                            <input 
                            name="Phone Number" 
                            type="number" 
                            placeholder="Ex: +353765645367" 
                           value = {phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required 
                            />
                        </div>

                        <div className="field">
                            <span>Age</span>
                            <input 
                            name="age" 
                            type="number" 
                            min="0" 
                            placeholder="Ex: 18" 
                           value = {age}
                            onChange={(e) => setAge(e.target.value)}
                            required 
                            />
                        </div>

                        <div className="field">
                            <span>Email</span>
                            <input 
                            name="email" 
                            type="email" 
                            placeholder="Ex: you@example.com" 
                           value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            />
                        </div>

                        <div className="field">
                            <span>Password</span>
                            <input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                          value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            />
                        </div>

                        {message && (
                            <div className="msg success">{message}</div>
                        )}

                        {errMessage &&(
                            <div className="msg error">{errMessage}</div>
                        )}

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
