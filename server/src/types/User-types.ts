export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export type RegisterUser = {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export type LoginUser = {
    email: string;
    password: string;
}