"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "../constants/auth";
import { ROUTES } from "../constants/routes";
import { getPublicEnv } from "../config/process-env";
import { LoginBody, LoginResult, TokenResponse } from "../types/auth";

const { HOME } = ROUTES;

export const loginAction = async (
    _prevState: LoginResult,
    formData: FormData,
): Promise<LoginResult> => {
    const { NODE_ENV, API_URL } = getPublicEnv();

    const body = Object.fromEntries(formData) as unknown as LoginBody;
    const params = new URLSearchParams();
    params.set("username", body.username);
    params.set("password", body.password);

    const res = await fetch(`${API_URL}/login/access-token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    const data = await res.json();

    if (!res.ok) {
        return { success: false, error: data.detail ?? "Login failed" };
    }

    const { access_token, expires } = data as TokenResponse;
    const isProd = NODE_ENV === "production";
    const expiresDate = new Date(expires * 1000);

    const cookieStore = await cookies();
    cookieStore.set({
        name: AUTH_COOKIE,
        value: access_token,
        expires: expiresDate,
        httpOnly: true,
        secure: isProd,
        path: "/",
        sameSite: "lax",
    });

    return { success: true, data: { access_token, expires } };
};

export const logoutAction = async (): Promise<void> => {
    console.log("Exec");
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE);
    redirect(HOME);
};
