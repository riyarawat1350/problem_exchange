import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-24 pb-12 mt-32">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <Link to="/" className="flex items-center space-x-3 group w-fit">
                            <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200 group-hover:rotate-12 transition-transform duration-300">
                                <MessageSquare className="text-white w-7 h-7" />
                            </div>
                            <span className="font-black text-3xl tracking-tight text-slate-800">
                                Problem<span className="text-indigo-600">Exchange</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                            The decentralized hub for collaborative breakthroughs. We empower the curious to solve the impossible.
                        </p>
                        <div className="flex items-center space-x-6">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">The Stream</Link></li>
                            <li><Link to="/post-problem" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Initiate Inquiry</Link></li>
                            <li><Link to="/profile" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Personal Node</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Protocol</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Vision</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Security</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 font-bold text-sm tracking-wide">
                        &copy; {new Date().getFullYear()} ProblemExchange Laboratory. All systems nominal.
                    </p>
                    <div className="flex items-center space-x-2 text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                        <span>Crafted with</span>
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mx-1 animate-pulse" />
                        <span>by the collective</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
