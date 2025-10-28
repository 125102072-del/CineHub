import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/loginpage.jsx";
import Register from "./pages/Register/registerpage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
