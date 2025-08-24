/**
 * SEO Enhancer - Main SEO optimization engine
 * Dynamically enhances SEO without modifying existing HTML structure
 * Author: SEO Enhancement System
 * Version: 1.0.0
 */

class SEOEnhancer {
    constructor() {
        this.siteConfig = {
            siteName: "Caterina Figlioli - Mindfulness e Benessere",
            siteUrl: "https://mindfulnesscaterina.it",
            defaultImage: "/fotoprofilo.png",
            businessName: "Caterina Figlioli",
            businessType: "HealthAndBeautyBusiness",
            locale: "it_IT",
            language: "it",
            author: "Caterina Figlioli",
            email: "caterinafiglioli1970@gmail.com",
            phone: "+393392005278",
            address: {
                streetAddress: "",
                addressLocality: "Italia",
                addressCountry: "IT"
            }
        };

        this.pageConfigs = {
            'index.html': {
                title: "Caterina Figlioli - Mindfulness e Benessere per Bambini e Adulti",
                description: "Scopri i percorsi di mindfulness e yoga con Caterina Figlioli. Corsi per bambini, adulti e famiglie. Certificazioni professionali e sportello di ascolto psicologico.",
                keywords: "mindfulness, yoga, bambini, adulti, benessere, meditazione, consapevolezza, stress, ansia, Caterina Figlioli",
                type: "website",
                breadcrumbs: [
                    { name: "Home", url: "/" }
                ]
            },
            'embed1.html': {
                title: "Mindfulness per Bambini e Adulti - Corsi e Benefici",
                description: "Esplora i benefici della mindfulness per ogni età. Corsi specializzati per bambini, adolescenti e adulti. Ricerca scientifica e metodologie evidence-based.",
                keywords: "mindfulness bambini, mindfulness adulti, corsi mindfulness, benefici meditazione, MBSR, MBCT, consapevolezza",
                type: "article",
                breadcrumbs: [
                    { name: "Home", url: "/" },
                    { name: "Mindfulness", url: "/embed1.html" }
                ]
            },
            'embed2.html': {
                title: "Video Gratuiti di Mindfulness e Meditazione",
                description: "Accedi alla collezione di video gratuiti di mindfulness e meditazione guidata. Pratiche per principianti e avanzati, tecniche di rilassamento e benessere.",
                keywords: "video mindfulness, meditazione guidata, video gratuiti, rilassamento, tecniche meditazione, pratiche mindfulness",
                type: "article",
                breadcrumbs: [
                    { name: "Home", url: "/" },
                    { name: "Video Gratuiti", url: "/embed2.html" }
                ]
            },
            'embed3.html': {
                title: "Sportello di Ascolto Psicologico - Supporto e Consulenza",
                description: "Servizio di sportello di ascolto psicologico professionale. Supporto per bambini, adolescenti e adulti. Consulenze individuali e di gruppo.",
                keywords: "sportello ascolto, supporto psicologico, consulenza, benessere mentale, aiuto psicologico, sostegno emotivo",
                type: "service",
                breadcrumbs: [
                    { name: "Home", url: "/" },
                    { name: "Sportello di Ascolto", url: "/embed3.html" }
                ]
            },
            'embed4.html': {
                title: "Blog Mindfulness - Articoli e Approfondimenti",
                description: "Leggi gli ultimi articoli su mindfulness, benessere e crescita personale. Approfondimenti scientifici, consigli pratici e guide per la pratica quotidiana.",
                keywords: "blog mindfulness, articoli benessere, crescita personale, consigli mindfulness, approfondimenti meditazione",
                type: "blog",
                breadcrumbs: [
                    { name: "Home", url: "/" },
                    { name: "Blog", url: "/embed4.html" }
                ]
            },
            'embed0.html': {
                title: "Area Personale - Account e Servizi",
                description: "Accedi alla tua area personale per gestire i tuoi corsi, prenotazioni e contenuti esclusivi di mindfulness e benessere.",
                keywords: "area personale, account, login, corsi mindfulness, prenotazioni, contenuti esclusivi",
                type: "webapp",
                breadcrumbs: [
                    { name: "Home", url: "/" },
                    { name: "Area Personale", url: "/embed0.html" }
                ]
            }
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.enhance());
        } else {
            this.enhance();
        }
    }

    enhance() {
        const currentPage = this.getCurrentPage();
        const config = this.pageConfigs[currentPage] || this.pageConfigs['index.html'];

        this.enhanceMetaTags(config);
        this.addStructuredData(config);
        this.addOpenGraphTags(config);
        this.addTwitterCardTags(config);
        this.addBreadcrumbs(config.breadcrumbs);
        this.addCanonicalUrl();
        this.optimizeImages();
        this.addLanguageAlternates();
        this.enhanceInternalLinks();
        this.addRichSnippets(config);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.includes('.html') ? filename : 'index.html';
    }

    enhanceMetaTags(config) {
        // Update or create title
        document.title = config.title;

        // Meta description
        this.updateOrCreateMeta('description', config.description);

        // Meta keywords
        this.updateOrCreateMeta('keywords', config.keywords);

        // Author
        this.updateOrCreateMeta('author', this.siteConfig.author);

        // Robots
        this.updateOrCreateMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Viewport (ensure it exists)
        this.updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');

        // Language
        document.documentElement.lang = this.siteConfig.language;

        // Theme color
        this.updateOrCreateMeta('theme-color', '#5A67D8');

        // Additional SEO meta tags
        this.updateOrCreateMeta('revisit-after', '7 days');
        this.updateOrCreateMeta('distribution', 'global');
        this.updateOrCreateMeta('rating', 'general');
        this.updateOrCreateMeta('referrer', 'origin-when-cross-origin');
    }

    updateOrCreateMeta(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    addStructuredData(config) {
        // Remove existing structured data
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(script => {
            if (script.dataset.seoEnhancer) {
                script.remove();
            }
        });

        const structuredData = [];

        // Organization/Person Schema
        structuredData.push({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": this.siteConfig.businessName,
            "url": this.siteConfig.siteUrl,
            "email": this.siteConfig.email,
            "telephone": this.siteConfig.phone,
            "jobTitle": "Insegnante di Mindfulness e Yoga",
            "description": "Esperta in mindfulness e benessere per bambini e adulti, certificata in Hatha Yoga, Ashtanga Vinyasa, Yin Yoga e Yoga Nidra",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": this.siteConfig.address.addressCountry,
                "addressLocality": this.siteConfig.address.addressLocality
            },
            "sameAs": [
                "https://www.instagram.com/caterinafiglioli",
                "https://www.facebook.com/caterinafiglioli"
            ],
            "knowsAbout": [
                "Mindfulness",
                "Yoga",
                "Meditazione",
                "Benessere infantile",
                "Gestione dello stress",
                "Yoga Nidra",
                "Hatha Yoga",
                "Ashtanga Vinyasa"
            ]
        });

        // Website Schema
        structuredData.push({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": this.siteConfig.siteName,
            "url": this.siteConfig.siteUrl,
            "description": "Piattaforma di mindfulness e benessere per bambini e adulti con Caterina Figlioli",
            "inLanguage": this.siteConfig.language,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": this.siteConfig.siteUrl + "?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        });

        // Service Schema for mindfulness courses
        if (config.type === 'article' || config.type === 'service') {
            structuredData.push({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Corsi di Mindfulness e Yoga",
                "description": "Corsi professionali di mindfulness e yoga per bambini, adolescenti e adulti",
                "provider": {
                    "@type": "Person",
                    "name": this.siteConfig.businessName
                },
                "serviceType": "Mindfulness Training",
                "areaServed": "Italia",
                "availableLanguage": "Italian",
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "priceCurrency": "EUR"
                }
            });
        }

        // Course Schema for specific training programs
        if (window.location.pathname.includes('embed1')) {
            structuredData.push({
                "@context": "https://schema.org",
                "@type": "Course",
                "name": "Corso di Mindfulness per Bambini e Adulti",
                "description": "Corso completo di mindfulness basato su evidenze scientifiche per tutte le età",
                "provider": {
                    "@type": "Person",
                    "name": this.siteConfig.businessName
                },
                "courseMode": ["onsite", "online"],
                "inLanguage": "it",
                "teaches": [
                    "Tecniche di mindfulness",
                    "Gestione dello stress",
                    "Meditazione guidata",
                    "Consapevolezza corporea",
                    "Regolazione emotiva"
                ]
            });
        }

        // Add all structured data to page
        structuredData.forEach(data => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.seoEnhancer = 'true';
            script.textContent = JSON.stringify(data);
            document.head.appendChild(script);
        });
    }

    addOpenGraphTags(config) {
        const ogTags = {
            'og:title': config.title,
            'og:description': config.description,
            'og:type': config.type === 'article' ? 'article' : 'website',
            'og:url': this.siteConfig.siteUrl + window.location.pathname,
            'og:site_name': this.siteConfig.siteName,
            'og:locale': this.siteConfig.locale,
            'og:image': this.siteConfig.siteUrl + this.siteConfig.defaultImage,
            'og:image:width': '400',
            'og:image:height': '400',
            'og:image:alt': this.siteConfig.businessName + ' - Mindfulness e Benessere'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            this.updateOrCreateMetaProperty(property, content);
        });
    }

    addTwitterCardTags(config) {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': config.title,
            'twitter:description': config.description,
            'twitter:image': this.siteConfig.siteUrl + this.siteConfig.defaultImage,
            'twitter:site': '@caterinafiglioli',
            'twitter:creator': '@caterinafiglioli'
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            this.updateOrCreateMetaName(name, content);
        });
    }

    updateOrCreateMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    updateOrCreateMetaName(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    addBreadcrumbs(breadcrumbs) {
        if (!breadcrumbs || breadcrumbs.length === 0) return;

        // Remove existing breadcrumbs
        const existingBreadcrumbs = document.querySelector('.seo-breadcrumbs');
        if (existingBreadcrumbs) {
            existingBreadcrumbs.remove();
        }

        // Create breadcrumb structured data
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": this.siteConfig.siteUrl + crumb.url
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.seoEnhancer = 'true';
        script.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);

        // Create visible breadcrumbs (optional)
        if (breadcrumbs.length > 1) {
            const breadcrumbNav = document.createElement('nav');
            breadcrumbNav.className = 'seo-breadcrumbs';
            breadcrumbNav.setAttribute('aria-label', 'Breadcrumb');
            breadcrumbNav.style.cssText = `
                padding: 0.5rem 1rem;
                background: rgba(255,255,255,0.9);
                font-size: 0.875rem;
                border-bottom: 1px solid #e5e7eb;
            `;

            const breadcrumbList = document.createElement('ol');
            breadcrumbList.style.cssText = `
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                gap: 0.5rem;
            `;

            breadcrumbs.forEach((crumb, index) => {
                const listItem = document.createElement('li');
                listItem.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                `;

                if (index < breadcrumbs.length - 1) {
                    const link = document.createElement('a');
                    link.href = crumb.url;
                    link.textContent = crumb.name;
                    link.style.cssText = `
                        color: #5A67D8;
                        text-decoration: none;
                    `;
                    listItem.appendChild(link);

                    const separator = document.createElement('span');
                    separator.textContent = '›';
                    separator.style.color = '#9CA3AF';
                    listItem.appendChild(separator);
                } else {
                    const span = document.createElement('span');
                    span.textContent = crumb.name;
                    span.style.color = '#6B7280';
                    listItem.appendChild(span);
                }

                breadcrumbList.appendChild(listItem);
            });

            breadcrumbNav.appendChild(breadcrumbList);

            // Insert after header
            const header = document.querySelector('header');
            if (header && header.nextSibling) {
                header.parentNode.insertBefore(breadcrumbNav, header.nextSibling);
            }
        }
    }

    addCanonicalUrl() {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = this.siteConfig.siteUrl + window.location.pathname;
    }

    addLanguageAlternates() {
        // Add hreflang for Italian
        let hreflang = document.querySelector('link[hreflang="it"]');
        if (!hreflang) {
            hreflang = document.createElement('link');
            hreflang.rel = 'alternate';
            hreflang.hreflang = 'it';
            hreflang.href = this.siteConfig.siteUrl + window.location.pathname;
            document.head.appendChild(hreflang);
        }
    }

    optimizeImages() {
        const images = document.querySelectorAll('img:not([data-seo-optimized])');
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Ensure alt text exists
            if (!img.alt && img.src) {
                const filename = img.src.split('/').pop().split('.')[0];
                img.alt = `${this.siteConfig.businessName} - ${filename}`;
            }

            // Add structured data for images
            if (img.src && !img.dataset.seoOptimized) {
                img.dataset.seoOptimized = 'true';
            }
        });
    }

    enhanceInternalLinks() {
        const links = document.querySelectorAll('a[href]:not([data-seo-enhanced])');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Add title attribute if missing
            if (!link.title && link.textContent) {
                link.title = link.textContent.trim();
            }

            // Mark external links
            if (href && (href.startsWith('http') && !href.includes(this.siteConfig.siteUrl))) {
                link.rel = 'noopener noreferrer';
                link.target = '_blank';
            }

            link.dataset.seoEnhanced = 'true';
        });
    }

    addRichSnippets(config) {
        // FAQ Schema for mindfulness pages
        if (config.type === 'article' && window.location.pathname.includes('embed1')) {
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Cos'è la mindfulness?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "La mindfulness è un'attenzione speciale che si porta al momento presente, con intenzione e senza giudizio. È una pratica che aiuta a coltivare una presenza mentale più profonda e una maggiore serenità."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "La mindfulness è adatta ai bambini?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sì, la mindfulness è molto benefica per i bambini. Aiuta a migliorare l'attenzione, ridurre l'ansia, sviluppare la regolazione emotiva e favorire un sonno più riposante."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Quali sono i benefici della mindfulness per gli adulti?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Gli adulti possono beneficiare della mindfulness attraverso la riduzione dello stress e dell'ansia, il miglioramento della concentrazione, una migliore regolazione emotiva e relazioni interpersonali più armoniose."
                        }
                    }
                ]
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.seoEnhancer = 'true';
            script.textContent = JSON.stringify(faqSchema);
            document.head.appendChild(script);
        }
    }

    // Public method to update SEO for dynamic content
    updateSEO(newConfig) {
        Object.assign(this.pageConfigs[this.getCurrentPage()], newConfig);
        this.enhance();
    }
}

// Initialize SEO Enhancer
window.SEOEnhancer = new SEOEnhancer();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOEnhancer;
}
