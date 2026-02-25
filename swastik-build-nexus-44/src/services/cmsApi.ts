/**
 * CMS API Service
 * Centralized API client for all CMS backend communication.
 */

const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:5001/api';

// ─── Helpers ─────────────────────────────────────────────

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
};

const apiGet = async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
};

const apiPost = async (endpoint: string, data: any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            ...(!isFormData && { 'Content-Type': 'application/json' }),
        },
        body: isFormData ? data : JSON.stringify(data),
    });
    return handleResponse(response);
};

const apiPut = async (endpoint: string, data: any) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            ...getAuthHeaders(),
            ...(!isFormData && { 'Content-Type': 'application/json' }),
        },
        body: isFormData ? data : JSON.stringify(data),
    });
    return handleResponse(response);
};

const apiDelete = async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
};

// ─── Auth API ────────────────────────────────────────────

export const authApi = {
    login: (email: string, password: string) =>
        apiPost('/auth/login', { email, password }),
    me: () => apiGet('/auth/me'),
    changePassword: (currentPassword: string, newPassword: string) =>
        apiPut('/auth/change-password', { currentPassword, newPassword }),
};

// ─── Hero Banner API ─────────────────────────────────────

export const heroBannerApi = {
    get: () => apiGet('/hero-banners'),
    update: (data: FormData) => apiPut('/hero-banners', data),
};

// ─── Sections API ────────────────────────────────────────

export const sectionsApi = {
    getAll: () => apiGet('/sections'),
    getByKey: (key: string) => apiGet(`/sections/${key}`),
    create: (data: FormData) => apiPost('/sections', data),
    update: (key: string, data: FormData) => apiPut(`/sections/${key}`, data),
    delete: (key: string) => apiDelete(`/sections/${key}`),
};

// ─── Values, Vision & Mission API ────────────────────────

export const vvmApi = {
    getAll: () => apiGet('/values-vision-mission'),
    update: (data: FormData) => apiPut('/values-vision-mission', data),
};

// ─── Feature Cards API ───────────────────────────────────

export const featureCardsApi = {
    getAll: (page?: string) => apiGet(`/feature-cards${page ? `?page=${page}` : ''}`),
    update: (page: string, cards: any[]) =>
        apiPut('/feature-cards', { page, cards }),
};

// ─── Projects API ────────────────────────────────────────

export const projectsApi = {
    getAll: (status?: string) => apiGet(`/projects${status ? `?status=${status}` : ''}`),
    getBySlug: (slug: string) => apiGet(`/projects/${slug}`),
    create: (data: FormData) => apiPost('/projects', data),
    update: (id: number, data: FormData) => apiPut(`/projects/${id}`, data),
    delete: (id: number) => apiDelete(`/projects/${id}`),
    // Sub-resources
    updateConfigurations: (id: number, configurations: any[]) =>
        apiPost(`/projects/${id}/configurations`, { configurations }),
    updateAmenities: (id: number, amenities: any[]) =>
        apiPost(`/projects/${id}/amenities`, { amenities }),
    updateConnectivities: (id: number, connectivities: any[]) =>
        apiPost(`/projects/${id}/connectivities`, { connectivities }),
    uploadGallery: (id: number, data: FormData) =>
        apiPost(`/projects/${id}/gallery`, data),
    deleteGalleryImage: (projectId: number, imageId: number) =>
        apiDelete(`/projects/${projectId}/gallery/${imageId}`),
};

// ─── Blogs API ───────────────────────────────────────────

export const blogsApi = {
    getPublished: () => apiGet('/blogs'),
    getAll: () => apiGet('/blogs/all'),
    getBySlug: (slug: string) => apiGet(`/blogs/${slug}`),
    create: (data: FormData) => apiPost('/blogs', data),
    update: (id: number, data: FormData) => apiPut(`/blogs/${id}`, data),
    delete: (id: number) => apiDelete(`/blogs/${id}`),
};

// ─── FAQs API ────────────────────────────────────────────

export const faqsApi = {
    getActive: () => apiGet('/faqs'),
    getAll: () => apiGet('/faqs/all'),
    create: (data: any) => apiPost('/faqs', data),
    update: (id: number, data: any) => apiPut(`/faqs/${id}`, data),
    delete: (id: number) => apiDelete(`/faqs/${id}`),
};

// ─── Statistics API ──────────────────────────────────────

export const statisticsApi = {
    getAll: () => apiGet('/statistics'),
    update: (statistics: any[]) => apiPut('/statistics', { statistics }),
    delete: (id: number) => apiDelete(`/statistics/${id}`),
};

// ─── Social Media API ────────────────────────────────────

export const socialMediaApi = {
    // Social Links
    getAll: () => apiGet('/social-media'),
    update: (links: any[]) => apiPut('/social-media', { links }),

    // Social Post Images (The Grid)
    getPosts: () => apiGet('/social-media/posts'),
    getAllPosts: () => apiGet('/social-media/posts/all'),
    createPost: (data: FormData) => apiPost('/social-media/posts', data),
    updatePost: (id: number, data: FormData) => apiPut(`/social-media/posts/${id}`, data),
    deletePost: (id: number) => apiDelete(`/social-media/posts/${id}`),
};

// ─── Locations API ───────────────────────────────────────

export const locationsApi = {
    getAll: () => apiGet('/locations'),
    update: (locations: any[]) => apiPut('/locations', { locations }),
    create: (data: any) => apiPost('/locations', data),
    delete: (id: number) => apiDelete(`/locations/${id}`),
};

// ─── Media API ───────────────────────────────────────────

export const mediaApi = {
    getAll: (page?: number) => apiGet(`/media?page=${page || 1}`),
    upload: (data: FormData) => apiPost('/media', data),
    delete: (id: number) => apiDelete(`/media/${id}`),
};

// ─── Inquiries API ───────────────────────────────────────

export const inquiriesApi = {
    getAll: (page?: number, status?: string) =>
        apiGet(`/inquiries?page=${page || 1}${status ? `&status=${status}` : ''}`),
    submit: (data: any) => apiPost('/inquiries', data),
    updateStatus: (id: number, status: string) =>
        apiPut(`/inquiries/${id}/status`, { status }),
    delete: (id: number) => apiDelete(`/inquiries/${id}`),
    getStats: () => apiGet('/inquiries/stats'),
};

// ─── Dashboard API ───────────────────────────────────────

export const dashboardApi = {
    getStats: () => apiGet('/dashboard/stats'),
    deleteActivity: (id: number) => apiDelete(`/dashboard/activity/${id}`),
};

// ─── Loyalty API ──────────────────────────────────────────

export const loyaltyApi = {
    getAll: () => apiGet('/loyalty'),
    submit: (data: any) => apiPost('/loyalty', data),
    delete: (id: number) => apiDelete(`/loyalty/${id}`),
};

// ─── Helper to get full image URL ────────────────────────

export const getImageUrl = (path: string | null | undefined): string | null => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_CMS_API_URL?.replace('/api', '') || 'http://localhost:5001';
    return `${baseUrl}${path}`;
};
