import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { upload, getFileUrl, deleteFile } from '../middleware/upload';

const router = Router();

// GET /api/values-vision-mission — Public: get all active values/vision/mission
router.get('/', async (_req: Request, res: Response) => {
    try {
        const items = await prisma.valueVisionMission.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch values, vision & mission.' });
    }
});

// PUT /api/values-vision-mission — Admin: bulk update all items
router.put('/', authenticate, upload.fields([
    { name: 'values_image', maxCount: 1 },
    { name: 'vision_image', maxCount: 1 },
    { name: 'mission_image', maxCount: 1 },
]), async (req: Request, res: Response) => {
    try {
        const { items } = req.body; // JSON string of array [{ type, title, content }]
        const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        // Process each item
        for (const item of parsedItems) {
            const imageField = `${item.type}_image`;
            let image: string | null = null;

            if (files[imageField]?.[0]) {
                image = getFileUrl(files[imageField][0]);
            }

            // Find existing record
            const existing = await prisma.valueVisionMission.findFirst({
                where: { type: item.type },
            });

            if (existing) {
                // Delete old image if new one uploaded
                if (image && existing.image) await deleteFile(existing.image);

                await prisma.valueVisionMission.update({
                    where: { id: existing.id },
                    data: {
                        title: item.title,
                        content: item.content,
                        ...(image && { image }),
                    },
                });
            } else {
                await prisma.valueVisionMission.create({
                    data: {
                        type: item.type,
                        title: item.title,
                        content: item.content,
                        image,
                        sortOrder: item.sortOrder || 0,
                    },
                });
            }
        }

        const updated = await prisma.valueVisionMission.findMany({
            orderBy: { sortOrder: 'asc' },
        });

        res.json({ items: updated });
    } catch (error) {
        console.error('VVM update error:', error);
        res.status(500).json({ error: 'Failed to update values, vision & mission.' });
    }
});

export default router;
