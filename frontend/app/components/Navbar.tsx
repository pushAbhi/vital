"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth";
import { LoginResult } from "../types/auth";

const initialState: LoginResult = { success: false, error: "" };

export default function Navbar() {
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState,
    );

    return (
        <div className="bg-amber-300 p-2 flex items-center justify-between">
            <form action={formAction} className="flex gap-2">
                <input
                    name="username"
                    type="email"
                    placeholder="Email"
                    className="rounded-xl px-3 py-2"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="rounded-xl px-3 py-2"
                    required
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-300 p-4 rounded-2xl disabled:opacity-50"
                >
                    {isPending ? "Signing in..." : "Sign in"}
                </button>
            </form>
            {!state.success && state.error && (
                <p className="text-red-600 text-sm">{state.error}</p>
            )}
        </div>
    );
}
