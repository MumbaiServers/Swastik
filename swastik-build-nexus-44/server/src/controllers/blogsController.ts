import { Request, Response } from 'express';
import prisma from '../config/database';
import { getFileUrl, deleteFile } from '../middleware/upload';
import { logActivity } from '../utils/logger';

/**
 * Get all published blogs
 * @route GET /api/blogs
 */
export const getBlogs = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const where: any = status ? { status: status as string } : { status: 'published' };

        const blogs = await prisma.blog.findMany({
            where,
            orderBy: { publishDate: 'desc' },
        });

        res.json({ blogs });
    } catch (error) {
        console.error('Fetch blogs error:', error);
        res.status(500).json({ error: 'Failed to fetch blogs.' });
    }
};

/**
 * Get all blogs (for admin use)
 * @route GET /api/blogs/all
 */
export const getAllBlogs = async (_req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { updatedAt: 'desc' },
        });
        res.json({ blogs });
    } catch (error) {
        console.error('Fetch all blogs error:', error);
        res.status(500).json({ error: 'Failed to fetch blogs.' });
    }
};

/**
 * Get a single blog by slug
 * @route GET /api/blogs/:slug
 */
export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: { slug: req.params.slug },
        });

        if (!blog) {
            res.status(404).json({ error: 'Blog not found.' });
            return;
        }

        // Increment view count
        await prisma.blog.update({
            where: { slug: req.params.slug },
            data: { views: { increment: 1 } },
        });

        res.json({ blog });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog.' });
    }
};

/**
 * Create a new blog
 * @route POST /api/blogs
 */
export const createBlog = async (req: Request, res: Response) => {
    try {
        const { slug, title, excerpt, content, author, status, publishDate } = req.body;
        const image = req.file ? getFileUrl(req.file) : null;

        const blog = await prisma.blog.create({
            data: {
                slug,
                title,
                excerpt,
                content,
                image,
                author: author || 'Admin',
                status: status || 'draft',
                publishDate: publishDate ? new Date(publishDate) : null,
            },
        });

        await logActivity('blog', `New blog ${blog.status}: ${blog.title}`);

        res.status(201).json({ blog });
    } catch (error: any) {
        console.error("Blog creation error:", error);
        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return res.status(400).json({ error: 'This URL slug is already in use by another blog. Please customize the slug to make it unique.' });
        }
        res.status(500).json({ error: 'Failed to create blog.', details: error instanceof Error ? error.message : String(error) });
    }
};

/**
 * Update an existing blog
 * @route PUT /api/blogs/:id
 */
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const existing = await prisma.blog.findUnique({ where: { id } });

        if (!existing) {
            res.status(404).json({ error: 'Blog not found.' });
            return;
        }

        let image = existing.image;
        if (req.file) {
            if (existing.image) await deleteFile(existing.image);
            image = getFileUrl(req.file);
        }

        const { slug, title, excerpt, content, author, status, publishDate } = req.body;

        const blog = await prisma.blog.update({
            where: { id },
            data: {
                ...(slug !== undefined && { slug }),
                ...(title !== undefined && { title }),
                ...(excerpt !== undefined && { excerpt }),
                ...(content !== undefined && { content }),
                ...(image !== undefined && { image }),
                ...(author !== undefined && { author }),
                ...(status !== undefined && { status }),
                ...(publishDate !== undefined && { publishDate: publishDate ? new Date(publishDate) : null }),
            },
        });

        await logActivity('blog', `Blog ${blog.status}: ${blog.title}`);

        res.json({ blog });
    } catch (error: any) {
        console.error("Blog update error:", error);
        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return res.status(400).json({ error: 'This URL slug is already in use by another blog. Please customize the slug to make it unique.' });
        }
        res.status(500).json({ error: 'Failed to update blog.', details: error instanceof Error ? error.message : String(error) });
    }
};

/**
 * Delete a blog
 * @route DELETE /api/blogs/:id
 */
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const existing = await prisma.blog.findUnique({ where: { id } });

        if (!existing) {
            res.status(404).json({ error: 'Blog not found.' });
            return;
        }

        if (existing.image) await deleteFile(existing.image);
        await prisma.blog.delete({ where: { id } });

        await logActivity('blog', `Blog deleted: ${existing.title}`);

        res.json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog.' });
    }
};
