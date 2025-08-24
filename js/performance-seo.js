/**
 * Performance SEO Optimizer - Core Web Vitals and technical SEO improvements
 * Optimizes loading performance, images, and technical SEO factors
 * Author: SEO Enhancement System
 * Version: 1.0.0
 */

class PerformanceSEOOptimizer {
    constructor() {
        this.config = {
            enableLazyLoading: true,
            enableImageOptimization: true,
            enableCriticalCSS: true,
            enablePreloading: true,
            enableServiceWorker: true,
            compressionEnabled: true,
            cacheEnabled: true,
            webVitalsThresholds: {
                LCP: 2500, // Largest Contentful Paint (ms)
                FID: 100,  // First Input Delay (ms)
                CLS: 0.1   // Cumulative Layout Shift
            }
        };

        this.performanceMetrics = {};
        this.optimizations = [];
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.optimize());
        } else {
            this.optimize();
        }

        // Monitor performance continuously
        this.setupPerformanceMonitoring();
    }

    optimize() {
        this.optimizeImages();
        this.implementLazyLoading();
        this.preloadCriticalResources();
        this.optimizeFonts();
        this.implementCriticalCSS();
        this.optimizeJavaScript();
        this.setupResourceHints();
        this.optimizeServiceWorker();
        this.implementCompression();
        this.setupCaching();
        this.optimizeForMobile();
        this.measureWebVitals();
        this.generatePerformanceReport();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Add decoding="async" for better rendering
            if (!img.hasAttribute('decoding')) {
                img.decoding = 'async';
            }

            // Optimize image dimensions
            this.optimizeImageDimensions(img);

            // Add WebP support detection
            this.addWebPSupport(img);

            // Add responsive images
            this.makeImageResponsive(img);

            img.dataset.optimized = 'true';
        });

        this.optimizations.push('Image optimization applied');
    }

    optimizeImageDimensions(img) {
        // Set explicit width and height to prevent layout shift
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            img.onload = function() {
                if (!this.hasAttribute('width')) {
                    this.setAttribute('width', this.naturalWidth);
                }
                if (!this.hasAttribute('height')) {
                    this.setAttribute('height', this.naturalHeight);
                }
            };
        }
    }

    addWebPSupport(img) {
        // Check if browser supports WebP
        if (this.supportsWebP()) {
            const originalSrc = img.src;
            if (originalSrc && !originalSrc.includes('.webp')) {
                // Create WebP version URL (assuming WebP versions exist)
                const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Test if WebP version exists
                const testImg = new Image();
                testImg.onload = () => {
                    img.src = webpSrc;
                };
                testImg.onerror = () => {
                    // Keep original if WebP doesn't exist
                };
                testImg.src = webpSrc;
            }
        }
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    makeImageResponsive(img) {
        // Add responsive classes if not present
        if (!img.className.includes('responsive') && !img.className.includes('w-')) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    }

    implementLazyLoading() {
        if (!this.config.enableLazyLoading) return;

        // Enhanced lazy loading with Intersection Observer
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        lazyImageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Apply to images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                lazyImageObserver.observe(img);
            });
        }

        // Lazy load videos
        const videos = document.querySelectorAll('video[data-src]');
        videos.forEach(video => {
            video.addEventListener('loadstart', () => {
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                }
            });
        });

        this.optimizations.push('Lazy loading implemented');
    }

    preloadCriticalResources() {
        if (!this.config.enablePreloading) return;

        // Preload critical images
        const criticalImages = [
            '/fotoprofilo.png',
            '/attestato1.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Preload critical CSS
        const criticalCSS = [
            '/css/style.css'
        ];

        criticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });

        // Preload critical JavaScript
        const criticalJS = [
            'https://cdn.tailwindcss.com'
        ];

        criticalJS.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = src;
            document.head.appendChild(link);
        });

        this.optimizations.push('Critical resources preloaded');
    }

    optimizeFonts() {
        // Optimize Google Fonts loading
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        
        fontLinks.forEach(link => {
            // Add font-display: swap for better performance
            if (!link.href.includes('display=swap')) {
                link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
            }
        });

        // Preconnect to font domains
        const preconnectDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        preconnectDomains.forEach(domain => {
            if (!document.querySelector(`link[href="${domain}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });

        this.optimizations.push('Font loading optimized');
    }

    implementCriticalCSS() {
        if (!this.config.enableCriticalCSS) return;

        // Inline critical CSS for above-the-fold content
        const criticalCSS = `
            /* Critical CSS for above-the-fold content */
            .hero-section { 
                min-height: 100vh; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .nav-header { 
                position: sticky; 
                top: 0; 
                z-index: 50; 
                background: rgba(255,255,255,0.9); 
                backdrop-filter: blur(10px); 
            }
            .loading-placeholder {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);

        this.optimizations.push('Critical CSS implemented');
    }

    optimizeJavaScript() {
        // Defer non-critical JavaScript
        const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
        
        scripts.forEach(script => {
            // Skip critical scripts
            if (script.src.includes('firebase') || 
                script.src.includes('tailwind') ||
                script.dataset.critical === 'true') {
                return;
            }

            script.defer = true;
        });

        // Optimize inline scripts
        this.optimizeInlineScripts();

        this.optimizations.push('JavaScript loading optimized');
    }

    optimizeInlineScripts() {
        // Move non-critical inline scripts to load after DOM
        const inlineScripts = document.querySelectorAll('script:not([src])');
        
        inlineScripts.forEach(script => {
            if (script.textContent.length > 1000 && !script.dataset.critical) {
                // Wrap large scripts in requestIdleCallback if available
                const originalContent = script.textContent;
                script.textContent = `
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(() => {
                            ${originalContent}
                        });
                    } else {
                        setTimeout(() => {
                            ${originalContent}
                        }, 100);
                    }
                `;
            }
        });
    }

    setupResourceHints() {
        // DNS prefetch for external domains
        const prefetchDomains = [
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdn.jsdelivr.net'
        ];

        prefetchDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });

        // Prefetch likely next pages
        const prefetchPages = [
            '/embed1.html',
            '/embed2.html',
            '/embed3.html'
        ];

        prefetchPages.forEach(page => {
            if (window.location.pathname !== page) {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
            }
        });

        this.optimizations.push('Resource hints added');
    }

    optimizeServiceWorker() {
        if (!this.config.enableServiceWorker || !('serviceWorker' in navigator)) return;

        // Register service worker if not already registered
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
                this.optimizations.push('Service Worker optimized');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    implementCompression() {
        if (!this.config.compressionEnabled) return;

        // Add compression headers hint
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Encoding';
        meta.content = 'gzip, deflate, br';
        document.head.appendChild(meta);

        this.optimizations.push('Compression headers added');
    }

    setupCaching() {
        if (!this.config.cacheEnabled) return;

        // Add cache control hints
        const cacheHeaders = [
            { httpEquiv: 'Cache-Control', content: 'public, max-age=31536000' },
            { httpEquiv: 'Expires', content: new Date(Date.now() + 31536000000).toUTCString() }
        ];

        cacheHeaders.forEach(header => {
            const meta = document.createElement('meta');
            meta.httpEquiv = header.httpEquiv;
            meta.content = header.content;
            document.head.appendChild(meta);
        });

        this.optimizations.push('Caching headers configured');
    }

    optimizeForMobile() {
        // Ensure viewport meta tag is optimized
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';

        // Add mobile-specific optimizations
        const mobileOptimizations = [
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'format-detection', content: 'telephone=yes' }
        ];

        mobileOptimizations.forEach(opt => {
            let meta = document.querySelector(`meta[name="${opt.name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = opt.name;
                document.head.appendChild(meta);
            }
            meta.content = opt.content;
        });

        this.optimizations.push('Mobile optimizations applied');
    }

    setupPerformanceMonitoring() {
        // Monitor performance metrics
        if ('PerformanceObserver' in window) {
            // Monitor navigation timing
            const navObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    this.performanceMetrics.navigation = {
                        domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                        loadComplete: entry.loadEventEnd - entry.loadEventStart,
                        firstPaint: entry.responseEnd - entry.requestStart
                    };
                });
            });
            navObserver.observe({ entryTypes: ['navigation'] });

            // Monitor resource loading
            const resourceObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.duration > 1000) { // Log slow resources
                        console.warn('Slow resource detected:', entry.name, entry.duration + 'ms');
                    }
                });
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
        }
    }

    measureWebVitals() {
        // Measure Core Web Vitals using web-vitals library
        if (typeof window !== 'undefined') {
            // Load web-vitals library dynamically
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.js';
            script.onload = () => {
                if (window.webVitals) {
                    const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals;
                    
                    getCLS((metric) => this.handleWebVital('CLS', metric));
                    getFID((metric) => this.handleWebVital('FID', metric));
                    getFCP((metric) => this.handleWebVital('FCP', metric));
                    getLCP((metric) => this.handleWebVital('LCP', metric));
                    getTTFB((metric) => this.handleWebVital('TTFB', metric));
                }
            };
            document.head.appendChild(script);
        }
    }

    handleWebVital(name, metric) {
        this.performanceMetrics[name] = metric;
        
        // Check if metric exceeds threshold
        const threshold = this.config.webVitalsThresholds[name];
        if (threshold && metric.value > threshold) {
            console.warn(`${name} threshold exceeded:`, metric.value, 'vs', threshold);
            
            // Track poor performance
            if (window.AnalyticsManager) {
                window.AnalyticsManager.trackCustomEvent('poor_web_vital', {
                    metric_name: name,
                    metric_value: metric.value,
                    threshold: threshold,
                    rating: metric.rating
                });
            }
        }

        // Track all web vitals
        if (window.AnalyticsManager) {
            window.AnalyticsManager.trackCustomEvent('web_vital_measured', {
                metric_name: name,
                metric_value: metric.value,
                rating: metric.rating
            });
        }
    }

    generatePerformanceReport() {
        setTimeout(() => {
            const report = {
                timestamp: new Date().toISOString(),
                optimizations: this.optimizations,
                metrics: this.performanceMetrics,
                recommendations: this.generateRecommendations()
            };

            // Store report
            localStorage.setItem('performance_report', JSON.stringify(report));
            
            // Log summary
            console.log('Performance SEO Report:', report);
            
            this.optimizations.push('Performance report generated');
        }, 5000); // Wait 5 seconds for metrics to be collected
    }

    generateRecommendations() {
        const recommendations = [];
        
        // Check image optimization
        const unoptimizedImages = document.querySelectorAll('img:not([data-optimized])');
        if (unoptimizedImages.length > 0) {
            recommendations.push(`Optimize ${unoptimizedImages.length} images for better performance`);
        }

        // Check for missing alt attributes
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            recommendations.push(`Add alt attributes to ${imagesWithoutAlt.length} images for accessibility`);
        }

        // Check for large JavaScript files
        const largeScripts = Array.from(document.querySelectorAll('script[src]'))
            .filter(script => !script.defer && !script.async);
        if (largeScripts.length > 0) {
            recommendations.push(`Consider deferring ${largeScripts.length} non-critical JavaScript files`);
        }

        // Check Web Vitals
        Object.entries(this.performanceMetrics).forEach(([metric, data]) => {
            if (data.rating === 'poor') {
                recommendations.push(`Improve ${metric}: current value ${data.value}, rating: ${data.rating}`);
            }
        });

        return recommendations;
    }

    // Public methods
    getPerformanceReport() {
        return JSON.parse(localStorage.getItem('performance_report') || '{}');
    }

    optimizeSpecificImage(img) {
        this.optimizeImageDimensions(img);
        this.addWebPSupport(img);
        this.makeImageResponsive(img);
        img.dataset.optimized = 'true';
    }

    preloadResource(url, type = 'image') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = type;
        link.href = url;
        document.head.appendChild(link);
    }

    measureCustomMetric(name, startTime, endTime) {
        const duration = endTime - startTime;
        this.performanceMetrics[name] = { value: duration, timestamp: Date.now() };
        
        if (window.AnalyticsManager) {
            window.AnalyticsManager.trackCustomEvent('custom_performance_metric', {
                metric_name: name,
                duration: duration
            });
        }
    }
}

// Initialize Performance SEO Optimizer
window.PerformanceSEOOptimizer = new PerformanceSEOOptimizer();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceSEOOptimizer;
}

// Helper functions for easy access
window.getPerformanceReport = function() {
    if (window.PerformanceSEOOptimizer) {
        return window.PerformanceSEOOptimizer.getPerformanceReport();
    }
};

window.preloadResource = function(url, type = 'image') {
    if (window.PerformanceSEOOptimizer) {
        window.PerformanceSEOOptimizer.preloadResource(url, type);
    }
};

// Console helper
console.log('Performance SEO Optimizer loaded. Use getPerformanceReport() to view performance metrics.');
