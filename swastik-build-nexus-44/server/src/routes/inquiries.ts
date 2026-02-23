import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as inquiryController from '../controllers/inquiryController';

const router = Router();

// GET /api/inquiries — Admin: get all inquiries with pagination
router.get('/', authenticate, inquiryController.getInquiries);

// POST /api/inquiries — Public: submit a new inquiry
router.post('/', inquiryController.submitInquiry);

// PUT /api/inquiries/:id/status — Admin: update inquiry status
router.put('/:id/status', authenticate, inquiryController.updateStatus);

// DELETE /api/inquiries/:id — Admin: delete inquiry
router.delete('/:id', authenticate, inquiryController.deleteInquiry);

// GET /api/inquiries/stats — Admin: get inquiry statistics
router.get('/stats', authenticate, inquiryController.getStats);

export default router;

