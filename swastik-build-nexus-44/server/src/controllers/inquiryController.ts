import { Request, Response } from 'express';
import prisma from '../config/database';
import { logActivity } from '../utils/logger';

/**
 * Get all inquiries with pagination and filtering
 * @route GET /api/inquiries
 */
export const getInquiries = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (status) where.status = status as string;

        const [inquiries, total] = await Promise.all([
            prisma.inquiry.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip,
            }),
            prisma.inquiry.count({ where }),
        ]);

        res.json({
            inquiries,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inquiries.' });
    }
};

/**
 * Submit a new inquiry
 * @route POST /api/inquiries
 */
export const submitInquiry = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, message, projectId, source } = req.body;

        if (!name || !phone) {
            res.status(400).json({ error: 'Name and phone are required.' });
            return;
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                name,
                email: email || null,
                phone,
                message: message || null,
                projectId: projectId ? parseInt(projectId) : null,
                source: source || 'website',
            },
        });

        await logActivity('inquiry', `New inquiry from ${inquiry.name}`);

        res.status(201).json({ inquiry });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit inquiry.' });
    }
};

/**
 * Update inquiry status
 * @route PUT /api/inquiries/:id/status
 */
export const updateStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;

        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: { status },
        });

        await logActivity('inquiry', `Inquiry status updated: ${inquiry.name} (${status})`);

        res.json({ inquiry });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update inquiry status.' });
    }
};

/**
 * Delete an inquiry
 * @route DELETE /api/inquiries/:id
 */
export const deleteInquiry = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.inquiry.delete({ where: { id } });
        res.json({ message: 'Inquiry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inquiry.' });
    }
};

/**
 * Get inquiry statistics
 * @route GET /api/inquiries/stats
 */
export const getStats = async (_req: Request, res: Response) => {
    try {
        const [total, newCount, contacted, closed] = await Promise.all([
            prisma.inquiry.count(),
            prisma.inquiry.count({ where: { status: 'new' } }),
            prisma.inquiry.count({ where: { status: 'contacted' } }),
            prisma.inquiry.count({ where: { status: 'closed' } }),
        ]);

        res.json({ stats: { total, new: newCount, contacted, closed } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inquiry stats.' });
    }
};
