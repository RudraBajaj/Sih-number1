'use client';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail, Lock, Eye, EyeOff, Loader2, Phone, UserRound, GraduationCap, Building2,
    CalendarClock, Landmark, MapPin, Sun, Moon, ShieldCheck
} from 'lucide-react';

export default function RegisterPage() {
    const navigate = useNavigate();

    // Theme
    const [isDark, setIsDark] = useState(true);
    const toggleTheme = () => setIsDark(!isDark);

    // Form state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        registrationNo: '',
        department: '',
        passingYear: '',
        college: '',
        city: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword) return 'Please fill all required fields';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Enter a valid email';
        if (!/^[0-9]{10}$/.test(form.phone)) return 'Enter a valid 10-digit phone number';
        if (form.password.length < 6) return 'Password must be at least 6 characters';
        if (form.password !== form.confirmPassword) return 'Passwords do not match';
        if (!accepted) return 'Accept Terms & Privacy to continue';
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            alert(err);
            return;
        }
        try {
            setLoading(true);
            // Simulate API
            await new Promise((r) => setTimeout(r, 1200));
            alert('Account created successfully!');
            navigate('/student'); // ✅ Redirect only after validation success
        } finally {
            setLoading(false);
        }
    };

    const base = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
    const card = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
    const input = isDark
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-600 focus:border-blue-600';

    return (
        <div className={`min-h-screen ${base} flex items-center justify-center px-4 py-10`}>
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Branding / Illustration */}
                <div className={`rounded-2xl p-8 border ${card} hidden lg:flex flex-col justify-between`}>
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-extrabold tracking-tight">Student Portal</h1>
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                                title={isDark ? 'Light mode' : 'Dark mode'}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                        <p className="mt-3 opacity-70">
                            Create an account to access placements, alumni network, events, and resources tailored for students.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <Feature icon={<GraduationCap className="w-5 h-5" />} title="Student Focused" />
                            <Feature icon={<ShieldCheck className="w-5 h-5" />} title="Secure Access" />
                            <Feature icon={<CalendarClock className="w-5 h-5" />} title="Events & Drives" />
                            <Feature icon={<Building2 className="w-5 h-5" />} title="Alumni Connect" />
                        </div>
                    </div>
                    <div className="mt-10 text-sm opacity-70">
                        Already registered?{' '}
                        <Link to="/login" className="font-semibold text-blue-500 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <div className={`rounded-2xl p-6 sm:p-8 border ${card}`}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Create Student Account</h2>
                            <p className="text-sm opacity-70 mt-1">Join the campus network in a minute.</p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors lg:hidden`}
                            title={isDark ? 'Light mode' : 'Dark mode'}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* Name and Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field
                                label="Full Name"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                icon={<UserRound className="w-4 h-4" />}
                                required
                                inputClass={input}
                            />
                            <Field
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="jane@student.edu"
                                icon={<Mail className="w-4 h-4" />}
                                required
                                inputClass={input}
                            />
                        </div>

                        {/* Phone and Registration */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field
                                label="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                                icon={<Phone className="w-4 h-4" />}
                                required
                                inputClass={input}
                            />
                            <Field
                                label="Registration / Roll No."
                                name="registrationNo"
                                value={form.registrationNo}
                                onChange={handleChange}
                                placeholder="22BCS1234"
                                icon={<Landmark className="w-4 h-4" />}
                                inputClass={input}
                            />
                        </div>

                        {/* Department and Year */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field
                                label="Department"
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                placeholder="Computer Science"
                                icon={<Building2 className="w-4 h-4" />}
                                inputClass={input}
                            />
                            <Field
                                label="Passing Year"
                                name="passingYear"
                                value={form.passingYear}
                                onChange={handleChange}
                                placeholder="2026"
                                icon={<CalendarClock className="w-4 h-4" />}
                                inputClass={input}
                            />
                        </div>

                        {/* College & City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field
                                label="College / University"
                                name="college"
                                value={form.college}
                                onChange={handleChange}
                                placeholder="ABC Institute of Technology"
                                icon={<GraduationCap className="w-4 h-4" />}
                                inputClass={input}
                            />
                            <Field
                                label="City"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="New Delhi"
                                icon={<MapPin className="w-4 h-4" />}
                                inputClass={input}
                            />
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <PasswordField
                                label="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                show={showPassword}
                                setShow={setShowPassword}
                                inputClass={input}
                            />
                            <PasswordField
                                label="Confirm Password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                show={showConfirm}
                                setShow={setShowConfirm}
                                inputClass={input}
                            />
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="opacity-80">
                                I agree to the Terms of Service and Privacy Policy.
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 transition-colors disabled:opacity-60"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Create Account
                        </button>

                        {/* Login link */}
                        <div className="text-center text-sm opacity-80">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-blue-500 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

/* ---------- Reusable Controls ---------- */
function Field({ label, icon, inputClass, ...rest }) {
    return (
        <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wide mb-1 opacity-80">{label}</span>
            <div className={`flex items-center gap-2 rounded-lg border px-3 ${inputClass}`}>
                {icon}
                <input {...rest} className="w-full bg-transparent outline-none py-2 text-sm" />
            </div>
        </label>
    );
}

function PasswordField({ label, show, setShow, inputClass, ...rest }) {
    return (
        <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wide mb-1 opacity-80">{label}</span>
            <div className={`flex items-center gap-2 rounded-lg border px-3 ${inputClass}`}>
                <Lock className="w-4 h-4" />
                <input {...rest} type={show ? 'text' : 'password'} className="w-full bg-transparent outline-none py-2 text-sm" />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    aria-label="toggle password visibility"
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </label>
    );
}

function Feature({ icon, title }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200/50 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/40">
            <div className="text-blue-500">{icon}</div>
            <div className="text-sm font-semibold">{title}</div>
        </div>
    );
}
