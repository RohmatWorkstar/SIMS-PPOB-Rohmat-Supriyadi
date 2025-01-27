import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import API from "../services/api";
import defaultProfilePic from "../assets/Profile Photo.png";
import { FaEnvelope, FaUser, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Akun = () => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        profile_picture: defaultProfilePic,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await API.get("/profile");
                if (response.status === 200) {
                    const { first_name, last_name, email, profile_picture } = response.data.data;
                    setProfile({
                        first_name,
                        last_name,
                        email,
                        profile_picture: profile_picture || defaultProfilePic,
                    });
                } else {
                    console.error("Unexpected response:", response);
                }
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Konfirmasi Logout",
            text: "Apakah Anda yakin ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Logout",
            cancelButtonText: "Batal",
            customClass: {
                confirmButton: "bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md",
                cancelButton: "bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded-md",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                localStorage.removeItem("token");
                navigate("/");
            }
        });
    };

    const handleProfile_pictureChange = async (e) => {
        const file = e.target.files[0];

        if (file && file.size <= 100 * 1024) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await API.put("/profile/image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.status === 0) {
                    setProfile((prev) => ({ ...prev, profile_picture: response.data.data.profile_image }));
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Foto profil berhasil diperbarui.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        title: "Gagal",
                        text: "Gagal memperbarui foto profil.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Failed to update profile picture", error);
                Swal.fire({
                    title: "Gagal",
                    text: "Terjadi kesalahan saat memperbarui foto profil.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } else {
            Swal.fire({
                title: "Gagal",
                text: "Ukuran file tidak boleh melebihi 100 KB.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const updatedProfile = {
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email,
        };

        try {
            const response = await API.put("/profile/update", updatedProfile, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Profil berhasil diperbarui.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                console.error("Unexpected response status:", response.status);
                Swal.fire({
                    title: "Gagal",
                    text: "Terjadi kesalahan saat memperbarui profil.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Failed to update profile", error.response || error);
            Swal.fire({
                title: "Gagal",
                text: "Terjadi kesalahan saat memperbarui profil.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-6">
                <input type="file" accept="image/*" onChange={handleProfile_pictureChange} className="hidden" id="profile-picture-input" />
                <label htmlFor="profile-picture-input">
                    <img src={profile.profile_picture !== null ? profile.profile_picture : defaultProfilePic} alt="User Avatar" className="w-24 h-24 rounded-full mb-4 cursor-pointer" />
                </label>
                <h1 className="text-xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
            </div>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
                        <FaEnvelope />
                    </span>
                    <input
                        type="email"
                        id="email"
                        className="w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                </div>
                <div className="relative">
                    <span className="absolute   left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
                        <FaUser />
                    </span>
                    <input
                        type="text"
                        id="first_name"
                        className="w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2"
                        value={profile.first_name}
                        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    />
                </div>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
                        <FaUserAlt />
                    </span>
                    <input
                        type="text"
                        id="last_name"
                        className="w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2"
                        value={profile.last_name}
                        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600">
                    Simpan
                </button>
                <button type="button" onClick={handleLogout} className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600">
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Akun;
