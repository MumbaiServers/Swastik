import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

/**
 * Handle admin login
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }

        const user = await prisma.adminUser.findUnique({ where: { email } });

        if (!user || !user.isActive) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
};

/**
 * Register a new admin user (Protected)
 * @route POST /api/auth/register
 */
export const register = async (req: AuthRequest, res: Response) => {
    try {
        const { email, password, name, role } = req.body;

        if (!email || !password || !name) {
            res.status(400).json({ error: 'Email, password, and name are required.' });
            return;
        }

        const existingUser = await prisma.adminUser.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ error: 'An admin with this email already exists.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || 'admin',
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        res.status(201).json({ user });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
};

/**
 * Get current admin user information
 * @route GET /api/auth/me
 */
export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.adminUser.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user info.' });
    }
};

/**
 * Change admin password
 * @route PUT /api/auth/change-password
 */
export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400).json({ error: 'Current and new passwords are required.' });
            return;
        }

        const user = await prisma.adminUser.findUnique({ where: { id: req.userId } });
        if (!user) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            res.status(401).json({ error: 'Current password is incorrect.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await prisma.adminUser.update({
            where: { id: req.userId },
            data: { password: hashedPassword },
        });

        res.json({ message: 'Password changed successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to change password.' });
    }
};
