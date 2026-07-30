import Link from "next/link";
import { User, Mail, Lock, HeartPulse } from "lucide-react";

export default function register() {
    return (
        <div className="min-h-screen bg-surface flex flex-col justify-center px-6 py-12">
            <div className="w-full max-w-sm mx-auto">
                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-3">
                        <HeartPulse className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-navy">
                        Create your account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Get started with Vital
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card rounded-2xl shadow-sm border border-slate-100 p-6">
                    <form className="flex flex-col gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Full name
                            </label>
                            <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full rounded-lg border border-slate-200 bg-surface pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-muted"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-slate-200 bg-surface pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-muted"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-slate-200 bg-surface pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-muted"
                                />
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-slate-200 bg-surface pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-muted"
                                />
                            </div>
                        </div>

                        {/* Register button */}
                        <button
                            type="button"
                            className="w-full rounded-lg bg-navy text-white text-sm font-medium py-2.5 mt-2 hover:bg-navy-light transition-colors"
                        >
                            Create account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs text-slate-400">
                            or continue with
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* OAuth buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-surface transition-colors"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.6 35.4 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.9 39.7 16.4 44 24 44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.6 5.4C40.7 36.5 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-[#1877F2] py-2.5 text-sm font-medium text-white hover:bg-[#166fe0] transition-colors"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-navy hover:text-navy-light"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
