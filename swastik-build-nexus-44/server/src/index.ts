import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import path from 'path';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth';
import sectionRoutes from './routes/sections';
import heroBannerRoutes from './routes/heroBanners';
import projectRoutes from './routes/projects';
import blogRoutes from './routes/blogs';
import faqRoutes from './routes/faqs';
import statisticRoutes from './routes/statistics';
import socialMediaRoutes from './routes/socialMedia';
import locationRoutes from './routes/locations';
import mediaRoutes from './routes/media';
import inquiryRoutes from './routes/inquiries';
import featureCardRoutes from './routes/featureCards';
import valuesVisionMissionRoutes from './routes/valuesVisionMission';
import dashboardRoutes from './routes/dashboard';
import loyaltyRoutes from './routes/loyalty';
import customPagesRoutes from './routes/customPages';

// Middleware
import { errorHandler } from './middleware/errorHandler';


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 5001;

// ─── Middleware ──────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

// ─── API Routes ─────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/hero-banners', heroBannerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/statistics', statisticRoutes);
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/feature-cards', featureCardRoutes);
app.use('/api/values-vision-mission', valuesVisionMissionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/custom-pages', customPagesRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error Handler ──────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        app.listen(Number(PORT), '0.0.0.0', () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🔄 SIGTERM received. Shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});

export { prisma };
export default app;
