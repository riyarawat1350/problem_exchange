import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signupUser } from '../services/api';
import { UserPlus, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            const { data } = await signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            login(data.user, data.token);
            toast.success(`Welcome to ProblemExchange, ${data.user.name}!`);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed. Email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-50 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-50 rounded-full -ml-20 -mt-20 opacity-50"></div>
                
                <div className="text-center mb-12 relative z-10">
                    <div className="bg-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-200 -rotate-3">
                        <UserPlus className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Join the Community</h2>
                    <p className="text-slate-400 mt-3 font-medium text-lg">Start sharing and solving problems today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 ml-2 uppercase tracking-widest">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 shadow-sm"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 ml-2 uppercase tracking-widest">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 shadow-sm"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 ml-2 uppercase tracking-widest">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 shadow-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 ml-2 uppercase tracking-widest">Confirm Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 shadow-sm"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center space-x-3 text-xl font-black shadow-2xl shadow-primary-200 disabled:opacity-70 transform hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                        <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                        {!loading && <ArrowRight className="w-6 h-6" />}
                    </button>
                </form>

                <div className="mt-12 text-center text-slate-400 font-bold relative z-10">
                    Already a member? {' '}
                    <Link to="/login" className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-4">
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
