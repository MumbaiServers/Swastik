import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft, Save, Loader2, Plus, Trash2, Upload,
    Building2, MapPin, Settings2, Image, ListChecks, Route, X, User
} from 'lucide-react';
import { toast } from 'sonner';
import { projectsApi, getImageUrl } from '@/services/cmsApi';

// ─── Types ───────────────────────────────────────────────────

interface Configuration {
    type: string;
    area: string;
    price: string;
    wingName?: string;
}

interface Amenity {
    name: string;
    category: string;
}

interface Connectivity {
    text: string;
}

interface GalleryImage {
    id: number;
    imageUrl: string;
    caption?: string;
}

interface ProjectData {
    slug: string;
    name: string;
    subtitle: string;
    location: string;
    price: string;
    description: string;
    fullDescription: string;
    configuration: string;
    status: string;
    tag: string;
    maharera: string;
    mahareraQr?: string;
    mahareraUrl: string;
    financeBy: string;
    disclaimer: string;
    googleMapsUrl: string;
    connectivitiesDescription: string;
    aboutDeveloperText: string;
    sortOrder: string;
    isActive: boolean;
    towerType: string;
    wingDetails: string;
}

// ─── Tab definitions ─────────────────────────────────────────

const TABS = [
    { id: 'basic', label: 'Basic Info', icon: Building2 },
    { id: 'configurations', label: 'Configurations', icon: Settings2 },
    { id: 'amenities', label: 'Amenities', icon: ListChecks },
    { id: 'connectivities', label: 'Connectivities', icon: Route },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'about_developer', label: 'About Developer', icon: User },
] as const;

type TabId = typeof TABS[number]['id'];

// ─── Component ───────────────────────────────────────────────

const AdminProjectEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNew = !id || id === 'new';

    const [activeTab, setActiveTab] = useState<TabId>('basic');
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [qrFile, setQrFile] = useState<File | null>(null);
    const [qrPreview, setQrPreview] = useState<string | null>(null);
    const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);
    const [floorPlanPreviews, setFloorPlanPreviews] = useState<string[]>([]);
    const [existingFloorPlans, setExistingFloorPlans] = useState<string[]>([]);
    const [aboutDeveloperFile, setAboutDeveloperFile] = useState<File | null>(null);
    const [aboutDeveloperPreview, setAboutDeveloperPreview] = useState<string | null>(null);
    const [overviewImageFile, setOverviewImageFile] = useState<File | null>(null);
    const [overviewImagePreview, setOverviewImagePreview] = useState<string | null>(null);

    const [connectivitiesImageFile, setConnectivitiesImageFile] = useState<File | null>(null);
    const [connectivitiesImagePreview, setConnectivitiesImagePreview] = useState<string | null>(null);

    const [amenitiesImageFile, setAmenitiesImageFile] = useState<File | null>(null);
    const [amenitiesImagePreview, setAmenitiesImagePreview] = useState<string | null>(null);

    const [cardImageFile, setCardImageFile] = useState<File | null>(null);
    const [cardImagePreview, setCardImagePreview] = useState<string | null>(null);

    // Project State
    const [project, setProject] = useState<ProjectData>({
        slug: '',
        name: '',
        subtitle: '',
        location: '',
        price: '',
        description: '',
        fullDescription: '',
        configuration: '',
        status: 'ongoing',
        tag: '',
        maharera: '',
        mahareraUrl: '',
        financeBy: '',
        disclaimer: '',
        googleMapsUrl: '',
        connectivitiesDescription: '',
        aboutDeveloperText: '',
        sortOrder: '0',
        isActive: true,
        towerType: 'single',
        wingDetails: '[]',
    });

    // Sub-resources
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [connectivities, setConnectivities] = useState<Connectivity[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [projectId, setProjectId] = useState<number | null>(isNew ? null : parseInt(id!));

    // ─── Fetch existing project ──────────────────────────────
    const groupedConfigurations = React.useMemo(() => {
        const groups: { [key: string]: { configs: (Configuration & { originalIndex: number })[], firstIndex: number } } = {};
        configurations.forEach((c, idx) => {
            const wing = c.wingName || 'Default';
            if (!groups[wing]) {
                groups[wing] = { configs: [], firstIndex: idx };
            }
            groups[wing].configs.push({ ...c, originalIndex: idx });
        });
        return groups;
    }, [configurations]);

    const fetchProject = useCallback(async () => {
        if (isNew) return;
        try {
            setLoading(true);
            // We need the slug to fetch, but we have the ID.
            // The getAll endpoint returns all projects so we can find ours.
            const data = await projectsApi.getAll();
            const found = data.projects?.find((p: any) => p.id === parseInt(id!));
            if (!found) {
                toast.error('Project not found');
                navigate('/admin/projects');
                return;
            }

            setProject({
                slug: found.slug || '',
                name: found.name || '',
                subtitle: found.subtitle || '',
                location: found.location || '',
                price: found.price || '',
                description: found.description || '',
                fullDescription: found.fullDescription || '',
                configuration: found.configuration || '',
                status: found.status || 'ongoing',
                tag: found.tag || '',
                maharera: found.maharera || '',
                mahareraUrl: found.mahareraUrl || '',
                financeBy: found.financeBy || '',
                disclaimer: found.disclaimer || '',
                googleMapsUrl: found.googleMapsUrl || '',
                connectivitiesDescription: found.connectivitiesDescription || '',
                aboutDeveloperText: found.aboutDeveloperText || '',
                sortOrder: String(found.sortOrder || 0),
                isActive: found.isActive !== false,
                towerType: found.towerType || 'single',
                wingDetails: found.wingDetails || '[]',
            });

            if (found.image) {
                setImagePreview(getImageUrl(found.image) || null);
            }

            if (found.cardImage) {
                setCardImagePreview(getImageUrl(found.cardImage) || null);
            }

            if (found.mahareraQr) {
                setQrPreview(getImageUrl(found.mahareraQr) || null);
            }

            setFloorPlanFiles([]);
            setFloorPlanPreviews([]);
            if (found.floorPlanImage) {
                try {
                    const parsed = JSON.parse(found.floorPlanImage);
                    if (Array.isArray(parsed)) {
                        setExistingFloorPlans(parsed);
                    } else {
                        setExistingFloorPlans([found.floorPlanImage]);
                    }
                } catch (e) {
                    setExistingFloorPlans([found.floorPlanImage]);
                }
            } else {
                setExistingFloorPlans([]);
            }

            if (found.aboutDeveloperImage) {
                setAboutDeveloperPreview(getImageUrl(found.aboutDeveloperImage) || null);
            }

            if (found.overviewImage) {
                setOverviewImagePreview(getImageUrl(found.overviewImage) || null);
            }

            if (found.connectivitiesImage) {
                setConnectivitiesImagePreview(getImageUrl(found.connectivitiesImage) || null);
            }

            if (found.amenitiesImage) {
                setAmenitiesImagePreview(getImageUrl(found.amenitiesImage) || null);
            }

            setConfigurations(
                (found.configurations || []).map((c: any) => ({
                    type: c.type,
                    area: c.area,
                    price: c.price,
                    wingName: c.wingName || '',
                }))
            );

            setAmenities(
                (found.amenities || []).map((a: any) => ({
                    name: a.name,
                    category: a.category || 'podium',
                }))
            );

            setConnectivities(
                (found.connectivities || []).map((c: any) => ({
                    text: c.text,
                }))
            );

            setGallery(found.gallery || []);
            setProjectId(found.id);
        } catch (err: any) {
            console.error('Failed to fetch project:', err);
            toast.error('Failed to load project');
        } finally {
            setLoading(false);
        }
    }, [id, isNew, navigate]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    // ─── Helpers ─────────────────────────────────────────────

    const handleFieldChange = (field: keyof ProjectData, value: string | boolean) => {
        setProject((prev) => ({ ...prev, [field]: value }));
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleNameChange = (value: string) => {
        handleFieldChange('name', value);
        if (isNew || !project.slug) {
            handleFieldChange('slug', generateSlug(value));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setQrFile(file);
            setQrPreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleFloorPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const arr = Array.from(files);
            const validFiles = arr.filter(f => f.type.startsWith('image/'));
            if (validFiles.length < arr.length) {
                toast.error('Only image files are allowed');
            }
            if (validFiles.length > 0) {
                setFloorPlanFiles(prev => [...prev, ...validFiles]);
                setFloorPlanPreviews(prev => [...prev, ...validFiles.map(f => URL.createObjectURL(f))]);
            }
        }
        e.target.value = '';
    };

    const removeNewFloorPlan = (index: number) => {
        setFloorPlanFiles(prev => prev.filter((_, i) => i !== index));
        setFloorPlanPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingFloorPlan = (index: number) => {
        setExistingFloorPlans(prev => prev.filter((_, i) => i !== index));
    };

    const handleAboutDeveloperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setAboutDeveloperFile(file);
            setAboutDeveloperPreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleOverviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setOverviewImageFile(file);
            setOverviewImagePreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleConnectivitiesImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setConnectivitiesImageFile(file);
            setConnectivitiesImagePreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleAmenitiesImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setAmenitiesImageFile(file);
            setAmenitiesImagePreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleCardImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file (PNG, JPG, WEBP)');
                return;
            }
            setCardImageFile(file);
            setCardImagePreview(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    // ─── Save Project ────────────────────────────────────────

    const handleSave = async () => {
        // Validation
        if (!project.name.trim()) {
            toast.error('Project name is required');
            setActiveTab('basic');
            return;
        }
        if (!project.slug.trim()) {
            toast.error('Project slug is required');
            setActiveTab('basic');
            return;
        }
        if (!project.location.trim()) {
            toast.error('Location is required');
            setActiveTab('basic');
            return;
        }
        if (!project.description.trim()) {
            toast.error('Description is required');
            setActiveTab('basic');
            return;
        }

        // MahaRERA Validation removed per user request

        try {
            setSaving(true);

            // Build FormData for the project
            const formData = new FormData();
            formData.append('slug', project.slug);
            formData.append('name', project.name);
            formData.append('subtitle', project.subtitle);
            formData.append('location', project.location);
            formData.append('price', project.price);
            formData.append('description', project.description);
            formData.append('fullDescription', project.fullDescription);
            formData.append('configuration', project.configuration);
            formData.append('status', project.status);
            formData.append('tag', project.tag);
            formData.append('maharera', project.maharera);
            formData.append('mahareraUrl', project.mahareraUrl);
            formData.append('financeBy', project.financeBy);
            formData.append('disclaimer', project.disclaimer);
            formData.append('googleMapsUrl', project.googleMapsUrl);
            formData.append('connectivitiesDescription', project.connectivitiesDescription);
            formData.append('aboutDeveloperText', project.aboutDeveloperText);
            formData.append('sortOrder', project.sortOrder);
            formData.append('isActive', String(project.isActive));
            formData.append('towerType', project.towerType);
            formData.append('wingDetails', project.wingDetails);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (cardImageFile) {
                formData.append('cardImage', cardImageFile);
            }

            if (qrFile) {
                formData.append('mahareraQr', qrFile);
            }

            floorPlanFiles.forEach(file => {
                formData.append('floorPlanImage', file);
            });
            formData.append('existingFloorPlans', JSON.stringify(existingFloorPlans));

            if (aboutDeveloperFile) {
                formData.append('aboutDeveloperImage', aboutDeveloperFile);
            }

            if (overviewImageFile) {
                formData.append('overviewImage', overviewImageFile);
            }

            if (connectivitiesImageFile) {
                formData.append('connectivitiesImage', connectivitiesImageFile);
            }

            if (amenitiesImageFile) {
                formData.append('amenitiesImage', amenitiesImageFile);
            }

            let savedProjectId = projectId;

            if (isNew) {
                const result = await projectsApi.create(formData);
                savedProjectId = result.project.id;
                setProjectId(savedProjectId);
                toast.success('Project created successfully!');
            } else {
                await projectsApi.update(savedProjectId!, formData);
                toast.success('Project updated successfully!');
            }

            // Save sub-resources if project exists
            if (savedProjectId) {
                // Save configurations
                if (configurations.length > 0) {
                    await projectsApi.updateConfigurations(savedProjectId, configurations);
                }

                // Save amenities
                if (amenities.length > 0) {
                    await projectsApi.updateAmenities(savedProjectId, amenities);
                }

                // Save connectivities
                if (connectivities.length > 0) {
                    await projectsApi.updateConnectivities(savedProjectId, connectivities);
                }
            }

            // Navigate back to projects list after saving
            navigate('/admin/projects');
        } catch (err: any) {
            console.error('Save error:', err);
            toast.error(err.message || 'Failed to save project');
        } finally {
            setSaving(false);
        }
    };

    // ─── Gallery Upload ──────────────────────────────────────

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0 || !projectId) return;

        // Validate all files are images
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
            toast.error('Some files are not images and were skipped. Please use PNG, JPG, or WEBP.');
        }

        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length === 0) {
            e.target.value = '';
            return;
        }

        const formData = new FormData();
        validFiles.forEach((file) => {
            formData.append('images', file);
        });

        try {
            await projectsApi.uploadGallery(projectId, formData);
            toast.success('Gallery images uploaded!');
            // Refresh project to get new gallery
            fetchProject();
        } catch (err: any) {
            toast.error(err.message || 'Failed to upload images');
        }

        // Reset the file input
        e.target.value = '';
    };

    const handleGalleryDelete = async (imageId: number) => {
        if (!projectId || !confirm('Delete this gallery image?')) return;
        try {
            await projectsApi.deleteGalleryImage(projectId, imageId);
            setGallery((prev) => prev.filter((img) => img.id !== imageId));
            toast.success('Gallery image deleted');
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete image');
        }
    };

    // ─── Configuration helpers ───────────────────────────────
    const getNextWingName = (currentConfigs: Configuration[]) => {
        const uniqueWings = Array.from(new Set(currentConfigs.map(c => c.wingName).filter(Boolean)));
        const nextLetter = String.fromCharCode(65 + uniqueWings.length); // A, B, C...
        return `${nextLetter} Wing`;
    };

    const addWing = () => {
        const newWingName = getNextWingName(configurations);
        setConfigurations((prev) => [...prev, { type: '', area: '', price: '', wingName: newWingName }]);
    };

    const addConfigurationToWing = (wingName: string) => {
        setConfigurations((prev) => [...prev, { type: '', area: '', price: '', wingName: wingName }]);
    };

    const updateWingName = (oldName: string, newName: string) => {
        if (!newName.trim()) return;
        
        setConfigurations((prev) => prev.map(c => {
            const matches = (c.wingName === oldName) || (oldName === 'Default' && !c.wingName);
            return matches ? { ...c, wingName: newName } : c;
        }));
        
        // Also update wingDetails JSON
        try {
            const wingDetailsArr = JSON.parse(project.wingDetails || '[]');
            const existingIndex = wingDetailsArr.findIndex((w: any) => w.name === oldName || (oldName === 'Default' && !w.name));
            
            let newWingDetails;
            if (existingIndex > -1) {
                newWingDetails = [...wingDetailsArr];
                newWingDetails[existingIndex] = { ...newWingDetails[existingIndex], name: newName };
            } else {
                newWingDetails = [...wingDetailsArr, { name: newName, image: '' }];
            }
            handleFieldChange('wingDetails', JSON.stringify(newWingDetails));
        } catch (e) {}
    };

    const removeWing = (wingName: string) => {
        setConfigurations((prev) => prev.filter(c => c.wingName !== wingName));
        
        // Also remove from wingDetails
        try {
            const wingDetailsArr = JSON.parse(project.wingDetails || '[]');
            const newWingDetails = wingDetailsArr.filter((w: any) => w.name !== wingName);
            handleFieldChange('wingDetails', JSON.stringify(newWingDetails));
        } catch (e) {}
    };

    const addConfiguration = () => {
        setConfigurations((prev) => [...prev, { type: '', area: '', price: '', wingName: project.towerType === 'multiple' ? 'A Wing' : '' }]);
    };

    const updateConfiguration = (index: number, field: keyof Configuration, value: string) => {
        setConfigurations((prev) =>
            prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
        );
    };

    const removeConfiguration = (index: number) => {
        setConfigurations((prev) => prev.filter((_, i) => i !== index));
    };

    // ─── Amenity helpers ─────────────────────────────────────

    const addAmenity = () => {
        setAmenities((prev) => [...prev, { name: '', category: 'podium' }]);
    };

    const updateAmenity = (index: number, field: keyof Amenity, value: string) => {
        setAmenities((prev) =>
            prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
        );
    };

    const removeAmenity = (index: number) => {
        setAmenities((prev) => prev.filter((_, i) => i !== index));
    };

    // ─── Connectivity helpers ────────────────────────────────

    const addConnectivity = () => {
        setConnectivities((prev) => [...prev, { text: '' }]);
    };

    const updateConnectivity = (index: number, value: string) => {
        setConnectivities((prev) =>
            prev.map((c, i) => (i === index ? { text: value } : c))
        );
    };

    const removeConnectivity = (index: number) => {
        setConnectivities((prev) => prev.filter((_, i) => i !== index));
    };

    // ─── Loading state ───────────────────────────────────────

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading project...</span>
            </div>
        );
    }

    // ─── Render ──────────────────────────────────────────────

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/projects')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">
                            {isNew ? 'Add New Project' : `Edit: ${project.name}`}
                        </h1>
                        <p className="text-muted-foreground">
                            {isNew
                                ? 'Fill in the details below to create a new project'
                                : 'Update the project details, configurations, amenities, and gallery'}
                        </p>
                    </div>
                </div>
                <Button onClick={handleSave} disabled={saving} size="lg">
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {isNew ? 'Create Project' : 'Save Changes'}
                        </>
                    )}
                </Button>
            </div>

            {/* Tab Navigation */}
            <div className="border-b">
                <div className="flex gap-1 overflow-x-auto">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isDisabled = false; // Gallery is no longer blocked for new projects
                        return (
                            <button
                                key={tab.id}
                                onClick={() => !isDisabled && setActiveTab(tab.id)}
                                disabled={isDisabled}
                                className={`
                                    flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                                    ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                                    }
                                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                                {tab.id === 'configurations' && configurations.length > 0 && (
                                    <Badge variant="secondary" className="ml-1 text-xs">{configurations.length}</Badge>
                                )}
                                {tab.id === 'amenities' && amenities.length > 0 && (
                                    <Badge variant="secondary" className="ml-1 text-xs">{amenities.length}</Badge>
                                )}
                                {tab.id === 'connectivities' && connectivities.length > 0 && (
                                    <Badge variant="secondary" className="ml-1 text-xs">{connectivities.length}</Badge>
                                )}
                                {tab.id === 'gallery' && gallery.length > 0 && (
                                    <Badge variant="secondary" className="ml-1 text-xs">{gallery.length}</Badge>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ─── Tab: Basic Info ─────────────────────────────── */}
            {activeTab === 'basic' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Form Fields */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Information</CardTitle>
                                <CardDescription>Core details about the project</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Project Name *</Label>
                                        <Input
                                            id="name"
                                            value={project.name}
                                            onChange={(e) => handleNameChange(e.target.value)}
                                            placeholder="e.g. Swastik Elite"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="slug">URL Slug *</Label>
                                        <Input
                                            id="slug"
                                            value={project.slug}
                                            onChange={(e) => handleFieldChange('slug', e.target.value)}
                                            placeholder="e.g. swastik-elite"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Used in the URL: /project/{project.slug || 'slug'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="subtitle">Subtitle / Type</Label>
                                        <Input
                                            id="subtitle"
                                            value={project.subtitle}
                                            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                                            placeholder="e.g. Residential, Commercial"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="location">Location *</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="location"
                                                className="pl-9"
                                                value={project.location}
                                                onChange={(e) => handleFieldChange('location', e.target.value)}
                                                placeholder="e.g. Ghatkopar West, Mumbai"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            value={project.price}
                                            onChange={(e) => handleFieldChange('price', e.target.value)}
                                            placeholder="e.g. 1 CR 70 lacs ++"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="configuration">Configuration</Label>
                                        <Input
                                            id="configuration"
                                            value={project.configuration}
                                            onChange={(e) => handleFieldChange('configuration', e.target.value)}
                                            placeholder="e.g. 1,2,3 BHK"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="tag">Tag / Label</Label>
                                        <Input
                                            id="tag"
                                            value={project.tag}
                                            onChange={(e) => handleFieldChange('tag', e.target.value)}
                                            placeholder="e.g. Enquiry Now, New Launch"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description">Short Description *</Label>
                                    <Textarea
                                        id="description"
                                        rows={3}
                                        value={project.description}
                                        onChange={(e) => handleFieldChange('description', e.target.value)}
                                        placeholder="Brief description for the project card..."
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="fullDescription">Full Description</Label>
                                    <Textarea
                                        id="fullDescription"
                                        rows={6}
                                        value={project.fullDescription}
                                        onChange={(e) => handleFieldChange('fullDescription', e.target.value)}
                                        placeholder="Detailed description for the project details page..."
                                    />
                                </div>

                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>MAHARERA & Compliance</CardTitle>
                                <CardDescription>Regulatory information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="maharera">MahaRERA Number</Label>
                                        <Input
                                            id="maharera"
                                            value={project.maharera}
                                            onChange={(e) => handleFieldChange('maharera', e.target.value.toUpperCase())}
                                            placeholder="e.g. P51800045216"
                                        />

                                    </div>
                                    <div>
                                        <Label htmlFor="mahareraUrl">MahaRERA Official Link</Label>
                                        <Input
                                            id="mahareraUrl"
                                            value={project.mahareraUrl}
                                            onChange={(e) => handleFieldChange('mahareraUrl', e.target.value)}
                                            placeholder="https://maharera.mahaonline.gov.in"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="financeBy">Project Finance By</Label>
                                    <Input
                                        id="financeBy"
                                        value={project.financeBy}
                                        onChange={(e) => handleFieldChange('financeBy', e.target.value)}
                                        placeholder="e.g. Bajaj Housing Finance Limited"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="disclaimer">Disclaimer Notice</Label>
                                    <Textarea
                                        id="disclaimer"
                                        rows={4}
                                        value={project.disclaimer}
                                        onChange={(e) => handleFieldChange('disclaimer', e.target.value)}
                                        placeholder="T&C and Disclaimer text..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Status, Image & Settings */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Status & Visibility</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Project Status</Label>
                                    <Select
                                        value={project.status}
                                        onValueChange={(v) => handleFieldChange('status', v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ongoing">
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                                    Ongoing
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="completed">
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                                    Completed
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="planning">
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                                    Planning
                                                </span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="sortOrder">Sort Order</Label>
                                    <Input
                                        id="sortOrder"
                                        type="number"
                                        min="0"
                                        value={project.sortOrder}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === '' || parseInt(val) >= 0) {
                                                handleFieldChange('sortOrder', val);
                                            }
                                        }}
                                        placeholder="0"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Lower number = higher position
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={project.isActive}
                                        onChange={(e) => handleFieldChange('isActive', e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    <Label htmlFor="isActive" className="mb-0">Active (visible on website)</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>MAHARERA QR Code</CardTitle>
                                <CardDescription>Official registration QR code</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {qrPreview && (
                                    <div className="relative rounded-lg overflow-hidden border bg-white p-4">
                                        <img
                                            src={qrPreview}
                                            alt="MahaRERA QR"
                                            className="w-full aspect-square object-contain"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7"
                                            onClick={() => {
                                                setQrFile(null);
                                                setQrPreview(null);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="qr-upload" className="cursor-pointer">
                                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to upload MahaRERA QR
                                            </p>
                                        </div>
                                    </Label>
                                    <input
                                        id="qr-upload"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="hidden"
                                        onChange={handleQrChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Project Image</CardTitle>
                                <CardDescription>Main thumbnail image</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {imagePreview && (
                                    <div className="relative rounded-lg overflow-hidden border">
                                        <img
                                            src={imagePreview}
                                            alt="Project preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview(null);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to upload project image
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                JPG, PNG up to 5MB
                                            </p>
                                        </div>
                                    </Label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Card Image</CardTitle>
                                <CardDescription>Image for project cards (particular shape)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cardImagePreview && (
                                    <div className="relative rounded-lg overflow-hidden border">
                                        <img
                                            src={cardImagePreview}
                                            alt="Card preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7"
                                            onClick={() => {
                                                setCardImageFile(null);
                                                setCardImagePreview(null);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="card-image-upload" className="cursor-pointer">
                                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to upload card image
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                JPG, PNG up to 5MB
                                            </p>
                                        </div>
                                    </Label>
                                    <input
                                        id="card-image-upload"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="hidden"
                                        onChange={handleCardImageChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview Image</CardTitle>
                                <CardDescription>Image displayed next to the Project Overview section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {overviewImagePreview && (
                                    <div className="relative rounded-lg overflow-hidden border">
                                        <img
                                            src={overviewImagePreview}
                                            alt="Overview preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7"
                                            onClick={() => {
                                                setOverviewImageFile(null);
                                                setOverviewImagePreview(null);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="overview-image-upload" className="cursor-pointer">
                                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Click to upload project overview image
                                            </p>
                                        </div>
                                    </Label>
                                    <input
                                        id="overview-image-upload"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="hidden"
                                        onChange={handleOverviewImageChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* ─── Tab: Configurations ────────────────────────── */}
            {activeTab === 'configurations' && (
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <CardTitle>Floor Configurations</CardTitle>
                                <CardDescription>
                                    Add the BHK types, carpet areas and pricing for this project
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-3 bg-primary/10 p-2 rounded-lg border border-primary/20">
                                <Label htmlFor="towerType-configs" className="text-xs font-bold text-primary uppercase">Project Type:</Label>
                                <Select
                                    value={project.towerType}
                                    onValueChange={(v) => handleFieldChange('towerType', v)}
                                >
                                    <SelectTrigger id="towerType-configs" className="w-[160px] h-9 bg-white">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="single">Single Tower</SelectItem>
                                        <SelectItem value="multiple">Multiple Wings</SelectItem>
                                    </SelectContent>
                                </Select>
                                {project.towerType === 'multiple' ? (
                                    <Button size="sm" onClick={addWing}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Wing
                                    </Button>
                                ) : (
                                    <Button size="sm" onClick={addConfiguration}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Configuration
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Status Message */}
                        {project.towerType === 'multiple' ? (
                            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md text-sm flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                <strong>Multi-Wing Mode Active:</strong> Configurations are grouped by wing. Use "Add Wing" to create a new tower/block.
                            </div>
                        ) : (
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md text-sm flex items-center gap-2">
                                <Settings2 className="h-4 w-4" />
                                <strong>Single Tower Mode:</strong> All configurations are listed together. Switch to "Multiple Wings" if this project has separate towers.
                            </div>
                        )}

                        {/* Floor Plan Global Image Section */}
                        <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-primary font-semibold text-base">
                                        <Image className="h-5 w-5" />
                                        Project Floor Plans
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Upload all floor plan images here. For multi-wing projects, assign these to wings below.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Label htmlFor="floor-plan-upload" className="cursor-pointer">
                                        <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors flex items-center whitespace-nowrap text-sm font-medium">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Floor Plans
                                        </div>
                                    </Label>
                                    <input
                                        id="floor-plan-upload"
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="hidden"
                                        onChange={handleFloorPlanChange}
                                    />
                                </div>
                            </div>

                            {/* Previews */}
                            {(existingFloorPlans.length > 0 || floorPlanPreviews.length > 0) && (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pb-2 pt-2 border-t mt-2">
                                    {existingFloorPlans.map((url, i) => (
                                        <div key={`exist-${i}`} className="group relative aspect-square rounded-md overflow-hidden border bg-white shadow-sm ring-1 ring-black/5">
                                            <img
                                                src={getImageUrl(url) || ''}
                                                alt={`Floor Plan ${i}`}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => removeExistingFloorPlan(i)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-1 left-1 bg-black/60 text-[10px] text-white px-1.5 py-0.5 rounded">
                                                Image {i + 1}
                                            </div>
                                        </div>
                                    ))}
                                    {floorPlanPreviews.map((src, i) => (
                                        <div key={`new-${i}`} className="group relative aspect-square rounded-md overflow-hidden border bg-white shadow-sm ring-1 ring-black/5">
                                            <img
                                                src={src}
                                                alt="New Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => removeNewFloorPlan(i)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-1 left-1 bg-primary/80 text-[10px] text-white px-1.5 py-0.5 rounded">
                                                New {i + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Configurations Display */}
                        {configurations.length === 0 ? (
                            <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl bg-muted/10">
                                <Settings2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <CardTitle className="text-xl mb-1">No configurations yet</CardTitle>
                                <p className="text-sm max-w-xs mx-auto mb-6">Start by adding a {project.towerType === 'multiple' ? 'wing' : 'configuration'} to define BHK types and pricing.</p>
                                <Button onClick={project.towerType === 'multiple' ? addWing : addConfiguration}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add {project.towerType === 'multiple' ? 'First Wing' : 'Configuration'}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {Object.entries(groupedConfigurations).map(([wingName, group]) => (
                                    <div key={`wing-group-${group.firstIndex}`} className="border rounded-xl bg-white shadow-sm overflow-hidden">
                                        <div className="bg-muted/30 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b">
                                            <div className="flex items-center gap-4 flex-1">
                                                {project.towerType === 'multiple' ? (
                                                    <div className="flex items-center gap-2 max-w-sm flex-1">
                                                        <Building2 className="h-5 w-5 text-primary shrink-0" />
                                                        <Input
                                                            value={wingName === 'Default' ? '' : wingName}
                                                            onChange={(e) => updateWingName(wingName, e.target.value)}
                                                            className="font-bold text-lg bg-transparent border-none focus-visible:ring-0 p-0 h-auto shadow-none"
                                                            placeholder="Enter Wing Name (e.g. A Wing)"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-5 w-5 text-primary" />
                                                        <span className="font-bold text-lg">Tower Configurations</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {project.towerType === 'multiple' && (
                                                    <>
                                                        <Select 
                                                            value={(() => {
                                                                try {
                                                                    const details = JSON.parse(project.wingDetails || '[]');
                                                                    return details.find((w: any) => w.name === wingName)?.image || '';
                                                                } catch { return ''; }
                                                            })()} 
                                                            onValueChange={(val) => {
                                                                try {
                                                                    const details = JSON.parse(project.wingDetails || '[]');
                                                                    const newDetails = [...details.filter((w: any) => w.name !== wingName), { name: wingName, image: val }];
                                                                    handleFieldChange('wingDetails', JSON.stringify(newDetails));
                                                                } catch {}
                                                            }}
                                                        >
                                                            <SelectTrigger className="w-[180px] h-9">
                                                                <SelectValue placeholder="Link Floor Plan" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {[...existingFloorPlans, ...floorPlanPreviews].map((url, i) => (
                                                                    <SelectItem key={i} value={url}>
                                                                        Floor Plan Image {i + 1}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="text-destructive border-destructive/20 hover:bg-destructive/10"
                                                            onClick={() => removeWing(wingName)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Remove Wing
                                                        </Button>
                                                    </>
                                                )}
                                                <Button size="sm" onClick={() => addConfigurationToWing(wingName)}>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Type
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-6 text-xs font-bold uppercase text-muted-foreground px-1 tracking-wider">
                                                <span>Unit Type (BHK)</span>
                                                <span>Carpet Area</span>
                                                <span>All-inclusive Price</span>
                                                <span className="w-9" />
                                            </div>
                                            {group.configs.map((config) => (
                                                <div key={config.originalIndex} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-6 items-center group/row animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <Input
                                                        value={config.type}
                                                        onChange={(e) => updateConfiguration(config.originalIndex, 'type', e.target.value)}
                                                        placeholder="e.g. 1 BHK"
                                                        className="h-11 shadow-none"
                                                    />
                                                    <Input
                                                        value={config.area}
                                                        onChange={(e) => updateConfiguration(config.originalIndex, 'area', e.target.value)}
                                                        placeholder="e.g. 418 RCA Sq. Ft"
                                                        className="h-11 shadow-none"
                                                    />
                                                    <Input
                                                        value={config.price}
                                                        onChange={(e) => updateConfiguration(config.originalIndex, 'price', e.target.value)}
                                                        placeholder="e.g. 1.70 Cr++"
                                                        className="h-11 shadow-none"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-muted-foreground hover:text-destructive h-11 w-11 transition-colors"
                                                        onClick={() => removeConfiguration(config.originalIndex)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* ─── Tab: Amenities ──────────────────────────────── */}
            {activeTab === 'amenities' && (
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Amenities</CardTitle>
                                <CardDescription>
                                    List the amenities available in this project (Podium & Rooftop)
                                </CardDescription>
                            </div>
                            <Button onClick={addAmenity}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Amenity
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {amenities.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                <ListChecks className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>No amenities added yet.</p>
                                <p className="text-sm">Click "Add Amenity" to list project features.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="grid grid-cols-[1fr_200px_auto] gap-4 text-sm font-medium text-muted-foreground px-1">
                                    <span>Amenity Name</span>
                                    <span>Category</span>
                                    <span className="w-9" />
                                </div>
                                {amenities.map((amenity, index) => (
                                    <div key={index} className="grid grid-cols-[1fr_200px_auto] gap-4 items-center">
                                        <Input
                                            value={amenity.name}
                                            onChange={(e) => updateAmenity(index, 'name', e.target.value)}
                                            placeholder="e.g. Swimming Pool"
                                        />
                                        <Select
                                            value={amenity.category}
                                            onValueChange={(v) => updateAmenity(index, 'category', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="podium">Podium</SelectItem>
                                                <SelectItem value="rooftop">Rooftop</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive h-9 w-9"
                                            onClick={() => removeAmenity(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Amenities Map Image Section */}
                        <div className="bg-muted/30 p-4 rounded-lg border space-y-4 mt-8">
                            <div className="flex items-center gap-2 text-primary font-semibold">
                                <Image className="h-4 w-4" />
                                Amenities Image
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Upload an image displaying the amenities for the project.
                            </p>
                            {amenitiesImagePreview && (
                                <div className="relative rounded-lg overflow-hidden border">
                                    <img
                                        src={amenitiesImagePreview}
                                        alt="Amenities Map preview"
                                        className="w-full h-48 object-cover"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7"
                                        onClick={() => {
                                            setAmenitiesImageFile(null);
                                            setAmenitiesImagePreview(null);
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            <div>
                                <Label htmlFor="amenities-image-upload" className="cursor-pointer">
                                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Click to upload amenities image
                                        </p>
                                    </div>
                                </Label>
                                <input
                                    id="amenities-image-upload"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    className="hidden"
                                    onChange={handleAmenitiesImageChange}
                                />
                            </div>
                        </div>

                    </CardContent>
                </Card>
            )}

            {/* ─── Tab: Connectivities ─────────────────────────── */}
            {activeTab === 'connectivities' && (
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Nearby Connectivities</CardTitle>
                                <CardDescription>
                                    Key destinations and transport connections near the project
                                </CardDescription>
                            </div>
                            <Button onClick={addConnectivity}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Connectivity
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Connectivities Map Image Section */}
                        <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
                            <div className="flex items-center gap-2 text-primary font-semibold">
                                <MapPin className="h-4 w-4" />
                                Connectivities Map Image
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Upload a custom map image replacing the default Google Maps view.
                            </p>
                            {connectivitiesImagePreview && (
                                <div className="relative rounded-lg overflow-hidden border">
                                    <img
                                        src={connectivitiesImagePreview}
                                        alt="Connectivities Map preview"
                                        className="w-full h-48 object-cover"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7"
                                        onClick={() => {
                                            setConnectivitiesImageFile(null);
                                            setConnectivitiesImagePreview(null);
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            <div>
                                <Label htmlFor="connectivities-image-upload" className="cursor-pointer">
                                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Click to upload connectivities map image
                                        </p>
                                    </div>
                                </Label>
                                <input
                                    id="connectivities-image-upload"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    className="hidden"
                                    onChange={handleConnectivitiesImageChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="text-sm font-medium">Connectivity Points</div>

                            <div className="space-y-2 mb-6">
                                <Label htmlFor="connectivitiesDescription">Heading/Description Content (Optional)</Label>
                                <Textarea
                                    id="connectivitiesDescription"
                                    value={project.connectivitiesDescription}
                                    onChange={(e) => handleFieldChange('connectivitiesDescription', e.target.value)}
                                    placeholder="Add an optional description that appears above the connectivity points..."
                                    rows={4}
                                />
                            </div>

                            {connectivities.length === 0 ? (
                                <div className="py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                    <Route className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                    <p>No connectivities added yet.</p>
                                    <p className="text-sm">Click "Add Connectivity" to add nearby landmarks and transport.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {connectivities.map((conn, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <Input
                                                value={conn.text}
                                                onChange={(e) => updateConnectivity(index, e.target.value)}
                                                placeholder="e.g. 2 mins from railway station"
                                                className="flex-1"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive h-9 w-9"
                                                onClick={() => removeConnectivity(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ─── Tab: Gallery ─────────────────────────────────── */}
            {activeTab === 'gallery' && (
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Gallery Images</CardTitle>
                                <CardDescription>
                                    Upload photos of the project (renders, interiors, exteriors)
                                </CardDescription>
                            </div>
                            {projectId && (
                                <Label htmlFor="gallery-upload" className="cursor-pointer">
                                    <div className="inline-flex items-center gap-2 h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium">
                                        <Upload className="h-4 w-4" />
                                        Upload Images
                                    </div>
                                </Label>
                            )}
                            <input
                                id="gallery-upload"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                multiple
                                className="hidden"
                                onChange={handleGalleryUpload}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!projectId ? (
                            <div className="py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                <Image className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Save the project first before uploading gallery images.</p>
                            </div>
                        ) : gallery.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                <Image className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>No gallery images yet.</p>
                                <p className="text-sm">Click "Upload Images" to add project photos.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {gallery.map((img) => (
                                    <div key={img.id} className="relative group rounded-lg overflow-hidden border">
                                        <img
                                            src={getImageUrl(img.imageUrl) || ''}
                                            alt={img.caption || 'Gallery image'}
                                            className="w-full h-40 object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleGalleryDelete(img.id)}
                                            >
                                                <Trash2 className="mr-1 h-3 w-3" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* ─── Tab: About Developer ───────────────────────── */}
            {activeTab === 'about_developer' && (
                <Card>
                    <CardHeader>
                        <CardTitle>About Developer</CardTitle>
                        <CardDescription>Details about the real estate developer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="aboutDeveloperText">Description Text</Label>
                            <Textarea
                                id="aboutDeveloperText"
                                rows={6}
                                value={project.aboutDeveloperText}
                                onChange={(e) => handleFieldChange('aboutDeveloperText', e.target.value)}
                                placeholder="E.g., Swastik Group has been a leading real estate developer..."
                            />
                        </div>

                        <div className="space-y-4">
                            <Label>Developer/Company Image</Label>
                            {aboutDeveloperPreview ? (
                                <div className="relative w-64 h-48 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                                    <img src={aboutDeveloperPreview} alt="Developer Preview" className="max-w-full max-h-full object-contain" />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8"
                                        onClick={() => {
                                            setAboutDeveloperFile(null);
                                            setAboutDeveloperPreview(null);
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed rounded-lg p-6 text-center max-w-sm cursor-pointer hover:bg-muted/50 transition relative">
                                    <Image className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                                    <p className="text-sm font-medium">Click to upload image</p>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setAboutDeveloperFile(file);
                                                setAboutDeveloperPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AdminProjectEdit;
