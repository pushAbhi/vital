"use client";

import Link from "next/link";
import { Mail, Lock, HeartPulse } from "lucide-react";
import { useActionState } from "react";
import { loginAction } from "../actions/auth";
import { LoginResult } from "../types/auth";
import GoogleIcon from "../components/icons/GoogleIcon";
import FacebookIcon from "../components/icons/FacebookIcon";

const initialState: LoginResult = { success: false, error: "" };

export default function Login() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState,
    );

    return (
        <div className="min-h-screen bg-surface flex flex-col justify-center px-6 py-12">
            <div className="w-full max-w-sm mx-auto">
                {/* Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-3">
                        <HeartPulse className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-navy">
                        Welcome back
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Log in to continue to Vital
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card rounded-2xl shadow-sm border border-slate-100 p-6">
                    <form className="flex flex-col gap-4" action={formAction}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    name="username"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-slate-200 bg-surface pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-muted"
                                    required
                                    maxLength={255}
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
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-slate-200 bg-surface pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-muted"
                                    required
                                    minLength={6}
                                    maxLength={40}
                                />
                            </div>
                        </div>

                        {/* Forgot password */}
                        <div className="flex justify-end -mt-1">
                            <Link
                                href="#"
                                className="text-xs font-medium text-navy-muted hover:text-navy"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-navy text-white text-sm font-medium py-2.5 mt-2 hover:bg-navy-light transition-colors"
                        >
                            Log in
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
                        <Link
                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/login/google`}
                            type="button"
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-surface transition-colors"
                        >
                            <GoogleIcon className="w-4 h-4" />
                            Continue with Google
                        </Link>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-[#1877F2] py-2.5 text-sm font-medium text-white hover:bg-[#166fe0] transition-colors"
                        >
                            <FacebookIcon className="w-4 h-4" />
                            Continue with Facebook
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    New user?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-navy hover:text-navy-light"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
