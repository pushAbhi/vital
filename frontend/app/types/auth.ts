export type LoginBody = {
    username: string;
    password: string;
};

export type TokenResponse = {
    access_token: string;
    expires: number;
};

export type LoginResult =
    | { success: true; data: TokenResponse }
    | { success: false; error: string };
