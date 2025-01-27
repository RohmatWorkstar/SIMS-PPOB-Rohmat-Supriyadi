import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import ProfileCard from "../components/ProfileCard";
import BalanceCard from "../components/BalanceCard";
import ServicesSlider from "../components/ServicesSlider";
import BannersSlider from "../components/BannersSlider";
import { setServices } from "../store/servicesSlice";
import { setBanners } from "../store/bannersSlice";
import { setBalance } from "../store/balanceSlice";
import { setProfile } from "../store/profileSlice";
import { toggleShowBalance } from "../store/showBalanceSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { services, banners, balance, profile, showBalance } = useSelector((state) => state);

    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };

                const [responseServices, responseBanners, responseBalance, responseProfile] = await Promise.all([API.get("/services", config), API.get("/banner"), API.get("/balance", config), API.get("/profile", config)]);

                if (responseServices.data.status === 0) {
                    dispatch(setServices(responseServices.data.data));
                }
                if (responseBanners.data.status === 0) {
                    dispatch(setBanners(responseBanners.data.data));
                }

                if (responseBalance.data.status === 0) {
                    dispatch(setBalance(responseBalance.data.data.balance)); 
                }
                dispatch(setProfile(responseProfile.data.data || { name: "Pengguna" }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token, dispatch]);

    const toggleBalanceVisibility = () => {
        dispatch(toggleShowBalance());
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen overflow-y-auto">
            <div className="flex flex-wrap justify-between mb-6">
                <ProfileCard profile={profile} />
                <BalanceCard balance={balance} showBalance={showBalance} toggleBalanceVisibility={toggleBalanceVisibility} />
            </div>
            <ServicesSlider services={services} />
            <h2 className="text-xl font-bold mb-4 mt-8">Temukan Promo Menarik</h2>
            <BannersSlider banners={banners} />
        </div>
    );
};

export default Dashboard;
