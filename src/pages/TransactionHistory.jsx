import React, { useState, useEffect } from "react";
import API from "../services/api";
import ProfileCard from "../components/ProfileCard";
import BalanceCard from "../components/BalanceCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowBalance } from "../store/showBalanceSlice";

function TransactionHistory() {
    const [history, setHistory] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    let limit = 5;
    const dispatch = useDispatch();
    const { balance, profile, showBalance } = useSelector((state) => state);

    const fetchHistory = async (offsetValue) => {
        try {
            const response = await API.get(`/transaction/history?offset=${offsetValue}&limit=${limit}`);
            const newRecords = response.data.data.records;

            setHistory((prevHistory) => [...prevHistory, ...newRecords]);
            setHasMore(newRecords.length === limit);
        } catch (error) {
            console.log("Gagal memuat riwayat transaksi!");
        }
    };

    useEffect(() => {
        fetchHistory(0);
    }, []);

    const handleShowMore = () => {
        const newOffset = offset + limit;
        setOffset(newOffset);
        fetchHistory(newOffset);
    };

    const toggleBalanceVisibility = () => {
        dispatch(toggleShowBalance());
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return (
            date.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Asia/Jakarta",
                hour12: false,
            }) + " WIB"
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen overflow-y-auto">
            <div className="flex flex-wrap justify-between mb-6">
                <ProfileCard profile={profile} />
                <BalanceCard balance={balance} showBalance={showBalance} toggleBalanceVisibility={toggleBalanceVisibility} />
            </div>
            {history.length > 0 ? (
                <>
                    <ul>
                        {history.map((transaction, index) => (
                            <div className="w-full border border-gray-300 rounded-md px-6 py-4 mb-5" key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl text-green-500 font-bold mb-2"> +Rp.{transaction.total_amount}</h1>
                                        <p>{formatDate(transaction.created_on)}</p>
                                    </div>
                                    <div>
                                        <h1>{transaction.transaction_type}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                    {hasMore && (
                        <div className="flex justify-center mt-4">
                            <button onClick={handleShowMore} className="p-2 text-red-500 font-bold">
                                Show More
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h1 className="text-2xl text-center font-bold mt-10">Belum Ada Transaksi</h1>
                </>
            )}
        </div>
    );
}

export default TransactionHistory;
