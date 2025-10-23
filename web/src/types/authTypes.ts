export type SignUpData = {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export type LoginData = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}