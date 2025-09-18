'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const navigate = useNavigate();

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
        },
        {
            id: 'super-admin',
            title: 'Super Admin',
            icon: <Crown size={18} />,
            desc: 'Full system control',
            redirect: '/super-admin'
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
        <div className="h-screen w-full overflow-hidden relative flex items-center justify-center p-2 sm:p-4">
            {/* Enhanced Background with Animated Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
                {/* Floating Orbs - Responsive sizes */}
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="floating-orb orb-3"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-white/10"></div>

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
            </div>

            <style jsx>{`
        /* Enhanced Button Styles */
        .login-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
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
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s ease;
        }
        .login-btn:hover::before {
          left: 100%;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.4);
        }

        /* Enhanced Role Card Styles - Optimized for No Overflow */
        .role-card {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .role-card:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.2);
        }
        .role-card.selected {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Floating Orbs Animation - Responsive */
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          animation: float 6s ease-in-out infinite;
        }
        .orb-1 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
          top: 5%;
          left: 5%;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
        .orb-3 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
          bottom: 10%;
          left: 50%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        /* Grid Background */
        .bg-grid-white\\/10 {
          background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Radial Gradient */
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        /* Enhanced Input Focus */
        .enhanced-input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
          background: rgba(255, 255, 255, 0.95);
        }

        /* Card Glass Effect - Mobile Optimized */
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        /* Role Selection Glass Card - Fixed Height */
        .role-glass-card {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        /* Sparkle Animation */
        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        /* Enhanced Social Buttons - Mobile Optimized */
        .social-btn {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .social-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .orb-1 { width: 120px; height: 120px; }
          .orb-2 { width: 100px; height: 100px; }
          .orb-3 { width: 80px; height: 80px; }
        }
      `}</style>

            <div className="z-10 w-full max-w-7xl h-full flex items-center justify-center">
                <div className="w-full max-w-6xl overflow-hidden rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-2xl">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="grid h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] lg:h-[min(700px,calc(100vh-32px))] grid-cols-1 lg:grid-cols-2">

                        {/* Left Side - Role Selection with Fixed Dimensions */}
                        <div className="role-glass-card relative flex flex-col overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>

                            {/* Content - Fixed Structure */}
                            <div className="relative z-10 flex flex-col h-full p-4 sm:p-6 lg:p-8">
                                {/* Header Section - Fixed Height */}
                                <div className="flex-shrink-0 mb-4 lg:mb-6">
                                    <div className="mb-3 lg:mb-4 flex items-center text-sm sm:text-base lg:text-lg font-semibold uppercase">
                                        <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 sparkle" />
                                        Chandigarh University
                                    </div>
                                    <h1 className="mb-2 lg:mb-3 text-2xl sm:text-3xl lg:text-4xl font-medium text-white">
                                        Choose Your Role
                                    </h1>
                                    <p className="text-sm sm:text-base lg:text-lg opacity-80 text-white">
                                        Select your role to access dashboard
                                    </p>
                                </div>

                                {/* Role Cards Section - Flexible with Max Height */}
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
                                                    <div className="mr-3 lg:mr-4 flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm flex-shrink-0">
                                                        {role.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-sm lg:text-base text-white truncate">{role.title}</div>
                                                        <div className="text-xs lg:text-sm opacity-70 text-white truncate">{role.desc}</div>
                                                    </div>
                                                    <div className={`w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full border-2 transition-all flex-shrink-0 ${selectedRole === role.id
                                                        ? 'bg-white border-white scale-110'
                                                        : 'border-white/50'
                                                        }`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selected Role Feedback - Fixed at Bottom */}
                                    {selectedRole && (
                                        <div className="flex-shrink-0 mt-4 lg:mt-6 p-3 lg:p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg lg:rounded-xl backdrop-blur-sm border border-white/20">
                                            <p className="text-xs lg:text-sm flex items-center text-white">
                                                <span className="mr-2 text-green-400 flex-shrink-0">✓</span>
                                                <span className="truncate">
                                                    Selected: <span className="font-semibold">{roles.find(r => r.id === selectedRole)?.title}</span>
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Login Form with Enhanced Glass Design */}
                        <div className="glass-card flex flex-col justify-center overflow-hidden">
                            <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                                <div className="w-full max-w-md">
                                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-light uppercase text-gray-800">
                                            Welcome back
                                        </h2>
                                        <p className="mt-2 text-xs sm:text-sm text-gray-600">
                                            Sign in to continue your journey
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium uppercase text-gray-700"
                                            >
                                                Email address
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="enhanced-input block w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white/70 py-2.5 sm:py-3 pr-3 pl-8 sm:pl-10 text-xs sm:text-sm backdrop-blur-sm transition-all focus:border-purple-500"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium uppercase text-gray-700"
                                            >
                                                Password
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="enhanced-input block w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white/70 py-2.5 sm:py-3 pr-10 sm:pr-12 pl-8 sm:pl-10 text-xs sm:text-sm backdrop-blur-sm transition-all focus:border-purple-500"
                                                    placeholder="Enter your password"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center text-xs sm:text-sm text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    className="h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                />
                                                <span className="ml-2">Remember me</span>
                                            </label>
                                            <a
                                                href="#"
                                                className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 font-medium"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>

                                        <button
                                            type="submit"
                                            className="login-btn relative flex w-full items-center justify-center rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-all duration-300"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                                    <span className="ml-2">Signing in...</span>
                                                </>
                                            ) : (
                                                'Sign in to your account'
                                            )}
                                        </button>

                                        <div className="relative text-center text-xs sm:text-sm text-gray-500">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <span className="relative bg-white px-4">Or continue with</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            <button
                                                type="button"
                                                className="social-btn flex items-center justify-center rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm"
                                            >
                                                <img
                                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                                    alt="Google"
                                                />
                                                <span className="ml-1 sm:ml-2 font-medium">Google</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="social-btn flex items-center justify-center rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm"
                                            >
                                                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="ml-1 sm:ml-2 font-medium">GitHub</span>
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-4 sm:mt-6 lg:mt-8 text-center text-xs sm:text-sm text-gray-600">
                                        Don&apos;t have an account?{' '}
                                        <a href="#" className="font-medium text-purple-600 hover:text-purple-800">
                                            Sign up for free
                                        </a>
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