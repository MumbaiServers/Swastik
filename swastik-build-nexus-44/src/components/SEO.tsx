import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    imageUrl?: string;
    url?: string;
}

const SEO = ({ title, description, keywords, imageUrl, url }: SEOProps) => {
    const defaultTitle = 'Swastik Group | Developers & Builders';
    const defaultDescription = 'Swastik Group is dedicated to honesty, openness, and quality work. We build durable homes blending contemporary design with luxury.';
    const defaultKeywords = 'Swastik Group, real estate, luxury homes, residential projects, commercial properties, builders, developers';
    const defaultUrl = typeof window !== 'undefined' ? window.location.href : '';
    const defaultImage = '/og-image.jpg'; // Recommended to create an OG image in public folder

    const finalTitle = title ? `${title} | Swastik Group` : defaultTitle;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{finalTitle}</title>
            <meta name="title" content={finalTitle} />
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || defaultUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={imageUrl || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || defaultUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={imageUrl || defaultImage} />
        </Helmet>
    );
};

export default SEO;
