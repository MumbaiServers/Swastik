import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { upload, getFileUrl, deleteFile } from '../middleware/upload';

const router = Router();

// GET /api/hero-banners — Public: get active banner
router.get('/', async (_req: Request, res: Response) => {
    try {
        const banner = await prisma.heroBanner.findFirst({
            where: { isActive: true },
            orderBy: { updatedAt: 'desc' },
        });
        res.json({ banner });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hero banner.' });
    }
});

// PUT /api/hero-banners — Admin: update or create hero banner
router.put('/', authenticate, upload.fields([
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'image2560', maxCount: 1 },
    { name: 'image1920', maxCount: 1 },
    { name: 'image1536', maxCount: 1 },
    { name: 'imageMobile', maxCount: 1 },
]), async (req: Request, res: Response) => {
    try {
        const { heading, subtext } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

        const existing = await prisma.heroBanner.findFirst({
            where: { isActive: true },
            orderBy: { updatedAt: 'desc' },
        });

        let backgroundImage = existing?.backgroundImage || null;
        let image2560 = existing?.image2560 || null;
        let image1920 = existing?.image1920 || null;
        let image1536 = existing?.image1536 || null;
        let imageMobile = existing?.imageMobile || null;

        if (files) {
            if (files['backgroundImage']) {
                if (existing?.backgroundImage) await deleteFile(existing.backgroundImage);
                backgroundImage = getFileUrl(files['backgroundImage'][0]);
            }
            if (files['image2560']) {
                if (existing?.image2560) await deleteFile(existing.image2560);
                image2560 = getFileUrl(files['image2560'][0]);
            }
            if (files['image1920']) {
                if (existing?.image1920) await deleteFile(existing.image1920);
                image1920 = getFileUrl(files['image1920'][0]);
            }
            if (files['image1536']) {
                if (existing?.image1536) await deleteFile(existing.image1536);
                image1536 = getFileUrl(files['image1536'][0]);
            }
            if (files['imageMobile']) {
                if (existing?.imageMobile) await deleteFile(existing.imageMobile);
                imageMobile = getFileUrl(files['imageMobile'][0]);
            }
        }

        const dataUpdate = {
            ...(heading !== undefined && { heading }),
            ...(subtext !== undefined && { subtext }),
            ...(backgroundImage !== null && { backgroundImage }),
            ...(image2560 !== null && { image2560 }),
            ...(image1920 !== null && { image1920 }),
            ...(image1536 !== null && { image1536 }),
            ...(imageMobile !== null && { imageMobile }),
        };

        let banner;
        if (existing) {
            banner = await prisma.heroBanner.update({
                where: { id: existing.id },
                data: dataUpdate,
            });
        } else {
            banner = await prisma.heroBanner.create({
                data: {
                    heading: heading || 'Find Your Dream Home Today',
                    subtext: subtext || 'Discover premium residential properties',
                    ...dataUpdate
                },
            });
        }

        res.json({ banner });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update hero banner.' });
    }
});

export default router;
