/**
 * SEO Master - Main integration file for all SEO enhancements
 * Loads and coordinates all SEO optimization modules
 * Author: SEO Enhancement System
 * Version: 1.0.0
 */

class SEOMaster {
    constructor() {
        this.config = {
            enableSEOEnhancer: true,
            enableAnalytics: true,
            enableSitemapGenerator: true,
            enableSocialSEO: true,
            enablePerformanceSEO: true,
            loadOrder: [
                'seo-enhancer',
                'performance-seo',
                'analytics-manager',
                'social-seo',
                'sitemap-generator'
            ],
            debug: false
        };

        this.loadedModules = new Set();
        this.initializationPromises = [];
        
        this.init();
    }

    init() {
        console.log('🚀 SEO Master: Initializing comprehensive SEO enhancement system...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAllModules());
        } else {
            this.loadAllModules();
        }
    }

    async loadAllModules() {
        try {
            // Load modules in specified order
            for (const module of this.config.loadOrder) {
                if (this.shouldLoadModule(module)) {
                    await this.loadModule(module);
                }
            }

            // Wait for all modules to initialize
            await Promise.all(this.initializationPromises);
            
            // Setup coordination between modules
            this.setupModuleCoordination();
            
            // Generate comprehensive SEO report
            this.generateSEOReport();
            
            console.log('✅ SEO Master: All SEO modules loaded and initialized successfully!');
            
        } catch (error) {
            console.error('❌ SEO Master: Error loading modules:', error);
        }
    }

    shouldLoadModule(moduleName) {
        const moduleConfig = {
            'seo-enhancer': this.config.enableSEOEnhancer,
            'analytics-manager': this.config.enableAnalytics,
            'sitemap-generator': this.config.enableSitemapGenerator,
            'social-seo': this.config.enableSocialSEO,
            'performance-seo': this.config.enablePerformanceSEO
        };

        return moduleConfig[moduleName] !== false;
    }

    async loadModule(moduleName) {
        return new Promise((resolve, reject) => {
            if (this.loadedModules.has(moduleName)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `/js/${moduleName}.js`;
            script.async = true;
            
            script.onload = () => {
                this.loadedModules.add(moduleName);
                if (this.config.debug) {
                    console.log(`📦 SEO Master: Loaded ${moduleName}`);
                }
                resolve();
            };
            
            script.onerror = () => {
                console.warn(`⚠️ SEO Master: Failed to load ${moduleName}`);
                reject(new Error(`Failed to load ${moduleName}`));
            };
            
            document.head.appendChild(script);
        });
    }

    setupModuleCoordination() {
        // Coordinate between analytics and other modules
        if (window.AnalyticsManager && window.SEOEnhancer) {
            // Track SEO enhancements
            window.AnalyticsManager.trackCustomEvent('seo_enhancement_loaded', {
                modules_loaded: Array.from(this.loadedModules),
                page_type: this.getPageType()
            });
        }

        // Coordinate between social SEO and analytics
        if (window.SocialSEOOptimizer && window.AnalyticsManager) {
            // Enhanced social tracking is already set up in social-seo.js
        }

        // Coordinate between performance and analytics
        if (window.PerformanceSEOOptimizer && window.AnalyticsManager) {
            // Performance metrics tracking is already set up in performance-seo.js
        }

        // Setup cross-module event system
        this.setupEventSystem();
    }

    setupEventSystem() {
        // Create custom event system for module communication
        window.SEOEvents = {
            emit: (eventName, data) => {
                const event = new CustomEvent(`seo:${eventName}`, { detail: data });
                document.dispatchEvent(event);
            },
            
            on: (eventName, callback) => {
                document.addEventListener(`seo:${eventName}`, callback);
            }
        };

        // Listen for important SEO events
        window.SEOEvents.on('pageChange', (event) => {
            this.handlePageChange(event.detail);
        });

        window.SEOEvents.on('contentUpdate', (event) => {
            this.handleContentUpdate(event.detail);
        });
    }

    handlePageChange(pageData) {
        // Update all modules when page changes (for SPA behavior)
        if (window.SEOEnhancer) {
            window.SEOEnhancer.updateSEO(pageData);
        }
        
        if (window.AnalyticsManager) {
            window.AnalyticsManager.trackPageView(pageData);
        }
        
        if (window.SocialSEOOptimizer) {
            window.SocialSEOOptimizer.updateSocialSharing(pageData);
        }
    }

    handleContentUpdate(contentData) {
        // Update sitemap when content changes
        if (window.SitemapGenerator && contentData.url) {
            window.SitemapGenerator.updatePage(contentData.url, {
                lastmod: new Date().toISOString().split('T')[0],
                title: contentData.title,
                description: contentData.description
            });
        }
    }

    getPageType() {
        const path = window.location.pathname;
        if (path.includes('embed1')) return 'mindfulness_info';
        if (path.includes('embed2')) return 'video_content';
        if (path.includes('embed3')) return 'consultation';
        if (path.includes('embed4')) return 'blog';
        if (path.includes('embed0')) return 'account';
        return 'homepage';
    }

    generateSEOReport() {
        setTimeout(() => {
            const report = {
                timestamp: new Date().toISOString(),
                page: window.location.href,
                pageType: this.getPageType(),
                loadedModules: Array.from(this.loadedModules),
                seoEnhancements: this.getSEOEnhancements(),
                performanceMetrics: this.getPerformanceMetrics(),
                recommendations: this.generateRecommendations(),
                socialOptimization: this.getSocialOptimization(),
                technicalSEO: this.getTechnicalSEO()
            };

            // Store comprehensive report
            localStorage.setItem('seo_master_report', JSON.stringify(report));
            
            // Log summary
            console.log('📊 SEO Master Report:', report);
            
            // Track report generation
            if (window.AnalyticsManager) {
                window.AnalyticsManager.trackCustomEvent('seo_report_generated', {
                    modules_count: this.loadedModules.size,
                    enhancements_count: report.seoEnhancements.length,
                    page_type: report.pageType
                });
            }
            
        }, 3000); // Wait for modules to complete their work
    }

    getSEOEnhancements() {
        const enhancements = [];
        
        // Check meta tags
        if (document.querySelector('meta[property="og:title"]')) {
            enhancements.push('Open Graph tags added');
        }
        
        if (document.querySelector('meta[name="twitter:card"]')) {
            enhancements.push('Twitter Card tags added');
        }
        
        if (document.querySelector('script[type="application/ld+json"]')) {
            enhancements.push('Structured data implemented');
        }
        
        if (document.querySelector('link[rel="canonical"]')) {
            enhancements.push('Canonical URL set');
        }
        
        return enhancements;
    }

    getPerformanceMetrics() {
        if (window.PerformanceSEOOptimizer) {
            return window.PerformanceSEOOptimizer.performanceMetrics || {};
        }
        return {};
    }

    getSocialOptimization() {
        const social = {
            whatsappIntegration: !!document.querySelector('.whatsapp-float'),
            shareButtons: !!document.querySelector('.share-buttons'),
            socialProof: !!document.querySelector('.social-proof-container'),
            floatingContact: !!document.querySelector('.floating-contact-buttons')
        };
        
        return social;
    }

    getTechnicalSEO() {
        const technical = {
            lazyLoading: document.querySelectorAll('img[loading="lazy"]').length,
            optimizedImages: document.querySelectorAll('img[data-optimized]').length,
            preloadedResources: document.querySelectorAll('link[rel="preload"]').length,
            serviceWorkerActive: 'serviceWorker' in navigator && navigator.serviceWorker.controller,
            httpsEnabled: window.location.protocol === 'https:',
            mobileOptimized: !!document.querySelector('meta[name="viewport"]')
        };
        
        return technical;
    }

    generateRecommendations() {
        const recommendations = [];
        
        // Check for missing SEO elements
        if (!document.querySelector('meta[name="description"]')) {
            recommendations.push('Add meta description for better search results');
        }
        
        if (!document.querySelector('link[rel="canonical"]')) {
            recommendations.push('Add canonical URL to prevent duplicate content issues');
        }
        
        if (!document.querySelector('script[type="application/ld+json"]')) {
            recommendations.push('Add structured data for rich snippets');
        }
        
        // Check images
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            recommendations.push(`Add alt text to ${imagesWithoutAlt.length} images for accessibility`);
        }
        
        // Check performance
        const unoptimizedImages = document.querySelectorAll('img:not([loading="lazy"])');
        if (unoptimizedImages.length > 0) {
            recommendations.push(`Enable lazy loading for ${unoptimizedImages.length} images`);
        }
        
        return recommendations;
    }

    // Public API methods
    updatePageSEO(pageData) {
        window.SEOEvents.emit('pageChange', pageData);
    }

    updateContent(contentData) {
        window.SEOEvents.emit('contentUpdate', contentData);
    }

    getFullReport() {
        return JSON.parse(localStorage.getItem('seo_master_report') || '{}');
    }

    downloadSEOReport() {
        const report = this.getFullReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    // Module status methods
    isModuleLoaded(moduleName) {
        return this.loadedModules.has(moduleName);
    }

    getLoadedModules() {
        return Array.from(this.loadedModules);
    }

    // Configuration methods
    enableModule(moduleName) {
        this.config[`enable${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`] = true;
    }

    disableModule(moduleName) {
        this.config[`enable${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`] = false;
    }
}

// Initialize SEO Master
window.SEOMaster = new SEOMaster();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOMaster;
}

// Global helper functions
window.updatePageSEO = function(pageData) {
    if (window.SEOMaster) {
        window.SEOMaster.updatePageSEO(pageData);
    }
};

window.getSEOReport = function() {
    if (window.SEOMaster) {
        return window.SEOMaster.getFullReport();
    }
};

window.downloadSEOReport = function() {
    if (window.SEOMaster) {
        window.SEOMaster.downloadSEOReport();
    }
};

// Console helpers
console.log(`
🎯 SEO Master loaded successfully!

Available commands:
- getSEOReport() - Get comprehensive SEO report
- downloadSEOReport() - Download SEO report as JSON
- updatePageSEO(data) - Update SEO for page changes
- downloadSitemap() - Download XML sitemap
- getPerformanceReport() - Get performance metrics

Modules loaded: ${window.SEOMaster ? window.SEOMaster.getLoadedModules().join(', ') : 'Loading...'}
`);
