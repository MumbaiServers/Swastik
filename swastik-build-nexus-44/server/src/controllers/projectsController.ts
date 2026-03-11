import { Request, Response } from 'express';
import prisma from '../config/database';
import { getFileUrl, deleteFile } from '../middleware/upload';
import { logActivity } from '../utils/logger';

/**
 * Get all active projects
 * @route GET /api/projects
 */
export const getProjects = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const where: any = { isActive: true };
        if (status) where.status = status as string;

        const projects = await prisma.project.findMany({
            where,
            include: {
                configurations: { orderBy: { sortOrder: 'asc' } },
                amenities: { orderBy: { sortOrder: 'asc' } },
                connectivities: { orderBy: { sortOrder: 'asc' } },
                gallery: { orderBy: { sortOrder: 'asc' } },
            },
            orderBy: { sortOrder: 'asc' },
        });

        res.json({ projects });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects.' });
    }
};

/**
 * Get a single project by slug
 * @route GET /api/projects/:slug
 */
export const getProjectBySlug = async (req: Request, res: Response) => {
    try {
        const project = await prisma.project.findUnique({
            where: { slug: req.params.slug },
            include: {
                configurations: { orderBy: { sortOrder: 'asc' } },
                amenities: { orderBy: { sortOrder: 'asc' } },
                connectivities: { orderBy: { sortOrder: 'asc' } },
                gallery: { orderBy: { sortOrder: 'asc' } },
            },
        });

        if (!project) {
            res.status(404).json({ error: 'Project not found.' });
            return;
        }

        res.json({ project });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project.' });
    }
};

/**
 * Create a new project
 * @route POST /api/projects
 */
export const createProject = async (req: Request, res: Response) => {
    try {
        const {
            slug, name, subtitle, location, price,
            description, fullDescription, configuration,
            status, tag, maharera, mahareraUrl, financeBy, disclaimer,
            sortOrder, googleMapsUrl, connectivitiesDescription,
            aboutDeveloperText, towerType, wingDetails,
        } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const image = files['image'] ? getFileUrl(files['image'][0]) : null;
        const mahareraQr = files['mahareraQr'] ? getFileUrl(files['mahareraQr'][0]) : null;
        const floorPlanImage = files['floorPlanImage'] ? JSON.stringify(files['floorPlanImage'].map(f => getFileUrl(f))) : null;
        const aboutDeveloperImage = files['aboutDeveloperImage'] ? getFileUrl(files['aboutDeveloperImage'][0]) : null;
        const overviewImage = files['overviewImage'] ? getFileUrl(files['overviewImage'][0]) : null;
        const connectivitiesImage = files['connectivitiesImage'] ? getFileUrl(files['connectivitiesImage'][0]) : null;
        const amenitiesImage = files['amenitiesImage'] ? getFileUrl(files['amenitiesImage'][0]) : null;

        const project = await prisma.project.create({
            data: {
                slug,
                name,
                subtitle: subtitle || null,
                location,
                price: price || null,
                image,
                overviewImage,
                connectivitiesImage,
                amenitiesImage,
                floorPlanImage,
                aboutDeveloperImage,
                description,
                fullDescription: fullDescription || null,
                configuration: configuration || null,
                status: status || 'ongoing',
                tag: tag || null,
                maharera: maharera || null,
                mahareraQr: mahareraQr || null,
                mahareraUrl: mahareraUrl || null,
                financeBy: financeBy || null,
                disclaimer: disclaimer || null,
                googleMapsUrl: googleMapsUrl || null,
                connectivitiesDescription: connectivitiesDescription || null,
                aboutDeveloperText: aboutDeveloperText || null,
                towerType: towerType || 'single',
                wingDetails: wingDetails || null,
                sortOrder: parseInt(sortOrder) || 0,
            },
        });

        await logActivity('project', `New project created: ${name}`);

        res.status(201).json({ project });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Failed to create project.' });
    }
};

/**
 * Update project details
 * @route PUT /api/projects/:id
 */
export const updateProject = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const existing = await prisma.project.findUnique({ where: { id } });

        if (!existing) {
            res.status(404).json({ error: 'Project not found.' });
            return;
        }

        let image = existing.image;
        let mahareraQr = existing.mahareraQr;
        let floorPlanImage = existing.floorPlanImage;
        let aboutDeveloperImage = existing.aboutDeveloperImage;
        let overviewImage = existing.overviewImage;
        let connectivitiesImage = existing.connectivitiesImage;
        let amenitiesImage = existing.amenitiesImage;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files && files['image']) {
            if (existing.image) await deleteFile(existing.image);
            image = getFileUrl(files['image'][0]);
        }

        if (files && files['mahareraQr']) {
            if (existing.mahareraQr) await deleteFile(existing.mahareraQr);
            mahareraQr = getFileUrl(files['mahareraQr'][0]);
        }

        const { existingFloorPlans } = req.body;
        if (existingFloorPlans !== undefined) {
            // If the client sends an updated list of existing floor plans to keep
            try {
                let keptUrls: string[] = [];
                try {
                    const parsed = JSON.parse(existingFloorPlans);
                    keptUrls = Array.isArray(parsed) ? parsed : [existingFloorPlans];
                } catch {
                    keptUrls = [existingFloorPlans];
                }

                // Identify what to delete
                let currentUrls: string[] = [];
                if (existing.floorPlanImage) {
                    try {
                        const parsed = JSON.parse(existing.floorPlanImage);
                        currentUrls = Array.isArray(parsed) ? parsed : [existing.floorPlanImage];
                    } catch {
                        currentUrls = [existing.floorPlanImage];
                    }
                }

                const toDelete = currentUrls.filter(url => !keptUrls.includes(url));
                for (const url of toDelete) {
                    if (url) await deleteFile(url);
                }

                let newUrls: string[] = [];
                if (files && files['floorPlanImage']) {
                    newUrls = files['floorPlanImage'].map(f => getFileUrl(f));
                }

                const combined = [...keptUrls.filter(Boolean), ...newUrls.filter(Boolean)];
                floorPlanImage = combined.length > 0 ? JSON.stringify(combined) : null;
            } catch (e) {
                console.error("Failed to parse existing floor plans");
            }
        } else if (files && files['floorPlanImage']) {
            // Legacy overwrite behavior if no existingFloorPlans field is provided
            if (existing.floorPlanImage) {
                try {
                    const oldImages = JSON.parse(existing.floorPlanImage);
                    if (Array.isArray(oldImages)) {
                        for (const img of oldImages) await deleteFile(img);
                    } else {
                        await deleteFile(existing.floorPlanImage);
                    }
                } catch (e) {
                    await deleteFile(existing.floorPlanImage);
                }
            }
            floorPlanImage = JSON.stringify(files['floorPlanImage'].map(f => getFileUrl(f)));
        }

        if (files && files['aboutDeveloperImage']) {
            if (existing.aboutDeveloperImage) await deleteFile(existing.aboutDeveloperImage);
            aboutDeveloperImage = getFileUrl(files['aboutDeveloperImage'][0]);
        }

        if (files && files['overviewImage']) {
            if (existing.overviewImage) await deleteFile(existing.overviewImage);
            overviewImage = getFileUrl(files['overviewImage'][0]);
        }

        if (files && files['connectivitiesImage']) {
            if (existing.connectivitiesImage) await deleteFile(existing.connectivitiesImage);
            connectivitiesImage = getFileUrl(files['connectivitiesImage'][0]);
        }

        if (files && files['amenitiesImage']) {
            if (existing.amenitiesImage) await deleteFile(existing.amenitiesImage);
            amenitiesImage = getFileUrl(files['amenitiesImage'][0]);
        }

        const {
            slug, name, subtitle, location, price,
            description, fullDescription, configuration,
            status, tag, maharera, mahareraUrl, financeBy, disclaimer,
            sortOrder, isActive, googleMapsUrl, connectivitiesDescription,
            aboutDeveloperText, towerType, wingDetails,
        } = req.body;

        const project = await prisma.project.update({
            where: { id },
            data: {
                ...(slug !== undefined && { slug }),
                ...(name !== undefined && { name }),
                ...(subtitle !== undefined && { subtitle }),
                ...(location !== undefined && { location }),
                ...(price !== undefined && { price }),
                ...(image !== undefined && { image }),
                ...(description !== undefined && { description }),
                ...(fullDescription !== undefined && { fullDescription }),
                ...(configuration !== undefined && { configuration }),
                ...(status !== undefined && { status }),
                ...(tag !== undefined && { tag }),
                ...(maharera !== undefined && { maharera }),
                ...(mahareraQr !== undefined && { mahareraQr }),
                ...(mahareraUrl !== undefined && { mahareraUrl }),
                ...(financeBy !== undefined && { financeBy }),
                ...(disclaimer !== undefined && { disclaimer }),
                ...(googleMapsUrl !== undefined && { googleMapsUrl }),
                ...(connectivitiesDescription !== undefined && { connectivitiesDescription }),
                ...(aboutDeveloperText !== undefined && { aboutDeveloperText }),
                ...(aboutDeveloperImage !== undefined && { aboutDeveloperImage }),
                ...(overviewImage !== undefined && { overviewImage }),
                ...(connectivitiesImage !== undefined && { connectivitiesImage }),
                ...(amenitiesImage !== undefined && { amenitiesImage }),
                ...(floorPlanImage !== undefined && { floorPlanImage }),
                ...(towerType !== undefined && { towerType }),
                ...(wingDetails !== undefined && { wingDetails }),
                ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
                ...(isActive !== undefined && { isActive: isActive === 'true' || isActive === true }),
            },
        });

        await logActivity('project', `Project updated: ${project.name}`);

        res.json({ project });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Failed to update project.' });
    }
};

/**
 * Delete a project
 * @route DELETE /api/projects/:id
 */
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const existing = await prisma.project.findUnique({ where: { id } });

        if (!existing) {
            res.status(404).json({ error: 'Project not found.' });
            return;
        }

        if (existing.image) await deleteFile(existing.image);
        if (existing.mahareraQr) await deleteFile(existing.mahareraQr);
        if (existing.floorPlanImage) {
            try {
                const oldImages = JSON.parse(existing.floorPlanImage);
                if (Array.isArray(oldImages)) {
                    for (const img of oldImages) await deleteFile(img);
                } else {
                    await deleteFile(existing.floorPlanImage);
                }
            } catch (e) {
                await deleteFile(existing.floorPlanImage);
            }
        }
        if (existing.overviewImage) await deleteFile(existing.overviewImage);
        if (existing.connectivitiesImage) await deleteFile(existing.connectivitiesImage);
        if (existing.amenitiesImage) await deleteFile(existing.amenitiesImage);

        await prisma.project.delete({ where: { id } });

        await logActivity('project', `Project deleted: ${existing.name}`);

        res.json({ message: 'Project deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project.' });
    }
};

/**
 * Update project configurations
 * @route POST /api/projects/:id/configurations
 */
export const updateConfigurations = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        const { configurations } = req.body;

        await prisma.projectConfiguration.deleteMany({ where: { projectId } });

        const created = await prisma.projectConfiguration.createMany({
            data: configurations.map((config: any, index: number) => ({
                projectId,
                type: config.type,
                area: config.area,
                price: config.price,
                image: config.image || null,
                wingName: config.wingName || null,
                sortOrder: index,
            })),
        });

        res.json({ count: created.count });
    } catch (error) {
        console.error('Update configurations error:', error);
        res.status(500).json({ error: 'Failed to update configurations.' });
    }
};

/**
 * Update project amenities
 * @route POST /api/projects/:id/amenities
 */
export const updateAmenities = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        const { amenities } = req.body;

        await prisma.projectAmenity.deleteMany({ where: { projectId } });

        const created = await prisma.projectAmenity.createMany({
            data: amenities.map((amenity: any, index: number) => ({
                projectId,
                name: amenity.name,
                category: amenity.category || 'podium',
                sortOrder: index,
            })),
        });

        res.json({ count: created.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update amenities.' });
    }
};

/**
 * Update project connectivities
 * @route POST /api/projects/:id/connectivities
 */
export const updateConnectivities = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        const { connectivities } = req.body;

        await prisma.projectConnectivity.deleteMany({ where: { projectId } });

        const created = await prisma.projectConnectivity.createMany({
            data: connectivities.map((conn: any, index: number) => ({
                projectId,
                text: conn.text,
                sortOrder: index,
            })),
        });

        res.json({ count: created.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update connectivities.' });
    }
};

/**
 * Bulk upload gallery images
 * @route POST /api/projects/:id/gallery
 */
export const uploadGalleryImages = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ error: 'No images uploaded.' });
            return;
        }

        const created = await prisma.projectGalleryImage.createMany({
            data: files.map((file, index) => ({
                projectId,
                imageUrl: getFileUrl(file),
                sortOrder: index,
            })),
        });

        res.json({ count: created.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload gallery images.' });
    }
};

/**
 * Delete a specific gallery image
 * @route DELETE /api/projects/:id/gallery/:imageId
 */
export const deleteGalleryImage = async (req: Request, res: Response) => {
    try {
        const imageId = parseInt(req.params.imageId);
        const image = await prisma.projectGalleryImage.findUnique({ where: { id: imageId } });

        if (!image) {
            res.status(404).json({ error: 'Image not found.' });
            return;
        }

        await deleteFile(image.imageUrl);
        await prisma.projectGalleryImage.delete({ where: { id: imageId } });

        res.json({ message: 'Gallery image deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete gallery image.' });
    }
};
