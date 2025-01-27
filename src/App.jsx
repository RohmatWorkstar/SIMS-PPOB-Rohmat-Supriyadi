import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Topup from "./pages/Topup";
import Akun from "./pages/Akun";
import { loginSuccess, logout } from "./store/authSlice";
import TransactionHistory from "./pages/TransactionHistory";
import Navbar from "./components/Navbar";
import ServiceDetail from "./pages/ServiceDetail";

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            // Check if token is expired
            const decodedToken = JSON.parse(atob(savedToken.split(".")[1])); // Decode JWT token
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            if (currentTime > expirationTime) {
                dispatch(logout()); // Log out if token is expired
                localStorage.removeItem("token"); // Remove expired token from localStorage
            } else {
                dispatch(loginSuccess({ token: savedToken })); // Login if token is valid
            }
        }
    }, [dispatch]);

    return (
        <Router>
            {isLoggedIn && <Navbar />} {/* Tampilkan navbar jika user login */}
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/service/:service_code" element={isLoggedIn ? <ServiceDetail /> : <Navigate to="/" />} />} />
                <Route path="/topup" element={isLoggedIn ? <Topup /> : <Navigate to="/" />} />
                <Route path="/akun" element={isLoggedIn ? <Akun /> : <Navigate to="/" />} />
                <Route path="/transaction-history" element={isLoggedIn ? <TransactionHistory /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
