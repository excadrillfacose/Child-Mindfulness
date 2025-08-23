// Performance optimization utilities
class PerformanceOptimizer {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeImages();
        this.setupPreloading();
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading
        const imageObserverOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, imageObserverOptions);

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (src) {
            img.src = src;
        }
        if (srcset) {
            img.srcset = srcset;
        }
        
        img.classList.add('loaded');
    }

    optimizeImages() {
        // Convert images to WebP with fallback
        const images = document.querySelectorAll('img:not([data-no-webp])');
        images.forEach(img => {
            if (this.supportsWebP()) {
                const webpSrc = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
                img.src = webpSrc;
            }
        });
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    }

    setupPreloading() {
        // Preload critical resources
        const criticalResources = [
            './css/styles.css',
            './js/main.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    // Service Worker registration for caching
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('./service-worker.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
}

// Initialize performance optimizer
const optimizer = new PerformanceOptimizer();
optimizer.registerServiceWorker();
