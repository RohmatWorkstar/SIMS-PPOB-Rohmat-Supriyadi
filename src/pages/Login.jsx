import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope } from "react-icons/fa";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email tidak boleh kosong.";
        if (!formData.password) newErrors.password = "Password tidak boleh kosong.";
        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await API.post("/login", formData);
            const { data } = response.data;
            const { token, user } = data;

            // Simpan token di Redux dan localStorage
            dispatch(loginSuccess({ user, token }));
            localStorage.setItem("token", token);

            // Redirect ke dashboard
            navigate("/dashboard");
        } catch (error) {
            // Tangani error jika token undefined atau masalah API lainnya
            const errorMessage = error.response?.data?.message || "Login gagal!";
            setErrors({ general: errorMessage });
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Section: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center flex justify-center gap-2">
                        <img src={"/assets/Logo.png"} alt="Logo" className="h-8" /> SIMS PPOB
                    </h1>
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Masuk Atau Buat Akun <br/> Untuk memulai</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-9 py-2 border border-gray-300 rounded-lg focus:outline-none" placeholder="Masukan Email Anda" />
                                <FaEnvelope className="absolute left-3 top-3 text-gray-300" />
                            </div>

                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle between text and password
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-9 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                    placeholder="Masukan Password Anda"
                                />
                                <FaUser className="absolute left-3 top-3 text-gray-300" />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle the icon */}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}
                        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                            Masuk
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Belum punya akun? Register </span>
                        <Link to="/register" className="text-red-500 hover:underline">
                            di sini
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Section: Image */}
            <div className="w-full lg:w-1/2 h-screen hidden lg:block">
                <img src={"/assets/Illustrasi Login.png"} alt="Illustration" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default Login;
