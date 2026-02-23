import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { upload, getFileUrl, deleteFile } from '../middleware/upload';

const router = Router();

// GET /api/sections — Public: get all active sections
router.get('/', async (_req: Request, res: Response) => {
    try {
        const sections = await prisma.section.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ sections });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sections.' });
    }
});

// GET /api/sections/:key — Public: get a section by key
router.get('/:key', async (req: Request, res: Response) => {
    try {
        const section = await prisma.section.findUnique({
            where: { sectionKey: req.params.key },
        });
        if (!section) {
            res.status(404).json({ error: 'Section not found.' });
            return;
        }
        res.json({ section });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch section.' });
    }
});

// POST /api/sections — Admin: create a new section
router.post('/', authenticate, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { sectionKey, title, content, extraData, sortOrder } = req.body;
        const image = req.file ? getFileUrl(req.file) : null;

        const section = await prisma.section.create({
            data: {
                sectionKey,
                title,
                content,
                image,
                extraData: extraData || null,
                sortOrder: parseInt(sortOrder) || 0,
            },
        });

        res.status(201).json({ section });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create section.' });
    }
});

// PUT /api/sections/:key — Admin: update a section
router.put('/:key', authenticate, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { title, content, extraData, sortOrder, isActive } = req.body;

        const existing = await prisma.section.findUnique({
            where: { sectionKey: req.params.key },
        });

        if (!existing) {
            res.status(404).json({ error: 'Section not found.' });
            return;
        }

        // Delete old image if a new one is uploaded
        let image = existing.image;
        if (req.file) {
            if (existing.image) await deleteFile(existing.image);
            image = getFileUrl(req.file);
        }

        const section = await prisma.section.update({
            where: { sectionKey: req.params.key },
            data: {
                ...(title !== undefined && { title }),
                ...(content !== undefined && { content }),
                ...(image !== undefined && { image }),
                ...(extraData !== undefined && { extraData }),
                ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
                ...(isActive !== undefined && { isActive: isActive === 'true' || isActive === true }),
            },
        });

        res.json({ section });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update section.' });
    }
});

// DELETE /api/sections/:key — Admin: delete a section
router.delete('/:key', authenticate, async (req: Request, res: Response) => {
    try {
        const existing = await prisma.section.findUnique({
            where: { sectionKey: req.params.key },
        });

        if (!existing) {
            res.status(404).json({ error: 'Section not found.' });
            return;
        }

        if (existing.image) await deleteFile(existing.image);

        await prisma.section.delete({
            where: { sectionKey: req.params.key },
        });

        res.json({ message: 'Section deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete section.' });
    }
});

export default router;
