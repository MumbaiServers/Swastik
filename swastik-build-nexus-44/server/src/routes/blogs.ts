import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';
import * as blogsController from '../controllers/blogsController';

const router = Router();

// GET /api/blogs — Public: get published blogs
router.get('/', blogsController.getBlogs);

// GET /api/blogs/all — Admin: get all blogs (including drafts)
router.get('/all', authenticate, blogsController.getAllBlogs);

// GET /api/blogs/:slug — Public: get a single blog
router.get('/:slug', blogsController.getBlogBySlug);

// POST /api/blogs — Admin: create a blog
router.post('/', authenticate, upload.single('image'), blogsController.createBlog);

// PUT /api/blogs/:id — Admin: update a blog
router.put('/:id', upload.single('image'), blogsController.updateBlog);

// DELETE /api/blogs/:id — Admin: delete a blog
router.delete('/:id', authenticate, blogsController.deleteBlog);

export default router;

