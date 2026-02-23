import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as authController from '../controllers/authController';

const router = Router();

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/register (protected — only admins can create new admins)
router.post('/register', authenticate, authController.register);

// GET /api/auth/me (get current user info)
router.get('/me', authenticate, authController.getMe);

// PUT /api/auth/change-password
router.put('/change-password', authenticate, authController.changePassword);

export default router;

