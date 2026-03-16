import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProblem } from '../services/api';
import { PenLine, List, Tag, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CreateProblem = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Study',
        tags: ''
    });
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            toast.error('You must be logged in to post a problem');
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.category) {
            return toast.error('Please fill in all required fields');
        }

        setLoading(true);
        try {
            const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
            await createProblem({
                ...formData,
                tags: tagsArray
            });
            toast.success('Your problem has been broadcasted to the collective!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to transmit problem.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-50 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16 relative z-10 border-b border-slate-50 pb-12">
                    <div className="bg-primary-600 w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary-200 -rotate-6">
                        <PenLine className="text-white w-12 h-12" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-2">Engage the Collective</h1>
                        <p className="text-slate-400 font-bold text-lg">Define your challenge with precision to find the perfect solution.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                    <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 ml-4 uppercase tracking-[0.2em] flex items-center">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
                            Problem Thesis
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-[2rem] py-6 px-10 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-black text-2xl text-slate-800 placeholder-slate-300 shadow-inner"
                            placeholder="What is the core of your inquiry?"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-xs font-black text-slate-400 ml-4 uppercase tracking-[0.2em]">Domain Category</label>
                            <div className="relative group">
                                <select
                                    name="category"
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-6 px-10 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 appearance-none cursor-pointer shadow-inner"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="Study">Knowledge / Study</option>
                                    <option value="Coding">Engineering / Coding</option>
                                    <option value="Technology">Innovation / Technology</option>
                                    <option value="Life">Expertise / Life</option>
                                    <option value="Other">Miscellaneous / Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none text-slate-400">
                                    <List className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black text-slate-400 ml-4 uppercase tracking-[0.2em]">Strategic Tags</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="tags"
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-6 pl-16 pr-10 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-slate-800 placeholder-slate-300 shadow-inner"
                                    placeholder="Keywords separated by commas"
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 ml-4 uppercase tracking-[0.2em]">Detailed Exposition</label>
                        <textarea
                            name="description"
                            required
                            rows="8"
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-[2.5rem] py-8 px-10 focus:outline-none focus:ring-8 focus:ring-primary-500/10 transition-all font-bold text-lg text-slate-700 placeholder-slate-300 shadow-inner"
                            placeholder="Provide comprehensive context. Background, attempted solutions, and desired outcomes."
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="pt-8 block md:flex md:justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto bg-primary-600 hover:bg-primary-500 text-white py-6 px-16 rounded-2xl flex items-center justify-center space-x-4 text-xl font-black shadow-2xl shadow-primary-200 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            <span>{loading ? 'Transmitting...' : 'Broadcast Problem'}</span>
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateProblem;
