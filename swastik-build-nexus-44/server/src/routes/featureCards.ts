import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/feature-cards — Public: get all active feature cards
router.get('/', async (req: Request, res: Response) => {
    try {
        const { page } = req.query;
        const where: any = { isActive: true };
        if (page) where.page = page as string;

        const cards = await prisma.featureCard.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ cards });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feature cards.' });
    }
});

// PUT /api/feature-cards — Admin: bulk update feature cards for a page
router.put('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { page, cards } = req.body; // page: "home" | "about", cards: array

        // Delete existing cards for this page and recreate
        await prisma.featureCard.deleteMany({ where: { page } });

        const created = await prisma.featureCard.createMany({
            data: cards.map((card: any, index: number) => ({
                page,
                title: card.title,
                description: card.description,
                icon: card.icon || null,
                sortOrder: index,
            })),
        });

        res.json({ count: created.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update feature cards.' });
    }
});

export default router;
