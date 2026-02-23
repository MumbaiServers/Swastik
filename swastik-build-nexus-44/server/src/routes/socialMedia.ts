import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { upload, getFileUrl, deleteFile } from '../middleware/upload';

const router = Router();

// ─── Social Media Links (Existing) ───────────────────────

// GET /api/social-media — Public: get all active social media links
router.get('/', async (_req: Request, res: Response) => {
    try {
        const links = await prisma.socialMediaLink.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ links });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch social media links.' });
    }
});

// PUT /api/social-media — Admin: bulk update social media links
router.put('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { links } = req.body; // Array of { platform, url, icon }

        await prisma.socialMediaLink.deleteMany({});

        const created = await prisma.socialMediaLink.createMany({
            data: links.map((link: any, index: number) => ({
                platform: link.platform,
                url: link.url,
                icon: link.icon || null,
                sortOrder: index,
            })),
        });

        res.json({ count: created.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update social media links.' });
    }
});

// ─── Social Media Posts (The Grid) ───────────────────────

// GET /api/social-media/posts — Public: get all active social media posts
router.get('/posts', async (_req: Request, res: Response) => {
    try {
        const posts = await prisma.socialMediaPost.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch social media posts.' });
    }
});

// GET /api/social-media/posts/all — Admin: get all posts
router.get('/posts/all', authenticate, async (_req: Request, res: Response) => {
    try {
        const posts = await prisma.socialMediaPost.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch social media posts.' });
    }
});

// POST /api/social-media/posts — Admin: create a post
router.post('/posts', authenticate, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { alt, link, platform, sortOrder } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required.' });
        }

        const post = await prisma.socialMediaPost.create({
            data: {
                image: getFileUrl(req.file),
                alt: alt || null,
                link: link || null,
                platform: platform || 'instagram',
                sortOrder: sortOrder ? parseInt(sortOrder) : 0,
            },
        });

        res.status(201).json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create social media post.' });
    }
});

// PUT /api/social-media/posts/:id — Admin: update a post
router.put('/posts/:id', authenticate, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { alt, link, platform, sortOrder, isActive } = req.body;

        const existing = await prisma.socialMediaPost.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ error: 'Post not found.' });

        let image = existing.image;
        if (req.file) {
            await deleteFile(existing.image);
            image = getFileUrl(req.file);
        }

        const post = await prisma.socialMediaPost.update({
            where: { id },
            data: {
                image,
                alt: alt !== undefined ? alt : existing.alt,
                link: link !== undefined ? link : existing.link,
                platform: platform || existing.platform,
                sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : existing.sortOrder,
                isActive: isActive !== undefined ? isActive === 'true' || isActive === true : existing.isActive,
            },
        });

        res.json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update social media post.' });
    }
});

// DELETE /api/social-media/posts/:id — Admin: delete a post
router.delete('/posts/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const existing = await prisma.socialMediaPost.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ error: 'Post not found.' });

        await deleteFile(existing.image);
        await prisma.socialMediaPost.delete({ where: { id } });

        res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete social media post.' });
    }
});

export default router;
