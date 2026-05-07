import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export const getCustomPages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pages = await prisma.customPage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ pages });
    } catch (error) {
        next(error);
    }
};

export const getCustomPageBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const page = await prisma.customPage.findUnique({
            where: { slug }
        });

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        res.json({ page });
    } catch (error) {
        next(error);
    }
};

export const createCustomPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, isActive } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const slug = slugify(title, { lower: true, strict: true });

        // Check if slug already exists
        const existingPage = await prisma.customPage.findUnique({
            where: { slug }
        });

        let finalSlug = slug;
        if (existingPage) {
            finalSlug = `${slug}-${Date.now()}`;
        }

        const page = await prisma.customPage.create({
            data: {
                title,
                content,
                slug: finalSlug,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        res.status(201).json({ message: 'Page created successfully', page });
    } catch (error) {
        next(error);
    }
};

export const updateCustomPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, content, isActive } = req.body;

        const existingPage = await prisma.customPage.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingPage) {
            return res.status(404).json({ message: 'Page not found' });
        }

        const data: any = {};
        if (title) {
            data.title = title;
            data.slug = slugify(title, { lower: true, strict: true });
            
            // Check if new slug conflicts with another page
            const conflict = await prisma.customPage.findFirst({
                where: {
                    slug: data.slug,
                    id: { not: parseInt(id) }
                }
            });
            if (conflict) {
                data.slug = `${data.slug}-${Date.now()}`;
            }
        }
        if (content !== undefined) data.content = content;
        if (isActive !== undefined) data.isActive = isActive;

        const page = await prisma.customPage.update({
            where: { id: parseInt(id) },
            data
        });

        res.json({ message: 'Page updated successfully', page });
    } catch (error) {
        next(error);
    }
};

export const deleteCustomPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.customPage.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Page deleted successfully' });
    } catch (error) {
        next(error);
    }
};
