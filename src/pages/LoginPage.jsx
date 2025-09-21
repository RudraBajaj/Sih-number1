'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogleScholar } from "react-icons/fa6";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Users,
    GraduationCap,
    Shield,
    Crown,
    Github,
    Sparkles,
    Sun,
    Moon,
} from 'lucide-react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [isDark, setIsDark] = useState(true); // Default to dark theme

    const navigate = useNavigate();

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const roles = [
        {
            id: 'student',
            title: 'Student',
            icon: <GraduationCap size={18} />,
            desc: 'Learning resources & network',
            redirect: '/student'
        },
        {
            id: 'alumni',
            title: 'Alumni',
            icon: <Users size={18} />,
            desc: 'Connect with community',
            redirect: '/alumni'
        },
        {
            id: 'admin',
            title: 'Admin',
            icon: <Shield size={18} />,
            desc: 'Manage users & settings',
            redirect: '/admin'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRole) {
            alert('Please select a role to continue');
            return;
        }

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const role = roles.find(r => r.id === selectedRole);

            if (role) {
                localStorage.setItem('userRole', selectedRole);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isAuthenticated', 'true');

                navigate(role.redirect, {
                    replace: true,
                    state: {
                        userRole: selectedRole,
                        email: email,
                        loginTime: new Date().toISOString()
                    }
                });
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`h-screen w-full overflow-hidden relative flex items-center justify-center p-2 sm:p-4 ${isDark ? 'dark' : ''}`}>
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
                {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                    <Moon className="h-5 w-5 text-blue-600" />
                )}
            </button>

            {/* Enhanced Background - Reduced Animation, Better Visibility */}
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
                {/* Subtle Floating Orbs - Reduced Opacity for Better Content Visibility */}
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="floating-orb orb-3"></div>

                {/* Light Grid Pattern Overlay */}
                <div className={`absolute inset-0 ${isDark ? 'bg-grid-white/5' : 'bg-grid-slate-200/20'}`}></div>

                {/* Subtle Overlay for Content Visibility */}
                <div className={`absolute inset-0 ${isDark ? 'bg-black/10' : 'bg-white/20'}`}></div>
            </div>

            <style jsx>{`
        /* Theme Variables */
        :root {
          --radius: 0.5rem;
          --background: 0 0% 100%;
          --foreground: 240 10% 3.9%;
          --primary: 221.2 83.2% 53.3%;
          --primary-foreground: 240 10% 3.9%;
          --secondary: 210 40% 96.1%;
          --border: 221.2 12.5% 90%;
          --input: 221.2 12.5% 90%;
        }

        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 0 0% 98%;
          --primary: 217.2 91.2% 59.8%;
          --primary-foreground: 240 10% 3.9%;
          --secondary: 217.2 32.6% 17.5%;
          --border: 221.2 12.5% 15.9%;
          --input: 221.2 12.5% 15.9%;
        }

        /* Reduced Background Animation for Better Visibility */
        .animate-gradient {
          background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #e2e8f0, #cbd5e1);
          background-size: 300% 300%;
          animation: gradient 20s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .dark .animate-gradient {
          background: linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569);
          background-size: 300% 300%;
          animation: gradient 20s ease infinite;
        }

        /* Enhanced Button Styles with Better Visibility */
        .login-btn {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, #6366f1 50%, #8b5cf6 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px hsl(var(--primary)/0.3);
        }
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }
        .login-btn:hover::before {
          left: 100%;
        }
        .login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px hsl(var(--primary)/0.4);
        }

        /* Enhanced Role Card Styles with Better Contrast */
        .role-card {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .dark .role-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .role-card:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 20px hsl(var(--primary)/0.15);
        }
        .dark .role-card:hover {
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 20px hsl(var(--primary)/0.2);
        }
        .role-card.selected {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, #6366f1 100%);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 6px 25px hsl(var(--primary)/0.4);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Subtle Floating Orbs - Reduced for Better Content Visibility */
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 10s ease-in-out infinite;
        }
        .orb-1 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          top: 70%;
          right: 15%;
          animation-delay: 3s;
        }
        .orb-3 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%);
          bottom: 25%;
          left: 25%;
          animation-delay: 6s;
        }

        /* Light Mode Orbs */
        :not(.dark) .orb-1 {
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
        }
        :not(.dark) .orb-2 {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%);
        }
        :not(.dark) .orb-3 {
          background: radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        /* Enhanced Glass Cards with Better Visibility */
.role-glass-card {
  background: #ffffff;  /* Pure white */
  border: 1px solid #d1d5db;  /* Light gray border */
}
.dark .role-glass-card {
  background: #111827;  /* Dark gray */
  border: 1px solid #374151;  /* Darker border */
}

.glass-card {
  background: #ffffff;  /* Pure white */
  border: 1px solid #d1d5db;  /* Light gray border */
}
.dark .glass-card {
  background: #1f2937;  /* Darker background */
  border: 1px solid #374151;  /* Darker border */
}



        /* Enhanced Social Buttons */
        .social-btn {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .dark .social-btn {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .social-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .dark .social-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .orb-1 { width: 100px; height: 100px; }
          .orb-2 { width: 80px; height: 80px; }
          .orb-3 { width: 60px; height: 60px; }
        }
      `}</style>

            <div className="z-10 w-full max-w-7xl h-full flex items-center justify-center">
                <div className="w-full max-w-6xl overflow-hidden rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-2xl">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="grid h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] lg:h-[min(700px,calc(100vh-32px))] grid-cols-1 lg:grid-cols-2">

                        {/* Left Side - Role Selection with Fixed Dimensions */}
                        <div className="role-glass-card relative flex flex-col overflow-hidden">
                            {/* Background Pattern */}
                            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10'}`}></div>

                            {/* Content - Fixed Structure */}
                            <div className="relative z-10 flex flex-col h-full p-4 sm:p-6 lg:p-8">
                                {/* Header Section - Fixed Height */}
                                <div className="flex-shrink-0 mb-4 lg:mb-6">
                                    <div className={`mb-3 lg:mb-4 flex items-center text-sm sm:text-base lg:text-lg font-semibold uppercase ${isDark ? 'text-white' : 'text-slate-700'}`}>
                                        <FaGoogleScholar className={`mr-2 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                                        Chandigarh University
                                    </div>
                                    <h1 className={`mb-2 lg:mb-3 text-2xl sm:text-3xl lg:text-4xl font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                        Choose Your Role
                                    </h1>
                                    <p className={`text-sm sm:text-base lg:text-lg opacity-80 ${isDark ? 'text-white' : 'text-slate-600'}`}>
                                        Select your role to access dashboard
                                    </p>
                                </div>

                                {/* Role Cards Section */}
                                <div className="flex-1 flex flex-col min-h-0">
                                    <div className="flex flex-col space-y-2.5 lg:space-y-3 overflow-hidden">
                                        {roles.map((role) => (
                                            <div
                                                key={role.id}
                                                className={`role-card p-3 lg:p-4 rounded-lg lg:rounded-xl flex-shrink-0 ${selectedRole === role.id ? 'selected' : ''
                                                    }`}
                                                onClick={() => setSelectedRole(role.id)}
                                            >
                                                <div className="flex items-center">
                                                    <div className={`mr-3 lg:mr-4 flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg backdrop-blur-sm flex-shrink-0 ${selectedRole === role.id
                                                        ? 'bg-white/30 text-white'
                                                        : isDark
                                                            ? 'bg-white/15 text-white'
                                                            : 'bg-blue-500/20 text-blue-700'
                                                        }`}>
                                                        {role.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`font-semibold text-sm lg:text-base truncate ${selectedRole === role.id
                                                            ? 'text-white'
                                                            : isDark
                                                                ? 'text-white'
                                                                : 'text-slate-800'
                                                            }`}>{role.title}</div>
                                                        <div className={`text-xs lg:text-sm opacity-70 truncate ${selectedRole === role.id
                                                            ? 'text-white'
                                                            : isDark
                                                                ? 'text-white'
                                                                : 'text-slate-600'
                                                            }`}>{role.desc}</div>
                                                    </div>
                                                    <div className={`w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full border-2 transition-all flex-shrink-0 ${selectedRole === role.id
                                                        ? 'bg-white border-white scale-110'
                                                        : isDark
                                                            ? 'border-white/50'
                                                            : 'border-slate-400/70'
                                                        }`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selected Role Feedback */}
                                    {selectedRole && (
                                        <div className={`flex-shrink-0 mt-4 lg:mt-6 p-3 lg:p-4 rounded-lg lg:rounded-xl backdrop-blur-sm border ${isDark
                                            ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-white/20'
                                            : 'bg-gradient-to-r from-green-400/15 to-blue-400/15 border-green-300/30'
                                            }`}>
                                            <p className={`text-xs lg:text-sm flex items-center ${isDark ? 'text-white' : 'text-slate-700'}`}>
                                                <span className={`mr-2 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`}>✓</span>
                                                <span className="truncate">
                                                    Selected: <span className="font-semibold">{roles.find(r => r.id === selectedRole)?.title}</span>
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="glass-card flex flex-col justify-center overflow-hidden">
                            <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                                <div className="w-full max-w-md">
                                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
                                        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-light uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                            Welcome back
                                        </h2>
                                        <p className={`mt-2 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                            Sign in to continue your journey
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className={`mb-1 sm:mb-2 block text-xs sm:text-sm font-medium uppercase ${isDark ? 'text-gray-300' : 'text-slate-700'}`}
                                            >
                                                Email address
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Mail className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${isDark
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400'
                                                        : 'bg-white/70 border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500'
                                                        }`}

                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className={`mb-1 sm:mb-2 block text-xs sm:text-sm font-medium uppercase ${isDark ? 'text-gray-300' : 'text-slate-700'}`}
                                            >
                                                Password
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Lock className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                                                </div>
                                                <input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${isDark
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400'
                                                        : 'bg-white/70 border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500'
                                                        }`}
                                                    placeholder="Enter your password"
                                                    required
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <label className={`flex items-center cursor-pointer ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                                <input
                                                    type="checkbox"
                                                    className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded"
                                                />
                                                Remember me
                                            </label>
                                            <a
                                                href="#"
                                                className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                                            >
                                                Forgot password?
                                            </a>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading || !selectedRole}
                                            className="login-btn w-full py-2.5 sm:py-3 px-4 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                    Signing In...
                                                </>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </button>

                                        <div className="relative mt-4 sm:mt-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className={`w-full border-t ${isDark ? 'border-white/20' : 'border-slate-300'}`}></div>
                                            </div>
                                            <div className="relative flex justify-center text-xs sm:text-sm">
                                                <span className={`px-2 ${isDark ? 'bg-transparent text-gray-300' : 'bg-transparent text-slate-500'}`}>Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                            <button
                                                type="button"
                                                className={`social-btn w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${isDark ? 'text-white' : 'text-slate-700'}`}
                                            >
                                                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="ml-1 sm:ml-2 font-medium">GitHub</span>
                                            </button>
                                        </div>
                                    </form>

                                    <div className={`mt-4 sm:mt-6 lg:mt-8 text-center text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                        Don&apos;t have an account?{' '}
                                        <button
                                            onClick={() => navigate("/register")}
                                            className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                                } transition-colors`}
                                        >
                                            Sign up for free
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}