import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    statusCode?: number;
    code?: string;
}

export const errorHandler = (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error('🔥 Error:', err.message);

    // Prisma-specific errors
    if (err.code === 'P2002') {
        res.status(409).json({
            error: 'A record with this unique value already exists.',
            details: err.message,
        });
        return;
    }

    if (err.code === 'P2025') {
        res.status(404).json({
            error: 'Record not found.',
            details: err.message,
        });
        return;
    }

    // Multer file size error
    if (err.message === 'File too large') {
        res.status(413).json({
            error: 'File is too large. Maximum size is 10MB.',
        });
        return;
    }

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500
        ? 'Internal server error. Please try again later.'
        : err.message;

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
