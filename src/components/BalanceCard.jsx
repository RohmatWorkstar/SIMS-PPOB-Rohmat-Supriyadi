import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BalanceCard = ({ balance, showBalance, toggleBalanceVisibility }) => {
    // console.log(balance);
    return (
        <div className="bg-red-500 flex flex-col justify-center items-start gap-4 text-white py-2 px-4 rounded-md lg:w-1/2 p-4">
            <p>Saldo anda:</p>
            <h1 className="text-4xl">{showBalance ? `RP.${balance}` : "RP.••••••••"}</h1>
            <div className="flex gap-2">
                <p>Lihat Saldo</p>
                <button onClick={toggleBalanceVisibility} className="text-white">
                    {showBalance ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </button>
            </div>
        </div>
    );
};

export default BalanceCard;
