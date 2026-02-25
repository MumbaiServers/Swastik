import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/dashboard/stats — Admin: aggregated dashboard statistics
router.get('/stats', authenticate, async (_req: Request, res: Response) => {
    try {
        const [
            totalProjects,
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            totalFaqs,
            totalLocations,
            totalInquiries,
            newInquiries,
            totalMedia,
            totalReferrals,
        ] = await Promise.all([
            prisma.project.count({ where: { isActive: true } }),
            prisma.blog.count(),
            prisma.blog.count({ where: { status: 'published' } }),
            prisma.blog.count({ where: { status: 'draft' } }),
            prisma.fAQ.count({ where: { isActive: true } }),
            prisma.location.count({ where: { isActive: true } }),
            prisma.inquiry.count(),
            prisma.inquiry.count({ where: { status: 'new' } }),
            prisma.media.count(),
            prisma.loyaltySubmission.count(),
        ]);

        // Fetch activity logs with error handling to prevent whole dashboard failure
        let recentActivity: any[] = [];
        try {
            recentActivity = await prisma.activityLog.findMany({
                orderBy: { time: 'desc' },
                take: 20
            });

            // If logs are empty, auto-populate from existing data (backwards compatibility)
            if (recentActivity.length === 0) {
                const [recentProjects, recentBlogs, recentInquiries, recentFaqs, recentLoyalty] = await Promise.all([
                    prisma.project.findMany({ orderBy: { updatedAt: 'desc' }, take: 3, select: { name: true, updatedAt: true } }),
                    prisma.blog.findMany({ orderBy: { updatedAt: 'desc' }, take: 3, select: { title: true, updatedAt: true, status: true } }),
                    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 3, select: { name: true, createdAt: true } }),
                    prisma.fAQ.findMany({ orderBy: { updatedAt: 'desc' }, take: 3, select: { question: true, updatedAt: true } }),
                    prisma.loyaltySubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 3, select: { firstName: true, lastName: true, createdAt: true } }),
                ]);

                const initialLogs = [
                    ...recentProjects.map((p) => ({ type: 'project', label: `Project updated: ${p.name}`, time: p.updatedAt })),
                    ...recentBlogs.map((b) => ({ type: 'blog', label: `Blog ${b.status}: ${b.title}`, time: b.updatedAt })),
                    ...recentInquiries.map((i) => ({ type: 'inquiry', label: `New inquiry from ${i.name}`, time: i.createdAt })),
                    ...recentFaqs.map((f) => ({ type: 'faq', label: `FAQ updated: ${f.question.substring(0, 50)}...`, time: f.updatedAt })),
                    ...recentLoyalty.map((l) => ({ type: 'loyalty', label: `New referral from ${l.firstName} ${l.lastName}`, time: l.createdAt })),
                ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

                // Save these to the database if we want them to persist and be deletable
                if (initialLogs.length > 0) {
                    await prisma.activityLog.createMany({
                        data: initialLogs
                    });
                    recentActivity = await prisma.activityLog.findMany({
                        orderBy: { time: 'desc' },
                        take: 20
                    });
                }
            }
        } catch (activityError) {
            console.error('Failed to fetch or populate activity logs:', activityError);
            // We continue without activity logs so the main stats can still render
            recentActivity = [];
        }

        res.json({
            stats: {
                totalProjects,
                totalBlogs,
                publishedBlogs,
                draftBlogs,
                totalFaqs,
                totalLocations,
                totalInquiries,
                newInquiries,
                totalMedia,
                totalReferrals,
            },
            recentActivity,
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats.' });
    }
});

// DELETE /api/dashboard/activity/:id — Admin: delete an activity log entry
router.delete('/activity/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.activityLog.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Delete activity error:', error);
        res.status(500).json({ error: 'Failed to delete activity trace.' });
    }
});

export default router;

