import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/loginpage.jsx";
import Register from "./pages/Register/registerpage.jsx";
import Home from "./pages/Home/homepage.jsx";
import OrdersPage from "./pages/Orders/orderspage.jsx";
import MovieDetailPage from "./pages/Movie_Detail/movies_detail_page.jsx";
import OrderHistoryPage from "./pages/Order_History/order_history_page.jsx";
import SeatSelection from "./pages/Seat_Selection/seat_selection_page.jsx";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/order-history" element={<OrderHistoryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/movie/:movieId/seats" element={<SeatSelection />} />

    </Routes>
  );
}
