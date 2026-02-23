import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// ─── AWS S3 Configuration ───────────────────────────────
const isS3Configured = !!(
    process.env.AWS_S3_BUCKET &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION
);

let s3Client: S3Client | null = null;

if (isS3Configured) {
    s3Client = new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
    console.log('✅ AWS S3 configured for file uploads');
} else {
    console.warn('⚠️  AWS S3 not configured — falling back to local disk storage');
    console.warn('   Set AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION in .env');
}

// ─── File Filter (shared between S3 and local) ─────────
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, WebP, GIF, and SVG are allowed.`));
    }
};

// ─── S3 Storage Configuration ───────────────────────────
const createS3Storage = () => {
    if (!s3Client) throw new Error('S3 client not initialized');

    return multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET!,
        // ACL removed — use bucket policy for public read access instead
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (_req, file, cb) => {
            cb(null, { originalName: file.originalname });
        },
        key: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            const folder = process.env.AWS_S3_UPLOAD_FOLDER || 'uploads';
            const uniqueName = `${folder}/${uuidv4()}${ext}`;
            cb(null, uniqueName);
        },
    });
};

// ─── Local Disk Storage (fallback for development) ──────
const createLocalStorage = () => {
    const uploadDir = path.join(__dirname, '..', '..', process.env.UPLOAD_DIR || 'uploads');

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    return multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            const uniqueName = `${uuidv4()}${ext}`;
            cb(null, uniqueName);
        },
    });
};

// ─── Create Multer Instance ─────────────────────────────
const storage = isS3Configured ? createS3Storage() : createLocalStorage();

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
    },
});

// ─── Helper: Get public URL for an uploaded file ────────
export const getFileUrl = (file: Express.Multer.File): string => {
    if (isS3Configured) {
        // multer-s3 adds 'location' property (full S3 URL) to the file object
        return (file as any).location;
    }
    // Local fallback: return relative path
    return `/uploads/${file.filename}`;
};

// ─── Helper: Get file key for S3 deletion ───────────────
const getS3KeyFromUrl = (url: string): string | null => {
    try {
        // S3 URL format: https://<bucket>.s3.<region>.amazonaws.com/<key>
        // or: https://s3.<region>.amazonaws.com/<bucket>/<key>
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);

        // If the URL uses virtual-hosted–style (bucket in hostname)
        if (urlObj.hostname.includes('.s3.')) {
            return pathParts.join('/');
        }

        // If path-style URL, first segment is bucket name
        return pathParts.slice(1).join('/');
    } catch {
        // If it's not a full URL, it might be just the key
        return url;
    }
};

// ─── Helper: Delete a file (S3 or local) ────────────────
export const deleteFile = async (fileUrl: string): Promise<void> => {
    try {
        if (isS3Configured && s3Client && fileUrl.includes('amazonaws.com')) {
            // Delete from S3
            const key = getS3KeyFromUrl(fileUrl);
            if (key) {
                await s3Client.send(
                    new DeleteObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET!,
                        Key: key,
                    })
                );
                console.log(`🗑️  Deleted from S3: ${key}`);
            }
        } else {
            // Delete from local filesystem
            const filename = fileUrl.replace('/uploads/', '');
            const uploadDir = path.join(__dirname, '..', '..', process.env.UPLOAD_DIR || 'uploads');
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};
