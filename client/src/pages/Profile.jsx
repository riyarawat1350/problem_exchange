import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/api';
import { User, Mail, MessageSquare, ThumbsUp, HelpCircle, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const { data } = await getProfile();
            setProfileData(data);
        } catch (err) {
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return (
        <div className="max-w-4xl mx-auto py-32 px-4 text-center">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-400">
                <Lock className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">Identity Required</h2>
            <p className="text-slate-500 text-lg mb-10">Sign in to view your contribution history.</p>
            <Link to="/login" className="btn-primary py-4 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary-200">
                Sign In Now
            </Link>
        </div>
    );

    if (loading) return (
        <div className="max-w-5xl mx-auto py-20 px-4">
            <div className="animate-pulse space-y-12">
                <div className="h-64 bg-slate-200 rounded-[3.5rem] w-full"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="h-40 bg-slate-100 rounded-[2.5rem]"></div>
                    <div className="h-40 bg-slate-100 rounded-[2.5rem]"></div>
                    <div className="h-40 bg-slate-100 rounded-[2.5rem]"></div>
                </div>
            </div>
        </div>
    );

    const stats = profileData?.stats || { problemCount: 0, answerCount: 0, totalUpvotes: 0 };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                {/* Profile Header Card */}
                <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-50 relative mb-12">
                    <div className="bg-gradient-to-br from-indigo-600 via-primary-600 to-primary-800 h-72 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <div className="absolute -bottom-24 left-16">
                            <div className="w-48 h-48 bg-white rounded-[3rem] p-3 shadow-2xl relative group">
                                <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[2.5rem] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent"></div>
                                    <User className="w-24 h-24 text-slate-300" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-3xl shadow-xl shadow-green-200 border-4 border-white">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-32 pb-16 px-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h1 className="text-6xl font-black text-slate-800 mb-4 tracking-tight">{user.name}</h1>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 text-slate-500 font-black uppercase text-[10px] tracking-widest">
                                        <Mail className="w-4 h-4 mr-3 text-primary-500" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center bg-primary-50 px-6 py-3 rounded-2xl border border-primary-100 text-primary-700 font-black uppercase text-[10px] tracking-widest">
                                        <Sparkles className="w-4 h-4 mr-3" />
                                        Member since {new Date().getFullYear()}
                                    </div>
                                </div>
                            </div>
                            <button className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200">
                                Edit Identity
                            </button>
                        </div>
                    </div>
                </div>

                {/* Performance Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Stats */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50 text-center"
                        >
                            <div className="bg-blue-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-blue-100">
                                <HelpCircle className="text-blue-600 w-10 h-10" />
                            </div>
                            <div className="text-5xl font-black text-slate-800 mb-2">{stats.problemCount}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Inquiries</div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50 text-center"
                        >
                            <div className="bg-primary-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-primary-100">
                                <MessageSquare className="text-primary-600 w-10 h-10" />
                            </div>
                            <div className="text-5xl font-black text-slate-800 mb-2">{stats.answerCount}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Solutions</div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50 text-center"
                        >
                            <div className="bg-rose-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-rose-100">
                                <ThumbsUp className="text-rose-600 w-10 h-10" />
                            </div>
                            <div className="text-5xl font-black text-slate-800 mb-2">{stats.totalUpvotes}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authority</div>
                        </motion.div>
                    </div>

                    {/* Reputation Panel */}
                    <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-600 rounded-full -mr-20 -mt-20 blur-[80px] opacity-30"></div>
                        <h3 className="text-2xl font-black mb-8 relative z-10">Ecosystem Rank</h3>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div>
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-2">Social Credits</p>
                                <p className="text-5xl font-black">{stats.totalUpvotes * 25 + stats.answerCount * 10}</p>
                            </div>
                            <div className="bg-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-900 scale-110">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '65%' }}
                                    className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full"
                                ></motion.div>
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Novice</span>
                                <span className="text-primary-400">Master Pathfinder (Level 4)</span>
                            </div>
                        </div>
                        <p className="mt-12 text-slate-400 font-bold text-sm leading-relaxed relative z-10">
                            You're in the top 5% of pathfinders this month. Your solutions have accelerated 42 developers.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
