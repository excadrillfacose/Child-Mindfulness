// Enhanced SEO optimization utilities
class EnhancedSEOOptimizer {
    constructor() {
        // Delay initialization to ensure DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Enhanced SEO Optimizer...');
        this.addStructuredData();
        this.optimizeMetaTags();
        this.addOpenGraphTags();
        this.addTwitterCards();
        this.generateSitemap();
        this.addCanonicalUrl();
        this.addLanguageTag();
        this.addPageSpecificMetaTags();
        this.addBreadcrumbStructuredData();
    }

    addStructuredData() {
        try {
            // Check if structured data already exists
            if (document.querySelector('script[type="application/ld+json"]')) {
                console.log('Structured data already exists, skipping...');
                return;
            }
            
            // Person schema for Caterina Figlioli
            const personData = {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Caterina Figlioli",
                "jobTitle": "Mindfulness Practitioner",
                "description": "Mindfulness educator specializing in child and adolescent mindfulness practices",
                "url": window.location.origin,
                "image": `${window.location.origin}/fotoprofilo.png`,
                "sameAs": [
                    "https://www.facebook.com/caterina.figlioli",
                    "https://www.instagram.com/caterina_figlioli",
                    "https://www.linkedin.com/in/caterina-figlioli"
                ],
                "knowsLanguage": ["it", "en"],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Mindfulness Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Mindfulness for Children",
                                "description": "Mindfulness sessions designed for children to develop focus, emotional regulation, and well-being",
                                "provider": {
                                    "@type": "Person",
                                    "name": "Caterina Figlioli"
                                }
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Listening Desk",
                                "description": "Support and listening services for children and parents to navigate emotional challenges",
                                "provider": {
                                    "@type": "Person",
                                    "name": "Caterina Figlioli"
                                }
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Mindfulness Workshops",
                                "description": "Group workshops for schools, families, and organizations to learn mindfulness practices",
                                "provider": {
                                    "@type": "Person",
                                    "name": "Caterina Figlioli"
                                }
                            }
                        }
                    ]
                }
            };

            // Local Business schema for better local SEO
            const localBusinessData = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Caterina Figlioli Mindfulness",
                "image": `${window.location.origin}/fotoprofilo.png`,
                "url": window.location.origin,
                "telephone": "+393392005278",
                "email": "caterinafiglioli1970@gmail.com",
                "priceRange": "€€",
                "description": "Servizi di mindfulness e benessere per bambini, adolescenti e adulti",
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                ],
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IT",
                    "addressLocality": "Italia"
                }
            };

            // Add person schema
            const personScript = document.createElement('script');
            personScript.type = 'application/ld+json';
            personScript.textContent = JSON.stringify(personData);
            document.head.appendChild(personScript);

            // Add local business schema
            const businessScript = document.createElement('script');
            businessScript.type = 'application/ld+json';
            businessScript.textContent = JSON.stringify(localBusinessData);
            document.head.appendChild(businessScript);
            
            console.log('Structured data added successfully');
        } catch (error) {
            console.error('Error adding structured data:', error);
        }
    }

    addBreadcrumbStructuredData() {
        // Get current page path
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '');
        
        // Create breadcrumb data based on current page
        let breadcrumbItems = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://caterinafiglioli.it/"
            }
        ];
        
        // Add second level if not on homepage
        if (pageName && pageName !== 'index') {
            let pageTitle = '';
            
            // Map page names to human-readable titles
            switch(pageName) {
                case 'embed0':
                    pageTitle = 'Profilo';
                    break;
                case 'embed1':
                    pageTitle = 'Mindfulness';
                    break;
                case 'embed2':
                    pageTitle = 'Video Gratuiti';
                    break;
                case 'embed3':
                    pageTitle = 'Sportello di Ascolto';
                    break;
                case 'embed4':
                    pageTitle = 'Blog';
                    break;
                default:
                    pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);
            }
            
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": 2,
                "name": pageTitle,
                "item": `https://caterinafiglioli.it/${pageName}.html`
            });
        }
        
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
        };
        
        const breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
        document.head.appendChild(breadcrumbScript);
    }

    optimizeMetaTags() {
        const metaTags = [
            { name: 'description', content: 'Caterina Figlioli - Esperta di mindfulness specializzata in pratiche per bambini e adolescenti. Offre sessioni di mindfulness, sportello di ascolto e risorse educative per il benessere mentale.' },
            { name: 'keywords', content: 'mindfulness, mindfulness bambini, mindfulness adolescenti, educazione mindfulness, sportello di ascolto, Caterina Figlioli, benessere mentale, meditazione, yoga per bambini, consapevolezza' },
            { name: 'author', content: 'Caterina Figlioli' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { name: 'googlebot', content: 'index, follow' },
            { property: 'og:locale', content: 'it_IT' },
            { name: 'theme-color', content: '#5A67D8' },
            { name: 'format-detection', content: 'telephone=yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
            { name: 'apple-mobile-web-app-title', content: 'Caterina Figlioli Mindfulness' }
        ];

        metaTags.forEach(tag => {
            // Check if meta tag already exists
            const existingTag = document.querySelector(`meta[${Object.keys(tag)[0]}="${Object.values(tag)[0]}"]`);
            if (!existingTag) {
                const meta = document.createElement('meta');
                Object.keys(tag).forEach(key => {
                    meta.setAttribute(key, tag[key]);
                });
                document.head.appendChild(meta);
            }
        });
    }

    addOpenGraphTags() {
        // Get current page info
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '');
        const pageTitle = document.title || 'Caterina Figlioli - Mindfulness Educator';
        
        const ogTags = [
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: 'Esperta di mindfulness specializzata in pratiche per bambini e adolescenti. Scopri come la mindfulness può migliorare il benessere di tutta la famiglia.' },
            { property: 'og:url', content: `https://caterinafiglioli.it/${pageName === 'index' ? '' : pageName + '.html'}` },
            { property: 'og:site_name', content: 'Caterina Figlioli Mindfulness' },
            { property: 'og:image', content: 'https://caterinafiglioli.it/fotoprofilo.png' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:alt', content: 'Caterina Figlioli - Esperta di Mindfulness per bambini e adulti' },
            { property: 'og:locale', content: 'it_IT' }
        ];

        ogTags.forEach(tag => {
            // Check if OG tag already exists
            const existingTag = document.querySelector(`meta[property="${tag.property}"]`);
            if (existingTag) {
                existingTag.setAttribute('content', tag.content);
            } else {
                const meta = document.createElement('meta');
                Object.keys(tag).forEach(key => {
                    meta.setAttribute(key, tag[key]);
                });
                document.head.appendChild(meta);
            }
        });
    }

    addTwitterCards() {
        const pageTitle = document.title || 'Caterina Figlioli - Mindfulness Educator';
        
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: 'Esperta di mindfulness specializzata in pratiche per bambini e adolescenti. Scopri come la mindfulness può migliorare il benessere di tutta la famiglia.' },
            { name: 'twitter:image', content: 'https://caterinafiglioli.it/fotoprofilo.png' },
            { name: 'twitter:image:alt', content: 'Caterina Figlioli - Esperta di Mindfulness' },
            { name: 'twitter:site', content: '@CaterinaFiglioli' },
            { name: 'twitter:creator', content: '@CaterinaFiglioli' }
        ];

        twitterTags.forEach(tag => {
            // Check if Twitter tag already exists
            const existingTag = document.querySelector(`meta[name="${tag.name}"]`);
            if (existingTag) {
                existingTag.setAttribute('content', tag.content);
            } else {
                const meta = document.createElement('meta');
                Object.keys(tag).forEach(key => {
                    meta.setAttribute(key, tag[key]);
                });
                document.head.appendChild(meta);
            }
        });
    }

    generateSitemap() {
        // Generate comprehensive sitemap XML with all pages
        const today = new Date().toISOString().split('T')[0];
        
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://caterinafiglioli.it/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/embed0.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/embed1.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/embed2.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/embed3.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://caterinafiglioli.it/embed4.html</loc>
        <lastmod>${today}</lastmod>
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
                
                // Create a download link for the sitemap (for development purposes)
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = 'sitemap.xml';
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                
                // Only trigger download in development environment
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    downloadLink.click();
                }
                
                document.body.removeChild(downloadLink);
            });
    }

    addCanonicalUrl() {
        // Remove any existing canonical links
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }
        
        // Get current page path
        const path = window.location.pathname;
        const pageName = path.split('/').pop();
        
        // Create canonical URL based on current page
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        
        if (pageName === '' || pageName === 'index.html') {
            canonical.href = 'https://caterinafiglioli.it/';
        } else {
            canonical.href = `https://caterinafiglioli.it/${pageName}`;
        }
        
        document.head.appendChild(canonical);
    }

    addLanguageTag() {
        // Set the language attribute on the html tag
        const htmlTag = document.querySelector('html');
        if (htmlTag && !htmlTag.getAttribute('lang')) {
            htmlTag.setAttribute('lang', 'it');
        }
        
        // Add alternate language links if needed
        const alternateLink = document.createElement('link');
        alternateLink.rel = 'alternate';
        alternateLink.hreflang = 'it';
        alternateLink.href = window.location.href;
        document.head.appendChild(alternateLink);
    }

    addPageSpecificMetaTags() {
        // Get current page path
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '');
        
        // Add page-specific meta tags based on current page
        let pageDescription = '';
        let pageKeywords = '';
        
        switch(pageName) {
            case 'index':
            case '':
                pageDescription = 'Caterina Figlioli - Esperta di mindfulness per bambini e adulti. Scopri i percorsi di mindfulness, yoga e benessere per tutta la famiglia.';
                pageKeywords = 'mindfulness, yoga, benessere, meditazione, Caterina Figlioli';
                break;
            case 'embed0':
                pageDescription = 'Accedi o registrati per gestire il tuo profilo e accedere ai contenuti esclusivi di Caterina Figlioli.';
                pageKeywords = 'login, registrazione, profilo, account, Caterina Figlioli';
                break;
            case 'embed1':
                pageDescription = 'Scopri i benefici della mindfulness per bambini, adolescenti e adulti. Percorsi personalizzati per migliorare concentrazione, gestione emotiva e benessere.';
                pageKeywords = 'mindfulness bambini, mindfulness adolescenti, benefici mindfulness, meditazione, consapevolezza';
                break;
            case 'embed2':
                pageDescription = 'Video gratuiti di mindfulness e meditazione guidata per iniziare il tuo percorso di consapevolezza con Caterina Figlioli.';
                pageKeywords = 'video mindfulness, meditazione guidata, video gratuiti, pratiche mindfulness, esercizi di consapevolezza';
                break;
            case 'embed3':
                pageDescription = 'Sportello di ascolto per bambini, adolescenti e genitori. Un supporto professionale per affrontare sfide emotive e relazionali.';
                pageKeywords = 'sportello ascolto, supporto emotivo, consulenza mindfulness, ascolto bambini, supporto genitori';
                break;
            case 'embed4':
                pageDescription = 'Blog di Caterina Figlioli con articoli, approfondimenti e consigli su mindfulness, yoga, benessere e crescita personale.';
                pageKeywords = 'blog mindfulness, articoli yoga, consigli benessere, crescita personale, meditazione';
                break;
            default:
                pageDescription = 'Caterina Figlioli - Esperta di mindfulness specializzata in pratiche per bambini e adolescenti.';
                pageKeywords = 'mindfulness, yoga, benessere, meditazione, Caterina Figlioli';
        }
        
        // Update description meta tag
        let descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', pageDescription);
        } else {
            descriptionTag = document.createElement('meta');
            descriptionTag.setAttribute('name', 'description');
            descriptionTag.setAttribute('content', pageDescription);
            document.head.appendChild(descriptionTag);
        }
        
        // Update keywords meta tag
        let keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            keywordsTag.setAttribute('content', pageKeywords);
        } else {
            keywordsTag = document.createElement('meta');
            keywordsTag.setAttribute('name', 'keywords');
            keywordsTag.setAttribute('content', pageKeywords);
            document.head.appendChild(keywordsTag);
        }
    }
}

// Initialize Enhanced SEO optimizer
const enhancedSeoOptimizer = new EnhancedSEOOptimizer();
