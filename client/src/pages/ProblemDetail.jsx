import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProblem, getAnswers, createAnswer, voteAnswer } from '../services/api';
import { User, Clock, MessageSquare, Send, ThumbsUp, ChevronLeft, Calendar, AlertCircle, Sparkles, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import toast from 'react-hot-toast';

const ProblemDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [problem, setProblem] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAnswer, setNewAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [probRes, ansRes] = await Promise.all([
                getProblem(id),
                getAnswers(id)
            ]);
            setProblem(probRes.data);
            setAnswers(ansRes.data);
        } catch (err) {
            console.error('Error fetching detail:', err);
            toast.error('Failed to load problem details');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!newAnswer.trim()) return;

        setSubmitting(true);
        try {
            await createAnswer({ problemId: id, answerText: newAnswer });
            setNewAnswer('');
            toast.success('Your solution has been posted!');
            // Refresh answers
            const { data } = await getAnswers(id);
            setAnswers(data);
        } catch (err) {
            console.error('Error posting answer:', err);
            toast.error(err.response?.data?.message || 'Failed to post your answer');
        } finally {
            setSubmitting(false);
        }
    };

    const handleVote = async (answerId) => {
        if (!user) return toast.error('Please login to upvote');
        try {
            await voteAnswer(answerId);
            // Refresh answers to get new vote count
            const { data } = await getAnswers(id);
            setAnswers(data);
            toast.success('Vote updated!');
        } catch (err) {
            console.error('Error voting:', err);
            toast.error('Failed to update vote');
        }
    };

    if (loading) return (
        <div className="max-w-4xl mx-auto py-20 px-4">
            <div className="animate-pulse space-y-8">
                <div className="h-8 bg-slate-200 rounded-2xl w-32 mb-12"></div>
                <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100">
                    <div className="h-4 bg-slate-100 rounded w-24 mb-6"></div>
                    <div className="h-12 bg-slate-200 rounded-2xl w-3/4 mb-10"></div>
                    <div className="h-20 bg-slate-100 rounded-3xl w-full"></div>
                </div>
            </div>
        </div>
    );

    if (!problem) return (
        <div className="max-w-4xl mx-auto py-32 px-4 text-center">
            <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-red-400">
                <AlertCircle className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">Problem Missing</h2>
            <p className="text-slate-500 text-lg mb-10">We couldn't find the challenge you're looking for.</p>
            <Link to="/" className="btn-primary py-4 px-10 rounded-2xl font-black text-lg shadow-2xl shadow-primary-200">
                Return Home
            </Link>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <Link to="/" className="group inline-flex items-center text-slate-400 font-bold mb-12 hover:text-primary-600 transition-colors">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 mr-4 group-hover:scale-110 group-hover:bg-primary-50 group-hover:border-primary-100 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                </div>
                Back to Feed
            </Link>

            {/* Problem Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-16 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-50">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="px-6 py-2 bg-primary-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary-200">
                            {problem.category}
                        </span>
                        <div className="flex items-center text-slate-400 text-xs font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            <Clock className="w-4 h-4 mr-2" />
                            {new Date(problem.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-[2rem] shadow-sm border border-slate-50">
                        <div className="w-12 h-12 bg-gradient-to-tr from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-primary-200">
                            {problem.userId?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Posted by</p>
                            <p className="text-slate-800 font-black text-lg">{problem.userId?.name || 'Anonymous'}</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-10 leading-[1.1] tracking-tight">
                        {problem.title}
                    </h1>

                    <div className="prose prose-slate prose-xl max-w-none">
                        <p className="text-slate-600 font-medium leading-[1.8] whitespace-pre-wrap">
                            {problem.description}
                        </p>
                    </div>

                    {problem.tags && problem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-12 pt-12 border-t border-slate-50">
                            {problem.tags.map((tag, idx) => (
                                <span key={idx} className="bg-slate-50 text-slate-400 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:text-primary-600 hover:border-primary-100 cursor-default transition-all">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Answers List */}
            <div className="mb-20">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-slate-800 flex items-center gap-4">
                        <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-200">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        Community Solutions
                        <span className="text-slate-300 text-2xl font-black">({answers.length})</span>
                    </h2>
                </div>

                <div className="space-y-10">
                    <AnimatePresence>
                        {answers.map((answer) => (
                            <motion.div
                                key={answer._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl border border-slate-50 relative group hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-slate-50 rounded-[1.25rem] flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                                            <User className="w-7 h-7 text-slate-400 group-hover:text-primary-500 transition-all" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-800 leading-none mb-1">{answer.userId?.name}</h4>
                                            <p className="text-xs font-black text-slate-300 uppercase tracking-widest leading-none">
                                                Active Contributor
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden md:block">
                                            <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Delivered on</p>
                                            <p className="text-xs font-black text-slate-500">{new Date(answer.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <button
                                            onClick={() => handleVote(answer._id)}
                                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all shadow-lg active:scale-90 ${
                                                answer.votes.includes(user?.id)
                                                ? 'bg-primary-600 text-white shadow-primary-200 scale-105'
                                                : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                                            }`}
                                        >
                                            <ThumbsUp className={`w-5 h-5 ${answer.votes.includes(user?.id) ? 'fill-white' : ''}`} />
                                            <span className="font-black text-lg">{answer.votes.length}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="prose prose-slate max-w-none">
                                    <p className="text-slate-600 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                                        {answer.answerText}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {answers.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 text-slate-300 flex flex-col items-center">
                            <Sparkles className="w-16 h-16 mb-6 text-slate-100" />
                            <h3 className="text-2xl font-black text-slate-400">Silent Wisdom</h3>
                            <p className="font-bold text-slate-300 mt-2">No one has stepped up yet. Your insight is needed!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Answer Form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 p-10 md:p-16 rounded-[4rem] shadow-3xl text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-900 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20"></div>
                
                <h3 className="text-4xl font-black mb-4 relative z-10">Contribute your wisdom</h3>
                <p className="text-slate-400 font-bold mb-12 text-lg relative z-10">Help the community by providing a clear and helpful solution.</p>

                {user ? (
                    <form onSubmit={handleAnswerSubmit} className="space-y-8 relative z-10">
                        <textarea
                            required
                            rows="6"
                            className="w-full bg-slate-800 border-2 border-slate-700/50 rounded-[2rem] py-8 px-10 focus:outline-none focus:ring-8 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-xl text-white placeholder-slate-500"
                            placeholder="Type your elegant solution here..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                        ></textarea>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-slate-400 gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-black uppercase tracking-widest">Active Contribution</span>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-primary-600 hover:bg-primary-500 py-6 px-16 rounded-2xl flex items-center gap-4 text-xl font-black shadow-2xl shadow-primary-900/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                <span>{submitting ? 'Propagating...' : 'Unite Solution'}</span>
                                <Send className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center p-16 bg-slate-800/50 rounded-[3rem] border border-slate-700/50 relative z-10">
                        <Lock className="w-12 h-12 mx-auto mb-6 text-primary-500" />
                        <h4 className="text-2xl font-black mb-4">Locked Content</h4>
                        <p className="text-slate-400 mb-10 font-bold">You need to be part of the collective to contribute solutions.</p>
                        <Link to="/login" className="bg-white text-slate-900 hover:bg-slate-100 py-5 px-12 rounded-[2rem] inline-flex font-black text-xl shadow-2xl transition-all hover:scale-105">
                            Authenticate Now
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ProblemDetail;
