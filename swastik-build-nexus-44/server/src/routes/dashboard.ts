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

        // Recent activity — last 10 items across models
        const [recentProjects, recentBlogs, recentInquiries, recentFaqs, recentLoyalty] = await Promise.all([
            prisma.project.findMany({ orderBy: { updatedAt: 'desc' }, take: 3, select: { id: true, name: true, updatedAt: true } }),
            prisma.blog.findMany({ orderBy: { updatedAt: 'desc' }, take: 3, select: { id: true, title: true, updatedAt: true, status: true } }),
            prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 3, select: { id: true, name: true, createdAt: true, status: true } }),
            prisma.fAQ.findMany({ orderBy: { updatedAt: 'desc' }, take: 3, select: { id: true, question: true, updatedAt: true } }),
            prisma.loyaltySubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 3, select: { id: true, firstName: true, lastName: true, createdAt: true } }),
        ]);

        // Merge and sort recent activity
        const recentActivity = [
            ...recentProjects.map((p) => ({ type: 'project', label: `Project updated: ${p.name}`, time: p.updatedAt })),
            ...recentBlogs.map((b) => ({ type: 'blog', label: `Blog ${b.status}: ${b.title}`, time: b.updatedAt })),
            ...recentInquiries.map((i) => ({ type: 'inquiry', label: `New inquiry from ${i.name}`, time: i.createdAt })),
            ...recentFaqs.map((f) => ({ type: 'faq', label: `FAQ updated: ${f.question.substring(0, 50)}...`, time: f.updatedAt })),
            ...recentLoyalty.map((l) => ({ type: 'loyalty', label: `New referral from ${l.firstName} ${l.lastName}`, time: l.createdAt })),
        ]
            .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
            .slice(0, 8);

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

export default router;
