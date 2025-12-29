import React from 'react'
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

// Adicione MdMenu e MdClose aos imports do 'react-icons/md'
import {MdMenu, MdClose } from "react-icons/md";
// No 'react', adicione o useState para o menu mobile

import Home from '../pages/Home';
import Products from '../pages/Products';
import Movements from '../pages/Movements';
import Reports from '../pages/Reports';

const Header = () => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <>
            <header className="w-full bg-gradient-to-r from-[#1f2329] to-[#2b3036] shadow-md border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* logo */}
                    <div className='flex items-center gap-0 text-xl font-bold'>
                        <div className='flex items-center gap-0 text-3xl font-bold -mr-0'>
                            <MdOutlineDoubleArrow className='text-[#35B6E6] text-4xl font-extrabold ' />
                        </div>
                        <span className="text-white font-extrabold text-2xl">STOCK</span>
                        <span className="text-[#35B6E6] font-extrabold text-2xl">FLOW</span>
                    </div>
                    <div className="flex items-center gap-10">
                        {/* menu */}
                        <nav className='hidden md:flex items-center gap-8 text-sm text-gray-300 list-none'>
                            <ul className='flex items-center gap-8 text-sm text-gray-300'>
                                <li><a href="Home" className="flex items-center gap-2 hover:text-white transition"><FaRegStar />Dashboard</a></li>
                                <li><a href="Products" className="flex items-center gap-2 hover:text-white transition"><BsBoxSeam />Produtos</a></li>
                                <li><a href="Movements" className="flex items-center gap-2 hover:text-white transition"><FaExchangeAlt />Movimentações</a></li>
                                <li><a href="Reports" className="flex items-center gap-2 hover:text-white transition"><FaChartBar />Relatórios</a></li>
                            </ul>
                        </nav>
                        {/* user */}

                        <div className="relative flex items-center" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                            >
                                <FaUserCircle size={28} />
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-[#1f2329] border border-gray-700 shadow-lg">
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-gray-700">
                                        <p className="text-sm font-semibold text-white">Alan Matheus</p>
                                        <p className="text-xs text-gray-400">alan@email.com</p>
                                    </div>

                                    {/* Logout */}
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-[#2b3036] transition"
                                    >
                                        <FiLogOut />
                                        Sair da conta
                                    </button>
                                </div>
                            )}
                              {/* Botão Hambúrguer - Visível apenas em mobile */}
                                    <button
                                        className="md:hidden text-gray-300 text-3xl ml-4"
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    >
                                        {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
                                    </button>
                        </div>
                    </div>
                </div>
                {/* Menu Mobile Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[#1f2329] border-t border-gray-700 px-6 py-4 absolute w-full left-0 shadow-xl z-50">
                        <nav>
                            <ul className='flex flex-col gap-4 text-gray-300'>
                                <li><a href="Home" className="flex items-center gap-3 py-2 border-b border-gray-800"><FaRegStar />Dashboard</a></li>
                                <li><a href="Products" className="flex items-center gap-3 py-2 border-b border-gray-800"><BsBoxSeam />Produtos</a></li>
                                <li><a href="Movements" className="flex items-center gap-3 py-2 border-b border-gray-800"><FaExchangeAlt />Movimentações</a></li>
                                <li><a href="Reports" className="flex items-center gap-3 py-2 border-b border-gray-800"><FaChartBar />Relatórios</a></li>
                            </ul>
                        </nav>
                    </div>
                )}
            </header>
        </>
    )
}

export default Header