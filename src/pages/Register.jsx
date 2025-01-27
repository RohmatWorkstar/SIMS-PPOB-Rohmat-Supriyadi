import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
    // tampung nilai kedalam usestate
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!formData.email) {
            newErrors.email = "Email tidak boleh kosong.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email tidak valid.";
        }

        if (!formData.first_name) newErrors.first_name = "Nama depan tidak boleh kosong.";
        if (!formData.last_name) newErrors.last_name = "Nama belakang tidak boleh kosong.";
        if (!formData.password) newErrors.password = "Password tidak boleh kosong.";
        else if (formData.password.length < 8) newErrors.password = "Password harus memiliki minimal 8 karakter.";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Password dan konfirmasi password tidak cocok.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await API.post("/registration", {
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                password: formData.password,
            });

            if (response.status === 200) {
                setAlert({ message: response.data.message || "Registrasi berhasil!", type: "success" });
                setTimeout(() => navigate("/"), 1500);
            } else {
                setAlert({ message: response.data.message || "Registrasi gagal.", type: "error" });
            }
        } catch (error) {
            console.error(error);
            setAlert({ message: error.response?.data?.message || "Terjadi kesalahan.", type: "error" });
        }
    };

    const renderInputField = (id, type, placeholder, icon, value) => (
        <div>
            <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
                {placeholder}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                {icon}
                <input type={type} id={id} value={value} onChange={handleChange} className="w-full focus:outline-none" placeholder={placeholder} />
            </div>
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
        </div>
    );

    const renderPasswordToggle = (showPasswordState, setShowPasswordState) => (
        <button type="button" onClick={() => setShowPasswordState(!showPasswordState)} className="ml-2">
            {showPasswordState ? <FaEyeSlash className="text-gray-300" /> : <FaEye className="text-gray-300" />}
        </button>
    );

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center flex justify-center gap-2">
                        <img src={"/assets/Logo.png"} alt="Logo" className="h-8" /> SIMS PPOB
                    </h1>
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Lengkapi Data Untuk <br /> Membuat Akun
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {renderInputField("email", "email", "Masukan Email Anda", <FaEnvelope className="text-gray-300 mr-2" />, formData.email)}
                        {renderInputField("first_name", "text", "Nama Depan", <FaUser className="text-gray-300 mr-2" />, formData.first_name)}
                        {renderInputField("last_name", "text", "Nama Belakang", <FaUser className="text-gray-300 mr-2" />, formData.last_name)}

                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                Buat Password
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                <FaLock className="text-gray-300 mr-2" />
                                <input type={showPassword ? "text" : "password"} id="password" value={formData.password} onChange={handleChange} className="w-full focus:outline-none" placeholder="Buat password" />
                                {renderPasswordToggle(showPassword, setShowPassword)}
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                                Konfirmasi Password
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                <FaLock className="text-gray-300 mr-2" />
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full focus:outline-none" placeholder="Konfirmasi password" />
                                {renderPasswordToggle(showConfirmPassword, setShowConfirmPassword)}
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                            Register
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Sudah punya akun? Login </span>
                        <Link to="/" className="text-red-500 hover:underline">
                            di sini
                        </Link>
                    </div>

                    {alert && (
                        <div className={`mt-4 p-4 rounded-lg flex items-center ${alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            <span className="mr-2">{alert.message}</span>
                            <button onClick={() => setAlert(null)} className="ml-2 text-xl text-gray-300 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-1/2 h-screen hidden lg:block">
                <img src={"/assets/Illustrasi Login.png"} alt="Illustration" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default Register;
