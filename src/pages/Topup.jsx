import { useState } from "react";
import API from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import BalanceCard from "../components/BalanceCard";
import { setBalance } from "../store/balanceSlice";
import { toggleShowBalance } from "../store/showBalanceSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function TopUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, balance, showBalance } = useSelector((state) => state);
    const [topUpAmount, setTopUpAmount] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token") || "";

    const MIN_AMOUNT = 10000;
    const MAX_AMOUNT = 1000000;

    const handleTopUp = async () => {
        if (topUpAmount <= 0) {
            setError("Nominal top up harus diisi.");
            return;
        }

        if (topUpAmount < MIN_AMOUNT || topUpAmount > MAX_AMOUNT) {
            setError(`Nominal top up harus antara Rp${MIN_AMOUNT.toLocaleString()} dan Rp${MAX_AMOUNT.toLocaleString()}.`);
            return;
        }

        setError("");
        setLoading(true);

        try {
            // Make an API request to top up
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await API.post("/topup", { top_up_amount: topUpAmount }, config);

            // Show success modal using SweetAlert
            Swal.fire({
                title: "Berhasil!",
                text: `Top-up sebesar Rp${topUpAmount.toLocaleString()} berhasil!`,
                icon: "success",
                confirmButtonText: "Kembali ke Beranda",
                customClass: {
                    confirmButton: "text-red-500 bg-transparent",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });

            // Dispatch the new balance to Redux
            dispatch(setBalance(balance + topUpAmount));
            setTopUpAmount(0); // Reset the top-up amount
        } catch (error) {
            // Show error modal using SweetAlert
            Swal.fire({
                title: "Gagal!",
                text: "Gagal melakukan top up atau server sedang bermasalah.",
                icon: "error",
                confirmButtonText: "Kembali ke Beranda",
                customClass: {
                    confirmButton: "text-red-500 bg-transparent",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleQuickSelect = (amount) => {
        setTopUpAmount(amount);
        setError("");
    };

    const toggleBalanceVisibility = () => {
        dispatch(toggleShowBalance());
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen overflow-y-auto">
            <div className="flex flex-wrap justify-between mb-6">
                <ProfileCard profile={profile} />
                <BalanceCard balance={balance} showBalance={showBalance} toggleBalanceVisibility={toggleBalanceVisibility} />
            </div>
            <div className="w-full max-w-md mb-6">
                <h4 className="text-lg font-bold mb-2">Silahkan masukan</h4>
                <h5 className="text-4xl font-bold">Nominal Top Up</h5>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <div className="w-full mb-4">
                        <input
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring focus:border-red-500"
                            placeholder="10.000"
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(Number(e.target.value))}
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    <button
                        className={`w-full text-lg font-semibold py-3 rounded-lg focus:ring focus:ring-red-300 ${
                            loading || topUpAmount <= 0 || topUpAmount < MIN_AMOUNT || topUpAmount > MAX_AMOUNT ? "bg-gray-300 cursor-not-allowed text-white" : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        onClick={handleTopUp}
                        disabled={loading || topUpAmount <= 0 || topUpAmount < MIN_AMOUNT || topUpAmount > MAX_AMOUNT}
                    >
                        {loading ? "Loading..." : "Top Up"}
                    </button>
                </div>

                <div className="col-span-4 grid grid-cols-3 gap-4 w-full max-w-md mb-6">
                    {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                        <button key={amount} className="bg-gray-100 text-black border border-gray-300 rounded-lg py-4 text-sm hover:bg-red-500 hover:text-white focus:ring focus:border-red-500" onClick={() => handleQuickSelect(amount)}>
                            Rp{amount.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopUp;
