import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MessageSquare, ThumbsUp, Clock, Tag, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ProblemCard = ({ problem }) => {
    const { _id, title, description, category, tags, userId, createdAt, answerCount, voteCount } = problem;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
            className="group"
        >
            <Link to={`/problem/${_id}`} className="block h-full">
                <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/40 border border-slate-50 group-hover:border-primary-200 transition-all flex flex-col h-full relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                    <div className="absolute inset-0 bg-white/95"></div>
                    
                    {/* Decorative Element */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-full -mr-20 -mt-20 group-hover:bg-primary-100 transition-colors duration-700 opacity-50 blur-3xl"></div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                            category === 'Coding' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                            category === 'Study' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            category === 'Technology' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            'bg-primary-50 text-primary-600 border-primary-100'
                        }`}>
                            {category}
                        </span>
                        <div className="flex items-center text-slate-300 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            <Clock className="w-3.5 h-3.5 mr-2" />
                            {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>

                    <h3 className="text-3xl font-black text-slate-800 mb-6 group-hover:text-primary-600 transition-colors leading-tight relative z-10 tracking-tight">
                        {title}
                    </h3>
                    
                    <p className="text-slate-500 text-lg font-medium mb-10 line-clamp-3 leading-relaxed relative z-10">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2.5 mb-12 relative z-10">
                        {tags && tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-black text-slate-400 bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100 uppercase tracking-widest hover:text-primary-500 hover:border-primary-100 transition-all">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700">
                                <User className="text-slate-300 w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-2 tracking-widest">Architect</p>
                                <p className="text-lg font-black text-slate-800 leading-none">{userId?.name || 'Anonymous'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-5">
                            <div className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200 group/count">
                                <MessageSquare className="w-5 h-5 mr-3 text-primary-400 group-hover/count:rotate-12 transition-transform" />
                                <span className="text-lg font-black">{answerCount || 0}</span>
                            </div>
                            <div className="flex items-center px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-800 group/vote shadow-sm">
                                <ThumbsUp className="w-5 h-5 mr-3 text-indigo-500 group-hover/vote:-rotate-12 transition-transform" />
                                <span className="text-lg font-black">{voteCount || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProblemCard;
