import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className=" text-black mb-5 lg:w-full px-28 mt-5">
            <div className="flex justify-between items-center px-4 py-2">
                <div className="text-lg font-semibold flex gap-3 text-black">
                    <Link className="flex gap-2" to={"/"}>
                        {" "}
                        <img src={"/src/assets/Logo.png"} /> SIMS PPOB
                    </Link>
                </div>

                <button className="lg:hidden block text-white focus:outline-none" onClick={toggleMenu}>
                    <span className="material-icons">menu</span>
                </button>

                <div className="hidden lg:flex items-center space-x-4">
                    <NavLink to="/topup">
                        <button className="hover:text-red-500">Topup</button>
                    </NavLink>
                    <NavLink to="/transaction-history">
                        <button className="hover:text-red-500">Transaction</button>
                    </NavLink>
                    <NavLink to="/akun" className="w-full">
                        <button className="w-full">Akun</button>
                    </NavLink>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden flex flex-col items-start space-y-2 px-4 py-2 bg-gray-700">
                    <NavLink to="/topup" className="w-full">
                        <button className="w-full bg-blue-500 hover:bg-blue-600">Topup</button>
                    </NavLink>
                    <NavLink to="/transaction-history" className="w-full">
                        <button className="w-full bg-green-500 hover:bg-green-600">Transaction</button>
                    </NavLink>
                    <NavLink to="/akun" className="w-full">
                        <button className="w-full bg-gray-700 hover:bg-gray-800">Akun</button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Navbar;
