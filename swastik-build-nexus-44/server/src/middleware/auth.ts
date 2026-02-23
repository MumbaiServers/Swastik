import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: number;
    userEmail?: string;
    userRole?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'fallback-secret';

        const decoded = jwt.verify(token, secret) as {
            userId: number;
            email: string;
            role: string;
        };

        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token. Please login again.' });
    }
};

// Optional auth - attaches user info if token present, but doesn't block
export const optionalAuth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET || 'fallback-secret';
            const decoded = jwt.verify(token, secret) as {
                userId: number;
                email: string;
                role: string;
            };
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
            req.userRole = decoded.role;
        }
    } catch {
        // Silently ignore invalid tokens for optional auth
    }
    next();
};
