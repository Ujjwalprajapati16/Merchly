import type { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({ message: err.message, details: err.details });
    }
    return res.status(500).json({ message: "Something went wrong", details: err });
}

export class APIError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(statusCode: number, message: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = process.env.NODE_ENV === "development" ? details : undefined;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequest extends APIError {
    constructor(message: string, details?: any) {
        super(400, message, details);
    }
}
export class Unauthorized extends APIError {
    constructor(message: string, details?: any) {
        super(401, message, details);
    }
}

export class Forbidden extends APIError {
    constructor(message: string, details?: any) {
        super(403, message, details);
    }
}

export class NotFound extends APIError {
    constructor(message: string, details?: any) {
        super(404, message, details);
    }
}
