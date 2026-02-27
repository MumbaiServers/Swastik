import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { logActivity } from '../utils/logger';

const router = Router();

// GET /api/locations — Public: get all active locations
router.get('/', async (_req: Request, res: Response) => {
    try {
        const locations = await prisma.location.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ locations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch locations.' });
    }
});

// PUT /api/locations — Admin: bulk update locations
router.put('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { locations } = req.body; // Array of { name, address, mapUrl }

        await prisma.location.deleteMany({});

        const created = await prisma.location.createMany({
            data: locations.map((loc: any, index: number) => ({
                name: loc.name,
                address: loc.address || null,
                mapUrl: loc.mapUrl || null,
                sortOrder: index,
            })),
        });

        await logActivity('location', 'Project locations updated');

        res.json({ count: created.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update locations.' });
    }
});

// POST /api/locations — Admin: add a single location
router.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { name, address, mapUrl, sortOrder } = req.body;

        const location = await prisma.location.create({
            data: {
                name,
                address: address || null,
                mapUrl: mapUrl || null,
                sortOrder: parseInt(sortOrder) || 0,
            },
        });

        await logActivity('location', `New location added: ${name}`);

        res.status(201).json({ location });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create location.' });
    }
});

// DELETE /api/locations/:id — Admin: delete a location
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const location = await prisma.location.findUnique({ where: { id } });
        await prisma.location.delete({ where: { id } });
        await logActivity('location', `Location deleted: ${location?.name || 'Unknown'}`);
        res.json({ message: 'Location deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete location.' });
    }
});

export default router;
