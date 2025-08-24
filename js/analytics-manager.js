/**
 * Analytics Manager - Comprehensive tracking and analytics system
 * Manages Google Analytics, Tag Manager, and custom event tracking
 * Author: SEO Enhancement System
 * Version: 1.0.0
 */

class AnalyticsManager {
    constructor() {
        this.config = {
            // Replace with your actual tracking IDs
            googleAnalyticsId: 'G-1EKEWEBJDH', // From Firebase config
            googleTagManagerId: 'GTM-XXXXXXX', // Add your GTM ID
            facebookPixelId: 'YOUR_FACEBOOK_PIXEL_ID', // Add if needed
            hotjarId: 'YOUR_HOTJAR_ID', // Add if needed
            enableDebug: false,
            cookieConsentRequired: true
        };

        this.consentGiven = false;
        this.trackingQueue = [];
        this.init();
    }

    init() {
        // Check for existing cookie consent
        this.checkCookieConsent();
        
        // Set up consent listeners
        this.setupConsentListeners();
        
        // Initialize tracking if consent is given
        if (this.consentGiven) {
            this.initializeTracking();
        }

        // Set up custom event tracking
        this.setupCustomEventTracking();
    }

    checkCookieConsent() {
        const consent = localStorage.getItem('cookie_consent');
        this.consentGiven = consent === 'accepted';
        
        if (this.config.enableDebug) {
            console.log('Analytics Manager: Cookie consent status:', this.consentGiven);
        }
    }

    setupConsentListeners() {
        // Listen for consent changes
        document.addEventListener('cookieConsentChanged', (event) => {
            this.consentGiven = event.detail.accepted;
            
            if (this.consentGiven) {
                this.initializeTracking();
                this.processQueuedEvents();
            } else {
                this.disableTracking();
            }
        });

        // Monitor localStorage changes for consent
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === 'cookie_consent') {
                const event = new CustomEvent('cookieConsentChanged', {
                    detail: { accepted: value === 'accepted' }
                });
                document.dispatchEvent(event);
            }
        };
    }

    initializeTracking() {
        if (!this.consentGiven) return;

        this.loadGoogleAnalytics();
        this.loadGoogleTagManager();
        this.setupEnhancedEcommerce();
        this.trackPageView();
        this.setupScrollTracking();
        this.setupClickTracking();
        this.setupFormTracking();
        this.setupVideoTracking();
        this.setupPerformanceTracking();

        if (this.config.enableDebug) {
            console.log('Analytics Manager: All tracking initialized');
        }
    }

    loadGoogleAnalytics() {
        if (window.gtag) return; // Already loaded

        // Load gtag script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', this.config.googleAnalyticsId, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'mindfulness_page_type'
            }
        });

        // Enhanced measurement
        gtag('config', this.config.googleAnalyticsId, {
            enhanced_measurements: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
            }
        });
    }

    loadGoogleTagManager() {
        if (this.config.googleTagManagerId === 'GTM-XXXXXXX') return; // Placeholder ID

        if (window.google_tag_manager) return; // Already loaded

        // GTM script
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',this.config.googleTagManagerId);

        // GTM noscript fallback
        const noscript = document.createElement('noscript');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.config.googleTagManagerId}`;
        iframe.height = '0';
        iframe.width = '0';
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        noscript.appendChild(iframe);
        document.body.insertBefore(noscript, document.body.firstChild);
    }

    setupEnhancedEcommerce() {
        // Track course views as product views
        this.trackEvent('view_item_list', {
            item_list_id: 'mindfulness_courses',
            item_list_name: 'Mindfulness Courses',
            items: [
                {
                    item_id: 'mindfulness_children',
                    item_name: 'Mindfulness per Bambini',
                    item_category: 'Courses',
                    item_category2: 'Children',
                    price: 0,
                    quantity: 1
                },
                {
                    item_id: 'mindfulness_adults',
                    item_name: 'Mindfulness per Adulti',
                    item_category: 'Courses',
                    item_category2: 'Adults',
                    price: 0,
                    quantity: 1
                }
            ]
        });
    }

    trackPageView(customParams = {}) {
        const pageData = {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            mindfulness_page_type: this.getPageType(),
            ...customParams
        };

        this.trackEvent('page_view', pageData);
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

    setupScrollTracking() {
        let scrollThresholds = [25, 50, 75, 90];
        let trackedThresholds = new Set();

        const trackScroll = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    this.trackEvent('scroll', {
                        percent_scrolled: threshold,
                        page_type: this.getPageType()
                    });
                }
            });
        };

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(trackScroll, 100);
        });
    }

    setupClickTracking() {
        document.addEventListener('click', (event) => {
            const target = event.target.closest('a, button');
            if (!target) return;

            const trackingData = {
                element_type: target.tagName.toLowerCase(),
                element_text: target.textContent?.trim().substring(0, 100),
                element_url: target.href || '',
                page_type: this.getPageType()
            };

            // Track navigation clicks
            if (target.tagName === 'A') {
                if (target.href && target.href.includes('.html')) {
                    this.trackEvent('navigation_click', {
                        ...trackingData,
                        destination_page: target.href.split('/').pop()
                    });
                } else if (target.href && target.href.startsWith('mailto:')) {
                    this.trackEvent('contact_click', {
                        ...trackingData,
                        contact_method: 'email'
                    });
                } else if (target.href && target.href.startsWith('tel:')) {
                    this.trackEvent('contact_click', {
                        ...trackingData,
                        contact_method: 'phone'
                    });
                }
            }

            // Track button clicks
            if (target.tagName === 'BUTTON') {
                this.trackEvent('button_click', trackingData);
            }

            // Track social media clicks
            if (target.closest('.social-icon')) {
                this.trackEvent('social_click', {
                    ...trackingData,
                    social_platform: this.getSocialPlatform(target.href)
                });
            }

            // Track slideshow interactions
            if (target.closest('.slide-button, .slide-indicator')) {
                this.trackEvent('slideshow_interaction', {
                    ...trackingData,
                    interaction_type: target.classList.contains('slide-button') ? 'navigation' : 'indicator'
                });
            }
        });
    }

    getSocialPlatform(url) {
        if (url.includes('instagram')) return 'instagram';
        if (url.includes('facebook')) return 'facebook';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('twitter')) return 'twitter';
        return 'unknown';
    }

    setupFormTracking() {
        // Track form interactions
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form.tagName === 'FORM') {
                this.trackEvent('form_submit', {
                    form_id: form.id || 'unknown',
                    form_name: form.name || 'unknown',
                    page_type: this.getPageType()
                });
            }
        });

        // Track form field focus (engagement)
        document.addEventListener('focus', (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                this.trackEvent('form_engagement', {
                    field_type: event.target.type || event.target.tagName.toLowerCase(),
                    field_name: event.target.name || 'unknown',
                    page_type: this.getPageType()
                });
            }
        }, true);
    }

    setupVideoTracking() {
        document.addEventListener('play', (event) => {
            if (event.target.tagName === 'VIDEO') {
                this.trackEvent('video_start', {
                    video_title: event.target.title || 'Video Presentazione',
                    video_duration: event.target.duration || 0,
                    page_type: this.getPageType()
                });
            }
        }, true);

        document.addEventListener('pause', (event) => {
            if (event.target.tagName === 'VIDEO') {
                this.trackEvent('video_pause', {
                    video_title: event.target.title || 'Video Presentazione',
                    video_current_time: event.target.currentTime || 0,
                    page_type: this.getPageType()
                });
            }
        }, true);

        document.addEventListener('ended', (event) => {
            if (event.target.tagName === 'VIDEO') {
                this.trackEvent('video_complete', {
                    video_title: event.target.title || 'Video Presentazione',
                    video_duration: event.target.duration || 0,
                    page_type: this.getPageType()
                });
            }
        }, true);
    }

    setupPerformanceTracking() {
        // Track Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS((metric) => this.trackWebVital('CLS', metric));
                getFID((metric) => this.trackWebVital('FID', metric));
                getFCP((metric) => this.trackWebVital('FCP', metric));
                getLCP((metric) => this.trackWebVital('LCP', metric));
                getTTFB((metric) => this.trackWebVital('TTFB', metric));
            });
        }

        // Track page load time
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.trackEvent('page_timing', {
                        page_load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                        dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
                        first_paint: Math.round(navigation.responseEnd - navigation.fetchStart),
                        page_type: this.getPageType()
                    });
                }
            }, 1000);
        });
    }

    trackWebVital(name, metric) {
        this.trackEvent('web_vital', {
            metric_name: name,
            metric_value: metric.value,
            metric_rating: metric.rating,
            page_type: this.getPageType()
        });
    }

    trackEvent(eventName, parameters = {}) {
        if (!this.consentGiven) {
            // Queue events if consent not given
            this.trackingQueue.push({ eventName, parameters, timestamp: Date.now() });
            return;
        }

        if (window.gtag) {
            gtag('event', eventName, parameters);
        }

        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...parameters
            });
        }

        if (this.config.enableDebug) {
            console.log('Analytics Event:', eventName, parameters);
        }
    }

    processQueuedEvents() {
        if (this.trackingQueue.length === 0) return;

        this.trackingQueue.forEach(({ eventName, parameters }) => {
            this.trackEvent(eventName, parameters);
        });

        this.trackingQueue = [];
    }

    disableTracking() {
        // Disable Google Analytics
        if (window.gtag) {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
            });
        }

        // Clear queued events
        this.trackingQueue = [];
    }

    // Public methods for custom tracking
    trackCustomEvent(eventName, parameters = {}) {
        this.trackEvent(eventName, {
            ...parameters,
            custom_event: true,
            page_type: this.getPageType()
        });
    }

    trackConversion(conversionName, value = 0, currency = 'EUR') {
        this.trackEvent('conversion', {
            conversion_name: conversionName,
            value: value,
            currency: currency,
            page_type: this.getPageType()
        });
    }

    trackUserEngagement(engagementType, details = {}) {
        this.trackEvent('user_engagement', {
            engagement_type: engagementType,
            ...details,
            page_type: this.getPageType()
        });
    }

    // Method to track mindfulness-specific events
    trackMindfulnessEvent(eventType, details = {}) {
        this.trackEvent('mindfulness_interaction', {
            mindfulness_event_type: eventType,
            ...details,
            page_type: this.getPageType()
        });
    }
}

// Initialize Analytics Manager
window.AnalyticsManager = new AnalyticsManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}

// Helper function for easy event tracking
window.trackEvent = function(eventName, parameters = {}) {
    if (window.AnalyticsManager) {
        window.AnalyticsManager.trackCustomEvent(eventName, parameters);
    }
};

// Helper function for mindfulness-specific tracking
window.trackMindfulness = function(eventType, details = {}) {
    if (window.AnalyticsManager) {
        window.AnalyticsManager.trackMindfulnessEvent(eventType, details);
    }
};
