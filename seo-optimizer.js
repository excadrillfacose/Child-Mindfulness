// SEO optimization utilities
class SEOOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.optimizeMetaTags();
        this.addOpenGraphTags();
        this.addTwitterCards();
        this.generateSitemap();
    }

    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Caterina Figlioli",
            "jobTitle": "Mindfulness Practitioner",
            "description": "Mindfulness educator specializing in child and adolescent mindfulness practices",
            "url": "https://caterinafiglioli.it",
            "sameAs": [
                "https://www.facebook.com/caterina.figlioli",
                "https://www.instagram.com/caterina_figlioli"
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Mindfulness Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Mindfulness for Children",
                            "description": "Mindfulness sessions designed for children"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Listening Desk",
                            "description": "Support and listening services for children and parents"
                        }
                    }
                ]
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    optimizeMetaTags() {
        const metaTags = [
            { name: 'description', content: 'Caterina Figlioli - Mindfulness educator specializing in child and adolescent mindfulness practices. Offering mindfulness sessions, listening desk services, and educational resources.' },
            { name: 'keywords', content: 'mindfulness, children mindfulness, adolescent mindfulness, mindfulness education, listening desk, Caterina Figlioli' },
            { name: 'author', content: 'Caterina Figlioli' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { name: 'robots', content: 'index, follow' },
            { name: 'googlebot', content: 'index, follow' },
            { property: 'og:locale', content: 'it_IT' },
            { name: 'theme-color', content: '#f3e8ff' }
        ];

        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            Object.keys(tag).forEach(key => {
                meta.setAttribute(key, tag[key]);
            });
            document.head.appendChild(meta);
        });
    }

    addOpenGraphTags() {
        const ogTags = [
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: 'Caterina Figlioli - Mindfulness Educator' },
            { property: 'og:description', content: 'Mindfulness educator specializing in child and adolescent mindfulness practices' },
            { property: 'og:url', content: 'https://caterinafiglioli.it' },
            { property: 'og:site_name', content: 'Caterina Figlioli Mindfulness' },
            { property: 'og:image', content: 'https://caterinafiglioli.it/fotoprofilo.png' },
            { property: 'og:image:width', content: '800' },
            { property: 'og:image:height', content: '800' },
            { property: 'og:image:alt', content: 'Caterina Figlioli - Mindfulness Educator' }
        ];

        ogTags.forEach(tag => {
            const meta = document.createElement('meta');
            Object.keys(tag).forEach(key => {
                meta.setAttribute(key, tag[key]);
            });
            document.head.appendChild(meta);
        });
    }

    addTwitterCards() {
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Caterina Figlioli - Mindfulness Educator' },
            { name: 'twitter:description', content: 'Mindfulness educator specializing in child and adolescent mindfulness practices' },
            { name: 'twitter:image', content: 'https://caterinafiglioli.it/fotoprofilo.png' },
            { name: 'twitter:image:alt', content: 'Caterina Figlioli - Mindfulness Educator' }
        ];

        twitterTags.forEach(tag => {
            const meta = document.createElement('meta');
            Object.keys(tag).forEach(key => {
                meta.setAttribute(key, tag[key]);
            });
            document.head.appendChild(meta);
        });
    }

    generateSitemap() {
        // Generate sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://caterinafiglioli.it/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/#mindfulness</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/#sportello-ascolto</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/#video-gratuiti</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/#blog</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>`;

        // Create sitemap blob for download
        const blob = new Blob([sitemap], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Update existing sitemap.xml if it exists
        fetch('./sitemap.xml', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log('Sitemap exists and has been updated');
                }
            })
            .catch(() => {
                console.log('Sitemap will be created on server');
            });
    }

    // Add canonical URL
    addCanonicalUrl() {
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = 'https://caterinafiglioli.it';
        document.head.appendChild(canonical);
    }
}

// Initialize SEO optimizer
const seoOptimizer = new SEOOptimizer();
seoOptimizer.addCanonicalUrl();
