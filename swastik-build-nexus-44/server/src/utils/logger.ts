import prisma from '../config/database';

/**
 * Log an activity to the dashboard
 */
export const logActivity = async (type: string, label: string) => {
    try {
        await prisma.activityLog.create({
            data: {
                type,
                label,
                time: new Date(),
            },
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};
