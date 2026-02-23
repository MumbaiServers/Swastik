import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { upload, getFileUrl, deleteFile } from '../middleware/upload';

const router = Router();

// GET /api/media — Admin: get all media files
router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const [media, total] = await Promise.all([
            prisma.media.findMany({
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip,
            }),
            prisma.media.count(),
        ]);

        res.json({
            media,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch media.' });
    }
});

// POST /api/media — Admin: upload media files
router.post('/', authenticate, upload.array('files', 10), async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ error: 'No files uploaded.' });
            return;
        }

        const mediaRecords = await Promise.all(
            files.map((file) =>
                prisma.media.create({
                    data: {
                        filename: file.filename || (file as any).key,
                        originalName: file.originalname,
                        mimeType: file.mimetype,
                        size: file.size,
                        url: getFileUrl(file),
                        uploadedBy: (req as any).userEmail || 'admin',
                    },
                })
            )
        );

        res.status(201).json({ media: mediaRecords });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload media.' });
    }
});

// DELETE /api/media/:id — Admin: delete a media file
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const media = await prisma.media.findUnique({ where: { id } });

        if (!media) {
            res.status(404).json({ error: 'Media not found.' });
            return;
        }

        await deleteFile(media.url);
        await prisma.media.delete({ where: { id } });

        res.json({ message: 'Media deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete media.' });
    }
});

export default router;
