import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/statistics — Public: get all active statistics
router.get('/', async (_req: Request, res: Response) => {
    try {
        const statistics = await prisma.statistic.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ statistics });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics.' });
    }
});

// PUT /api/statistics — Admin: bulk update all statistics
router.put('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { statistics } = req.body; // Array of { key, label, value, suffix }

        // Use a transaction for atomicity
        const result = await prisma.$transaction(
            statistics.map((stat: any) =>
                prisma.statistic.upsert({
                    where: { key: stat.key },
                    update: {
                        label: stat.label,
                        value: stat.value,
                        suffix: stat.suffix || null,
                        sortOrder: stat.sortOrder || 0,
                    },
                    create: {
                        key: stat.key,
                        label: stat.label,
                        value: stat.value,
                        suffix: stat.suffix || null,
                        sortOrder: stat.sortOrder || 0,
                    },
                })
            )
        );

        res.json({ statistics: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update statistics.' });
    }
});

// DELETE /api/statistics/:id — Admin: delete a statistic
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.statistic.delete({ where: { id } });
        res.json({ message: 'Statistic deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete statistic.' });
    }
});

export default router;
