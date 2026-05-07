import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as customPagesController from '../controllers/customPagesController';

const router = Router();

// Public routes
router.get('/', customPagesController.getCustomPages);
router.get('/:slug', customPagesController.getCustomPageBySlug);

// Admin routes
router.post('/', authenticate, customPagesController.createCustomPage);
router.put('/:id', authenticate, customPagesController.updateCustomPage);
router.delete('/:id', authenticate, customPagesController.deleteCustomPage);

export default router;
