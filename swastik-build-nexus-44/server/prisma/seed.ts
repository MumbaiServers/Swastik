import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ─── Admin User ────────────────────────────────────────
    const hashedPassword = await bcrypt.hash('admin@123', 12);
    await prisma.adminUser.upsert({
        where: { email: 'admin@swastikgroup.com' },
        update: {},
        create: {
            email: 'admin@swastikgroup.com',
            password: hashedPassword,
            name: 'Swastik Admin',
            role: 'admin',
        },
    });
    console.log('✅ Admin user created (admin@swastikgroup.com / admin@123)');

    // ─── Hero Banner ───────────────────────────────────────
    await prisma.heroBanner.upsert({
        where: { id: 1 },
        update: {},
        create: {
            heading: 'Find Your Dream Home Today',
            subtext: "Discover premium residential properties in Mumbai's most sought-after locations",
        },
    });
    console.log('✅ Hero banner created');

    // ─── Sections ──────────────────────────────────────────
    const sections = [
        {
            sectionKey: 'who_we_are',
            title: 'Who we are?',
            content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each stage we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that are built to last expectations and leave a positive mark in the construction landscape.\n\nOur commitment to excellence and innovation drives us to create spaces that not only meet but exceed expectations, establishing lasting relationships built on trust and quality craftsmanship.`,
            sortOrder: 1,
        },
        {
            sectionKey: 'our_business',
            title: 'Our Business',
            content: `Swastik Group is a prime real estate company. We are known for our honesty, transparency, and the best. Premium quality work. As we've been working around for more than 25 years and creating amazing homes and business spaces that redefine luxury living. We focus on doing things correctly, and meeting deadlines. This approach has made us leaders in the real estate industry, respected for our commitment to ensuring our customers are satisfied with our work.`,
            sortOrder: 2,
        },
        {
            sectionKey: 'about_us_main',
            title: 'About Us',
            content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each single thing we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.`,
            sortOrder: 3,
        },
        {
            sectionKey: 'about_developer',
            title: 'About Developer',
            content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each single thing we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.`,
            sortOrder: 4,
        },
        {
            sectionKey: 'watch_our_story',
            title: 'Watch Our Story',
            content: 'Discover our journey in creating exceptional real estate experiences',
            extraData: 'https://www.youtube.com/embed/WUq4bKwC-nM?si=sBQAjI_kCXg4-Qwb',
            sortOrder: 5,
        },
    ];

    for (const section of sections) {
        await prisma.section.upsert({
            where: { sectionKey: section.sectionKey },
            update: {},
            create: section,
        });
    }
    console.log('✅ Sections created');

    // ─── Values, Vision & Mission ──────────────────────────
    const vvmItems = [
        {
            type: 'values',
            title: 'Our Values',
            content: 'Integrity, transparency, and excellence form the foundation of everything we do.',
            sortOrder: 1,
        },
        {
            type: 'vision',
            title: 'Our Vision',
            content: "To be Mumbai's most trusted real estate developer, creating sustainable communities.",
            sortOrder: 2,
        },
        {
            type: 'mission',
            title: 'Our Mission',
            content: 'Building quality homes that blend contemporary design with innovation and sustainability.',
            sortOrder: 3,
        },
    ];

    for (const item of vvmItems) {
        const existing = await prisma.valueVisionMission.findFirst({ where: { type: item.type } });
        if (!existing) {
            await prisma.valueVisionMission.create({ data: item });
        }
    }
    console.log('✅ Values, Vision & Mission created');

    // ─── Feature Cards (Why Choose Us) ─────────────────────
    const featureCards = [
        {
            page: 'home',
            title: 'Timely Delivery',
            description: "We're proud to finish projects on time within the delivery date.",
            sortOrder: 0,
        },
        {
            page: 'home',
            title: 'Professional Team',
            description: 'Our experienced team always aims for excellence, from planning projects to helping customers.',
            sortOrder: 1,
        },
        {
            page: 'home',
            title: 'Market Leadership',
            description: "We're leaders in redevelopment, known for quality work, on-time delivery, and being open with customers and partners.",
            sortOrder: 2,
        },
        {
            page: 'home',
            title: 'Minimal Bureaucracy',
            description: 'Our simple processes and 24/7 help make things easy for clients, creating a friendly and supportive atmosphere.',
            sortOrder: 3,
        },
    ];

    const existingCards = await prisma.featureCard.count();
    if (existingCards === 0) {
        await prisma.featureCard.createMany({ data: featureCards });
    }
    console.log('✅ Feature cards created');

    // ─── Statistics ────────────────────────────────────────
    const statistics = [
        { key: 'years_of_experience', label: 'Years of Experience', value: '25', suffix: '+', sortOrder: 0 },
        { key: 'sq_ft_developed', label: 'Million sq. ft. developed', value: '1.5', suffix: null, sortOrder: 1 },
        { key: 'happy_families', label: 'Happy Families', value: '1500', suffix: '+', sortOrder: 2 },
        { key: 'sq_ft_ongoing', label: 'Lakh sq. ft. ongoing', value: '6.5', suffix: null, sortOrder: 3 },
        { key: 'projects_completed', label: 'Projects are completed', value: '22', suffix: null, sortOrder: 4 },
        { key: 'projects_ongoing', label: 'Projects which are ongoing', value: '7', suffix: null, sortOrder: 5 },
    ];

    for (const stat of statistics) {
        await prisma.statistic.upsert({
            where: { key: stat.key },
            update: {},
            create: stat,
        });
    }
    console.log('✅ Statistics created');

    // ─── Locations (Our Presence) ──────────────────────────
    const locations = ['Chembur', 'Ghatkopar', 'Vikhroli', 'Mulund', 'Powai', 'Andheri'];
    const existingLocations = await prisma.location.count();
    if (existingLocations === 0) {
        await prisma.location.createMany({
            data: locations.map((name, index) => ({ name, sortOrder: index })),
        });
    }
    console.log('✅ Locations created');

    // ─── Social Media Links ────────────────────────────────
    const socialLinks = [
        { platform: 'facebook', url: 'https://facebook.com/swastikgroup', sortOrder: 0 },
        { platform: 'instagram', url: 'https://instagram.com/swastikgroup', sortOrder: 1 },
        { platform: 'linkedin', url: 'https://linkedin.com/company/swastikgroup', sortOrder: 2 },
        { platform: 'youtube', url: 'https://youtube.com/swastikgroup', sortOrder: 3 },
    ];

    const existingLinks = await prisma.socialMediaLink.count();
    if (existingLinks === 0) {
        await prisma.socialMediaLink.createMany({ data: socialLinks });
    }
    console.log('✅ Social media links created');

    // ─── Sample Projects ───────────────────────────────────
    const existingProjects = await prisma.project.count();
    if (existingProjects === 0) {
        const project = await prisma.project.create({
            data: {
                slug: 'swastik-pearl',
                name: 'Swastik Pearl',
                subtitle: 'Residential',
                location: 'Ghatkopar West',
                price: 'Starting at ₹70 Lakhs*',
                description: 'Luxury residential complex with modern amenities',
                fullDescription: 'Swastik Pearl is a luxury residential complex located in the heart of Ghatkopar West. With its modern amenities and contemporary design, it offers a premium living experience.',
                configuration: '1,2,3 BHK',
                status: 'ongoing',
                tag: 'Enquiry Now',
                maharera: 'P51800045216',
                sortOrder: 0,
            },
        });

        // Add configurations
        await prisma.projectConfiguration.createMany({
            data: [
                { projectId: project.id, type: '1 BHK', area: '418 RCA Sq. Ft', price: 'Click for price', sortOrder: 0 },
                { projectId: project.id, type: '2 BHK', area: '554 RCA Sq. Ft', price: 'Click for price', sortOrder: 1 },
                { projectId: project.id, type: '3 BHK', area: '746 RCA Sq. Ft', price: 'Click for price', sortOrder: 2 },
            ],
        });

        // Add amenities
        const amenities = [
            'Premier Gymnasium', "Children's Play Area", 'Day Care', 'Indoor Games',
            'Mini Theater', 'Reading Area', 'Gaming Zone', "Elder's Lounge",
            'Kids Pool', 'Pantry', 'Banquet Hall', 'Guest Rooms',
        ];
        await prisma.projectAmenity.createMany({
            data: amenities.map((name, index) => ({
                projectId: project.id,
                name,
                category: 'podium',
                sortOrder: index,
            })),
        });

        // Add connectivities
        const connectivities = [
            'Eastern Express Highway - 5 mins',
            'Ghatkopar Railway Station - 10 mins',
            'Metro Station - 8 mins',
            'R City Mall - 12 mins',
        ];
        await prisma.projectConnectivity.createMany({
            data: connectivities.map((text, index) => ({
                projectId: project.id,
                text,
                sortOrder: index,
            })),
        });

        console.log('✅ Sample project created with configurations, amenities & connectivities');
    }

    // ─── Sample FAQs ───────────────────────────────────────
    const existingFAQs = await prisma.fAQ.count();
    if (existingFAQs === 0) {
        await prisma.fAQ.createMany({
            data: [
                {
                    question: 'What types of properties does Swastik Group offer?',
                    answer: 'We offer a range of residential properties including 1 BHK, 2 BHK, and 3 BHK apartments, as well as commercial spaces.',
                    sortOrder: 0,
                },
                {
                    question: 'Where are your projects located?',
                    answer: 'Our projects are located across prime locations in Mumbai including Ghatkopar, Chembur, Vikhroli, Mulund, Powai, and Andheri.',
                    sortOrder: 1,
                },
                {
                    question: 'What is the payment process?',
                    answer: 'We offer flexible payment plans. Please contact our sales team for detailed information on payment schedules and financing options.',
                    sortOrder: 2,
                },
            ],
        });
        console.log('✅ Sample FAQs created');
    }

    console.log('\n🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
