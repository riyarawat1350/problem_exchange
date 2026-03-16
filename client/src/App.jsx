import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreateProblem from './pages/CreateProblem';
import ProblemDetail from './pages/ProblemDetail';
import Footer from './components/Footer';

import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-[#fafafa]">
                <Toaster position="top-right" />
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/post-problem" element={<CreateProblem />} />
                        <Route path="/problem/:id" element={<ProblemDetail />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
