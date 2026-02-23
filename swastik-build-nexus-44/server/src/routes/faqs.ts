import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/faqs — Public: get all active FAQs
router.get('/', async (_req: Request, res: Response) => {
    try {
        const faqs = await prisma.fAQ.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ faqs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch FAQs.' });
    }
});

// GET /api/faqs/all — Admin: get all FAQs
router.get('/all', authenticate, async (_req: Request, res: Response) => {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ faqs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch FAQs.' });
    }
});

// POST /api/faqs — Admin: create FAQ
router.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { question, answer, category, sortOrder } = req.body;

        const faq = await prisma.fAQ.create({
            data: {
                question,
                answer,
                category: category || null,
                sortOrder: parseInt(sortOrder) || 0,
            },
        });

        res.status(201).json({ faq });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create FAQ.' });
    }
});

// PUT /api/faqs/:id — Admin: update FAQ
router.put('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { question, answer, category, sortOrder, isActive } = req.body;

        const faq = await prisma.fAQ.update({
            where: { id },
            data: {
                ...(question !== undefined && { question }),
                ...(answer !== undefined && { answer }),
                ...(category !== undefined && { category }),
                ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        res.json({ faq });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update FAQ.' });
    }
});

// DELETE /api/faqs/:id — Admin: delete FAQ
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.fAQ.delete({ where: { id } });
        res.json({ message: 'FAQ deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete FAQ.' });
    }
});

export default router;
