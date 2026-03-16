import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await loginUser({ email, password });
            login(data.user, data.token);
            toast.success(`Welcome back, ${data.user.name}!`);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-50 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="text-center mb-12 relative z-10">
                    <div className="bg-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-200 rotate-3">
                        <LogIn className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
                    <p className="text-slate-400 mt-3 font-medium">Continue your journey with ProblemExchange</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700 ml-2 uppercase tracking-widest">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 shadow-sm"
                                placeholder="name@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700 ml-2 uppercase tracking-widest">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 shadow-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center space-x-3 text-xl font-black shadow-2xl shadow-primary-200 disabled:opacity-70 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <span>{loading ? 'Entering...' : 'Sign In'}</span>
                        {!loading && <ArrowRight className="w-6 h-6" />}
                    </button>
                </form>

                <div className="mt-12 text-center text-slate-400 font-bold relative z-10">
                    Not a member? {' '}
                    <Link to="/signup" className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-4">
                        Create account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
