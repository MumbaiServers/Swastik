import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';
import * as projectsController from '../controllers/projectsController';

const router = Router();

// GET /api/projects — Public: get all active projects
router.get('/', projectsController.getProjects);

// GET /api/projects/:slug — Public: get a project by slug
router.get('/:slug', projectsController.getProjectBySlug);

// POST /api/projects — Admin: create a project
router.post('/', authenticate, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'mahareraQr', maxCount: 1 },
    { name: 'floorPlanImage', maxCount: 1 },
    { name: 'aboutDeveloperImage', maxCount: 1 }
]), projectsController.createProject);

// PUT /api/projects/:id — Admin: update a project
router.put('/:id', authenticate, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'mahareraQr', maxCount: 1 },
    { name: 'floorPlanImage', maxCount: 1 },
    { name: 'aboutDeveloperImage', maxCount: 1 }
]), projectsController.updateProject);

// DELETE /api/projects/:id — Admin: delete a project
router.delete('/:id', authenticate, projectsController.deleteProject);

// ─── Project Configurations ──────────────────────────────
router.post('/:id/configurations', authenticate, projectsController.updateConfigurations);

// ─── Project Amenities ───────────────────────────────────
router.post('/:id/amenities', authenticate, projectsController.updateAmenities);

// ─── Project Connectivities ─────────────────────────────
router.post('/:id/connectivities', authenticate, projectsController.updateConnectivities);

// ─── Project Gallery ─────────────────────────────────────
router.post('/:id/gallery', authenticate, upload.array('images', 20), projectsController.uploadGalleryImages);
router.delete('/:id/gallery/:imageId', authenticate, projectsController.deleteGalleryImage);

export default router;

