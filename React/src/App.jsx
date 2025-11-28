import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/loginpage.jsx";
import Register from "./pages/Register/registerpage.jsx";
import Home from "./pages/Home/homepage.jsx";
import OrdersPage from "./pages/Orders/orderspage.jsx";
import MovieDetailPage from "./pages/Movie_Detail/movies_detail_page.jsx";
import OrderHistoryPage from "./pages/Order_History/order_history_page.jsx";
import SeatSelection from "./pages/Seat_Selection/seat_selection_page.jsx";
import OrderSummary from "./pages/OrderSummary/order_summary_page.jsx";
import OrderConfirmation from "./pages/OrderConfirmation/order_confirmation_page.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>} />
      <Route path="/orders" element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
       } />
      <Route path="/movie/:id" element={
        <ProtectedRoute>
          <MovieDetailPage />
        </ProtectedRoute>
        } />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/movie/:movieId/seats" element={
        <ProtectedRoute>
          <SeatSelection />
        </ProtectedRoute>} />
      <Route path="/order-summary" element={
          <ProtectedRoute>
            <OrderSummary />
          </ProtectedRoute>
        }
      />
      <Route path="/order-confirmation" element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
