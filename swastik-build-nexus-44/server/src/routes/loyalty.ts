import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { authenticate } from '../middleware/auth';
import { logActivity } from '../utils/logger';

const router = Router();

// GET /api/loyalty — Admin: get all loyalty submissions
router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const submissions = await prisma.loyaltySubmission.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ submissions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch loyalty submissions.' });
    }
});

// POST /api/loyalty — Public: submit a new loyalty form
router.post('/', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, contactNumber, email, refereeName, refereeContact, preferredUnit } = req.body;

        if (!firstName || !lastName || !contactNumber || !refereeName || !refereeContact) {
            res.status(400).json({ error: 'Required fields are missing.' });
            return;
        }

        const submission = await prisma.loyaltySubmission.create({
            data: {
                firstName,
                lastName,
                contactNumber,
                email: email || '',
                refereeName,
                refereeContact,
                preferredUnit: preferredUnit || '',
                status: 'pending'
            },
        });

        await logActivity('loyalty', `New referral from ${firstName} ${lastName}`);

        res.status(201).json({ submission });
    } catch (error) {
        console.error('Loyalty submission error:', error);
        res.status(500).json({ error: 'Failed to submit loyalty form.' });
    }
});

// DELETE /api/loyalty/:id — Admin: delete submission
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.loyaltySubmission.delete({ where: { id } });
        res.json({ message: 'Submission deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete submission.' });
    }
});

export default router;
