/**
 * Sitemap Generator - Dynamic XML sitemap creation and management
 * Automatically generates and updates sitemaps for better SEO
 * Author: SEO Enhancement System
 * Version: 1.0.0
 */

class SitemapGenerator {
    constructor() {
        this.config = {
            siteUrl: 'https://mindfulnesscaterina.it',
            defaultChangeFreq: 'weekly',
            defaultPriority: '0.8',
            excludePatterns: [
                '/admin/',
                '/private/',
                '/api/',
                '*.json',
                '*.xml'
            ]
        };

        this.pages = [
            {
                url: '/',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: '1.0',
                title: 'Home - Caterina Figlioli Mindfulness',
                description: 'Pagina principale del sito di mindfulness e benessere'
            },
            {
                url: '/index.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: '1.0',
                title: 'Home - Caterina Figlioli Mindfulness',
                description: 'Pagina principale del sito di mindfulness e benessere'
            },
            {
                url: '/embed1.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: '0.9',
                title: 'Mindfulness per Bambini e Adulti',
                description: 'Corsi e benefici della mindfulness per tutte le età'
            },
            {
                url: '/embed2.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: '0.8',
                title: 'Video Gratuiti di Mindfulness',
                description: 'Collezione di video gratuiti per la pratica della mindfulness'
            },
            {
                url: '/embed3.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'monthly',
                priority: '0.7',
                title: 'Sportello di Ascolto Psicologico',
                description: 'Servizio di supporto e consulenza psicologica'
            },
            {
                url: '/embed4.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'daily',
                priority: '0.8',
                title: 'Blog Mindfulness',
                description: 'Articoli e approfondimenti su mindfulness e benessere'
            },
            {
                url: '/embed0.html',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'monthly',
                priority: '0.5',
                title: 'Area Personale',
                description: 'Area riservata per utenti registrati'
            }
        ];

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.generateSitemap());
        } else {
            this.generateSitemap();
        }

        // Auto-update sitemap periodically
        this.scheduleUpdates();
    }

    generateSitemap() {
        const sitemap = this.createXMLSitemap();
        const sitemapIndex = this.createSitemapIndex();
        
        // Store sitemaps in localStorage for retrieval
        localStorage.setItem('generated_sitemap', sitemap);
        localStorage.setItem('sitemap_index', sitemapIndex);
        localStorage.setItem('sitemap_last_updated', new Date().toISOString());

        // Create downloadable sitemap
        this.createDownloadableSitemap(sitemap);
        
        // Submit to search engines (if in production)
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            this.submitToSearchEngines();
        }

        console.log('Sitemap Generator: XML sitemap generated successfully');
    }

    createXMLSitemap() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
        xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
        xml += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

        this.pages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${this.config.siteUrl}${page.url}</loc>\n`;
            xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;

            // Add image sitemap entries
            const images = this.getPageImages(page.url);
            images.forEach(image => {
                xml += '    <image:image>\n';
                xml += `      <image:loc>${this.config.siteUrl}${image.src}</image:loc>\n`;
                xml += `      <image:title>${image.title}</image:title>\n`;
                xml += `      <image:caption>${image.caption}</image:caption>\n`;
                xml += '    </image:image>\n';
            });

            xml += '  </url>\n';
        });

        xml += '</urlset>';
        return xml;
    }

    createSitemapIndex() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        // Main sitemap
        xml += '  <sitemap>\n';
        xml += `    <loc>${this.config.siteUrl}/sitemap.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += '  </sitemap>\n';

        // Images sitemap
        xml += '  <sitemap>\n';
        xml += `    <loc>${this.config.siteUrl}/sitemap-images.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += '  </sitemap>\n';

        xml += '</sitemapindex>';
        return xml;
    }

    getPageImages(pageUrl) {
        const images = [];
        
        // Define images for each page
        const pageImages = {
            '/': [
                {
                    src: '/fotoprofilo.png',
                    title: 'Caterina Figlioli - Insegnante di Mindfulness',
                    caption: 'Foto profilo di Caterina Figlioli, esperta in mindfulness e yoga'
                },
                {
                    src: '/attestato1.png',
                    title: 'Certificazione Yoga Nidra',
                    caption: 'Attestato di formazione per insegnanti Yoga Nidra'
                },
                {
                    src: '/attestato2.png',
                    title: 'Certificazione Hatha e Ashtanga Vinyasa Yoga Avanzata',
                    caption: 'Corso di formazione avanzata per insegnanti di Hatha e Ashtanga Vinyasa Yoga'
                },
                {
                    src: '/attestato3.png',
                    title: 'Certificazione Yoga e Mindfulness per Bambini',
                    caption: 'Corso di formazione per insegnanti di Yoga e Mindfulness per bambini'
                },
                {
                    src: '/attestato4.png',
                    title: 'Certificazione Hatha e Ashtanga Vinyasa Yoga',
                    caption: 'Corso di formazione per insegnanti di Hatha e Ashtanga Vinyasa Yoga'
                },
                {
                    src: '/attestato5.png',
                    title: 'Certificazione Yin Yoga',
                    caption: 'Corso di formazione per insegnanti di Yin Yoga'
                }
            ],
            '/index.html': [
                {
                    src: '/fotoprofilo.png',
                    title: 'Caterina Figlioli - Insegnante di Mindfulness',
                    caption: 'Foto profilo di Caterina Figlioli, esperta in mindfulness e yoga'
                }
            ],
            '/embed1.html': [
                {
                    src: '/fotoprofilo.png',
                    title: 'Mindfulness per Bambini e Adulti',
                    caption: 'Caterina Figlioli insegna mindfulness per tutte le età'
                }
            ],
            '/embed2.html': [
                {
                    src: '/fotoprofilo.png',
                    title: 'Video Mindfulness Gratuiti',
                    caption: 'Accesso a video gratuiti di mindfulness e meditazione'
                }
            ],
            '/embed3.html': [
                {
                    src: '/fotoprofilo.png',
                    title: 'Sportello di Ascolto Psicologico',
                    caption: 'Servizio di supporto psicologico professionale'
                }
            ],
            '/embed4.html': [
                {
                    src: '/fotoprofilo.png',
                    title: 'Blog Mindfulness',
                    caption: 'Articoli e approfondimenti su mindfulness e benessere'
                }
            ]
        };

        return pageImages[pageUrl] || [];
    }

    createImagesSitemap() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
        xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

        this.pages.forEach(page => {
            const images = this.getPageImages(page.url);
            if (images.length > 0) {
                xml += '  <url>\n';
                xml += `    <loc>${this.config.siteUrl}${page.url}</loc>\n`;
                
                images.forEach(image => {
                    xml += '    <image:image>\n';
                    xml += `      <image:loc>${this.config.siteUrl}${image.src}</image:loc>\n`;
                    xml += `      <image:title>${this.escapeXml(image.title)}</image:title>\n`;
                    xml += `      <image:caption>${this.escapeXml(image.caption)}</image:caption>\n`;
                    xml += '    </image:image>\n';
                });
                
                xml += '  </url>\n';
            }
        });

        xml += '</urlset>';
        return xml;
    }

    createDownloadableSitemap(sitemapContent) {
        // Create a blob URL for the sitemap
        const blob = new Blob([sitemapContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Store the URL for potential download
        localStorage.setItem('sitemap_download_url', url);
        
        // Create images sitemap
        const imagesSitemap = this.createImagesSitemap();
        const imagesBlob = new Blob([imagesSitemap], { type: 'application/xml' });
        const imagesUrl = URL.createObjectURL(imagesBlob);
        localStorage.setItem('images_sitemap_download_url', imagesUrl);
    }

    submitToSearchEngines() {
        const sitemapUrl = `${this.config.siteUrl}/sitemap.xml`;
        
        // Google Search Console submission
        this.pingSearchEngine('google', sitemapUrl);
        
        // Bing Webmaster Tools submission
        this.pingSearchEngine('bing', sitemapUrl);
        
        console.log('Sitemap Generator: Submitted sitemap to search engines');
    }

    pingSearchEngine(engine, sitemapUrl) {
        const endpoints = {
            google: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
            bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
        };

        if (endpoints[engine]) {
            // Use image to ping (cross-origin friendly)
            const img = new Image();
            img.onload = () => console.log(`Sitemap submitted to ${engine}`);
            img.onerror = () => console.log(`Failed to submit sitemap to ${engine}`);
            img.src = endpoints[engine];
        }
    }

    scheduleUpdates() {
        // Update sitemap daily
        setInterval(() => {
            this.generateSitemap();
        }, 24 * 60 * 60 * 1000); // 24 hours

        // Update on page visibility change (when user returns to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                const lastUpdate = localStorage.getItem('sitemap_last_updated');
                const now = new Date();
                const lastUpdateDate = new Date(lastUpdate);
                
                // Update if more than 1 hour has passed
                if (now - lastUpdateDate > 60 * 60 * 1000) {
                    this.generateSitemap();
                }
            }
        });
    }

    escapeXml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, '&#39;');
    }

    // Public methods
    addPage(pageData) {
        this.pages.push({
            url: pageData.url,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: pageData.changefreq || this.config.defaultChangeFreq,
            priority: pageData.priority || this.config.defaultPriority,
            title: pageData.title || '',
            description: pageData.description || ''
        });
        
        this.generateSitemap();
    }

    updatePage(url, updates) {
        const pageIndex = this.pages.findIndex(page => page.url === url);
        if (pageIndex !== -1) {
            this.pages[pageIndex] = {
                ...this.pages[pageIndex],
                ...updates,
                lastmod: new Date().toISOString().split('T')[0]
            };
            this.generateSitemap();
        }
    }

    removePage(url) {
        this.pages = this.pages.filter(page => page.url !== url);
        this.generateSitemap();
    }

    getSitemap() {
        return localStorage.getItem('generated_sitemap');
    }

    downloadSitemap() {
        const sitemapUrl = localStorage.getItem('sitemap_download_url');
        if (sitemapUrl) {
            const a = document.createElement('a');
            a.href = sitemapUrl;
            a.download = 'sitemap.xml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    downloadImagesSitemap() {
        const imagesUrl = localStorage.getItem('images_sitemap_download_url');
        if (imagesUrl) {
            const a = document.createElement('a');
            a.href = imagesUrl;
            a.download = 'sitemap-images.xml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    // Generate robots.txt content
    generateRobotsTxt() {
        const robotsTxt = `User-agent: *
Allow: /
Allow: /index.html
Allow: /embed*.html

# Sitemap location
Sitemap: ${this.config.siteUrl}/sitemap.xml
Sitemap: ${this.config.siteUrl}/sitemap-images.xml

# Block admin areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Crawl delay
Crawl-delay: 1

# Additional directives for better SEO
Allow: /css/
Allow: /js/
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.webp$
Allow: /*.svg$

# Block unnecessary files
Disallow: /*.json$
Disallow: /*.xml$ 
Disallow: /manifest.json
Disallow: /service-worker.js`;

        return robotsTxt;
    }
}

// Initialize Sitemap Generator
window.SitemapGenerator = new SitemapGenerator();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SitemapGenerator;
}

// Helper functions for easy access
window.downloadSitemap = function() {
    if (window.SitemapGenerator) {
        window.SitemapGenerator.downloadSitemap();
    }
};

window.downloadImagesSitemap = function() {
    if (window.SitemapGenerator) {
        window.SitemapGenerator.downloadImagesSitemap();
    }
};

// Console helper for developers
console.log('Sitemap Generator loaded. Use downloadSitemap() or downloadImagesSitemap() to download sitemaps.');
