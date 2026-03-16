import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProblems } from '../services/api';
import { Search, PlusCircle, Filter, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ProblemCard from '../components/ProblemCard';
import toast from 'react-hot-toast';

const Home = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const categories = ['All', 'Study', 'Coding', 'Technology', 'Life', 'Other'];
    const sortOptions = [
        { label: 'Latest Path', value: 'newest' },
        { label: 'Ancient Wisdom', value: 'oldest' },
        { label: 'Peak Interest', value: 'popular' },
        { label: 'Deep Solutions', value: 'most-answered' },
    ];

    useEffect(() => {
        fetchProblems();
    }, [selectedCategory, sortBy]);

    const fetchProblems = async () => {
        setLoading(true);
        try {
            const params = {};
            if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
            if (search) params.search = search;
            params.sort = sortBy;

            const { data } = await getProblems(params);
            setProblems(data);
        } catch (err) {
            console.error('Error fetching problems:', err);
            toast.error('Collective knowledge is temporarily unreachable');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProblems();
    };

    return (
        <div className="space-y-16 py-8">
            {/* Hero Section - High End Aesthetic */}
            <section className="relative px-6 py-24 md:py-32 bg-slate-900 rounded-[5rem] overflow-hidden text-center shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-primary-600/10 to-transparent"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600 rounded-full blur-[140px] opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[140px] opacity-20"></div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary-400 font-black uppercase text-[10px] tracking-[0.3em] mb-10 backdrop-blur-md">
                        <Sparkles className="w-4 h-4" />
                        <span>The Architect's Workspace</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
                        Solve the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-400">Impossible</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-2xl mx-auto font-bold leading-relaxed">
                        Join the elite collective of problem solvers. Share challenges, crowdsource solutions, and build the future together.
                    </p>

                    {/* Search Field */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group px-4">
                        <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-400 transition-colors">
                            <Search className="w-7 h-7" />
                        </div>
                        <input
                            type="text"
                            placeholder="Identify your challenge..."
                            className="w-full py-8 pl-20 pr-32 rounded-[2.5rem] bg-slate-800/50 border-2 border-slate-700/50 text-white shadow-2xl focus:outline-none focus:ring-8 focus:ring-primary-500/10 focus:border-primary-500 transition-all text-2xl font-black placeholder-slate-600 backdrop-blur-xl"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="absolute right-8 top-1/2 -translate-y-1/2 bg-primary-600 px-10 py-4.5 rounded-2xl text-white hover:bg-primary-500 transition-all font-black text-lg shadow-2xl shadow-primary-900/50"
                        >
                            Sync
                        </button>
                    </form>
                </motion.div>
            </section>

            {/* Discovery Grid */}
            <div className="flex flex-col xl:flex-row gap-16 px-4">
                {/* Sidebar Orchestrator */}
                <aside className="xl:w-80 flex-shrink-0">
                    <div className="sticky top-32 space-y-10">
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50 shadow-slate-200/50">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Domains</h3>
                            <div className="space-y-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                                        className={`w-full text-right px-6 py-4 rounded-2xl text-sm font-black transition-all transform hover:scale-105 active:scale-95 ${
                                            (cat === 'All' && !selectedCategory) || selectedCategory === cat
                                                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300'
                                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Link to="/post-problem" className="block p-10 bg-primary-600 rounded-[3.5rem] text-white shadow-3xl shadow-primary-200 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                            <div className="relative z-10">
                                <PlusCircle className="w-12 h-12 mb-6 group-hover:rotate-90 transition-transform duration-500" />
                                <h4 className="text-2xl font-black leading-tight">Initiate New Challenge</h4>
                                <p className="text-primary-200 font-bold mt-3 text-sm">Engage the collective</p>
                            </div>
                        </Link>
                    </div>
                </aside>

                {/* Content Stream */}
                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-16">
                        <div>
                            <h2 className="text-5xl font-black text-slate-800 tracking-tight">
                                {search ? 'Search Convergence' : selectedCategory ? selectedCategory : 'The Knowledge Stream'}
                            </h2>
                            <p className="text-slate-400 font-bold text-lg mt-2">Observing latest community breakthroughs</p>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] shadow-sm border border-slate-50">
                            <TrendingUp className="w-6 h-6 text-primary-500" />
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-black text-slate-800 focus:outline-none cursor-pointer pr-4 uppercase tracking-widest"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-[3.5rem] h-80 animate-pulse border border-slate-50"></div>
                            ))}
                        </div>
                    ) : (problems && Array.isArray(problems) && problems.length > 0) ? (
                        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
                            {problems.map((problem) => (
                                <ProblemCard key={problem._id} problem={problem} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[5rem] border-4 border-dashed border-slate-100 relative">
                            <Sparkles className="w-20 h-20 text-slate-100 absolute top-10 left-10" />
                            <div className="relative z-10 max-w-lg mx-auto">
                                <h3 className="text-4xl font-black text-slate-800 mb-6 tracking-tight">The Void Awaits</h3>
                                <p className="text-slate-400 mb-12 font-bold text-xl leading-relaxed">
                                    No breakthroughs identified in this sector. Be the one to break the silence.
                                </p>
                                <Link to="/post-problem" className="bg-slate-900 text-white py-6 px-16 rounded-2xl inline-flex font-black text-xl shadow-3xl hover:scale-105 active:scale-95 transition-all">
                                    Engage System
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
