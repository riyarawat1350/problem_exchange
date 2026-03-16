import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, PlusCircle, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-white/20">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-primary-600 p-2.5 rounded-2xl shadow-lg shadow-primary-200 group-hover:rotate-12 transition-transform duration-300">
                            <MessageSquare className="text-white w-7 h-7" />
                        </div>
                        <span className="font-black text-2xl tracking-tight text-slate-800">
                            Problem<span className="text-primary-600">Exchange</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-slate-500 hover:text-primary-600 font-black uppercase text-[10px] tracking-widest transition-colors">Home</Link>
                        {user ? (
                            <>
                                <Link to="/post-problem" className="flex items-center space-x-2 text-slate-500 hover:text-primary-600 font-black uppercase text-[10px] tracking-widest transition-colors">
                                    <PlusCircle className="w-5 h-5" />
                                    <span>Initiate</span>
                                </Link>
                                <Link to="/profile" className="flex items-center space-x-2 text-slate-500 hover:text-primary-600 font-black uppercase text-[10px] tracking-widest transition-colors">
                                    <User className="w-5 h-5" />
                                    <span>Identity</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-red-500 font-black uppercase text-[10px] tracking-widest transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Leave</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <Link to="/login" className="text-slate-500 hover:text-primary-600 font-black uppercase text-[10px] tracking-widest transition-colors">Sign In</Link>
                                <Link to="/signup" className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-200">
                                    Join Core
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-slate-600 p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                        >
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white/95 backdrop-blur-3xl border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 py-10 space-y-6 flex flex-col">
                            <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-800 font-black uppercase text-[10px] tracking-[0.2em]">Home</Link>
                            {user ? (
                                <>
                                    <Link to="/post-problem" onClick={() => setIsOpen(false)} className="text-slate-800 font-black uppercase text-[10px] tracking-[0.2em]">Post Problem</Link>
                                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-slate-800 font-black uppercase text-[10px] tracking-[0.2em]">Profile</Link>
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-red-500 font-black uppercase text-[10px] tracking-[0.2em]">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-800 font-black uppercase text-[10px] tracking-[0.2em]">Login</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-primary-600 text-white p-5 rounded-[2rem] text-center font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-primary-200">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
