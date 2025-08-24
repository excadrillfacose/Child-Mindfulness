/**
 * Social SEO Optimizer - Enhanced social media integration and optimization
 * Optimizes social sharing, WhatsApp integration, and social proof elements
 * Author: SEO Enhancement System
 * Version: 1.0.0
 */

class SocialSEOOptimizer {
    constructor() {
        this.config = {
            siteName: "Caterina Figlioli - Mindfulness e Benessere",
            siteUrl: "https://mindfulnesscaterina.it",
            defaultImage: "/fotoprofilo.png",
            businessName: "Caterina Figlioli",
            socialProfiles: {
                instagram: "https://www.instagram.com/caterinafiglioli",
                facebook: "https://www.facebook.com/caterinafiglioli",
                linkedin: "https://www.linkedin.com/in/caterinafiglioli",
                whatsapp: "+393392005278",
                email: "caterinafiglioli1970@gmail.com"
            },
            whatsappMessages: {
                default: "Ciao! Sono interessato/a ai tuoi corsi di mindfulness. Potresti darmi maggiori informazioni?",
                consultation: "Ciao! Vorrei prenotare una consulenza per lo sportello di ascolto. Quando sei disponibile?",
                courses: "Ciao! Sono interessato/a ai corsi di mindfulness. Potresti inviarmi il programma e i costi?",
                children: "Ciao! Vorrei informazioni sui corsi di mindfulness per bambini. Mio figlio ha [età] anni.",
                adults: "Ciao! Sono interessato/a ai corsi di mindfulness per adulti. Potresti darmi dettagli su orari e modalità?"
            }
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.optimize());
        } else {
            this.optimize();
        }
    }

    optimize() {
        this.enhanceSocialSharing();
        this.addWhatsAppIntegration();
        this.optimizeSocialLinks();
        this.addSocialProofElements();
        this.createFloatingContactButtons();
        this.addSocialMetaTags();
        this.setupSocialTracking();
        this.addShareButtons();
        this.optimizeForMessaging();
    }

    enhanceSocialSharing() {
        // Add Open Graph and Twitter Card meta tags for better sharing
        const currentPage = this.getCurrentPageInfo();
        
        // Enhanced Open Graph tags
        const ogTags = {
            'og:title': currentPage.title,
            'og:description': currentPage.description,
            'og:image': this.config.siteUrl + currentPage.image,
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': currentPage.imageAlt,
            'og:url': window.location.href,
            'og:type': currentPage.type,
            'og:site_name': this.config.siteName,
            'og:locale': 'it_IT',
            'article:author': this.config.businessName,
            'article:publisher': this.config.socialProfiles.facebook
        };

        // Enhanced Twitter Card tags
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': currentPage.title,
            'twitter:description': currentPage.description,
            'twitter:image': this.config.siteUrl + currentPage.image,
            'twitter:image:alt': currentPage.imageAlt,
            'twitter:site': '@caterinafiglioli',
            'twitter:creator': '@caterinafiglioli'
        };

        // WhatsApp specific tags
        const whatsappTags = {
            'og:image:type': 'image/png',
            'og:image:secure_url': this.config.siteUrl + currentPage.image
        };

        // Apply all tags
        Object.entries({...ogTags, ...whatsappTags}).forEach(([property, content]) => {
            this.updateOrCreateMetaProperty(property, content);
        });

        Object.entries(twitterTags).forEach(([name, content]) => {
            this.updateOrCreateMetaName(name, content);
        });
    }

    getCurrentPageInfo() {
        const path = window.location.pathname;
        const pageInfo = {
            '/': {
                title: 'Caterina Figlioli - Mindfulness e Benessere per Bambini e Adulti',
                description: 'Scopri i percorsi di mindfulness e yoga con Caterina Figlioli. Corsi per bambini, adulti e famiglie. Certificazioni professionali e sportello di ascolto.',
                image: '/fotoprofilo.png',
                imageAlt: 'Caterina Figlioli - Insegnante di Mindfulness e Yoga',
                type: 'website'
            },
            '/index.html': {
                title: 'Caterina Figlioli - Mindfulness e Benessere per Bambini e Adulti',
                description: 'Scopri i percorsi di mindfulness e yoga con Caterina Figlioli. Corsi per bambini, adulti e famiglie.',
                image: '/fotoprofilo.png',
                imageAlt: 'Caterina Figlioli - Insegnante di Mindfulness e Yoga',
                type: 'website'
            },
            '/embed1.html': {
                title: 'Mindfulness per Bambini e Adulti - Benefici Scientificamente Provati',
                description: 'Esplora i benefici della mindfulness per ogni età. Corsi specializzati basati su ricerca scientifica per bambini, adolescenti e adulti.',
                image: '/fotoprofilo.png',
                imageAlt: 'Corsi di Mindfulness per Bambini e Adulti',
                type: 'article'
            },
            '/embed2.html': {
                title: 'Video Gratuiti di Mindfulness e Meditazione Guidata',
                description: 'Accedi alla collezione di video gratuiti di mindfulness. Pratiche guidate per principianti e avanzati.',
                image: '/fotoprofilo.png',
                imageAlt: 'Video Gratuiti di Mindfulness e Meditazione',
                type: 'article'
            },
            '/embed3.html': {
                title: 'Sportello di Ascolto Psicologico - Supporto Professionale',
                description: 'Servizio di sportello di ascolto psicologico. Supporto per bambini, adolescenti e adulti con consulenze individuali.',
                image: '/fotoprofilo.png',
                imageAlt: 'Sportello di Ascolto Psicologico',
                type: 'service'
            },
            '/embed4.html': {
                title: 'Blog Mindfulness - Articoli e Approfondimenti',
                description: 'Leggi gli ultimi articoli su mindfulness e benessere. Approfondimenti scientifici e consigli pratici.',
                image: '/fotoprofilo.png',
                imageAlt: 'Blog Mindfulness e Benessere',
                type: 'blog'
            }
        };

        const currentPath = path === '/' ? '/' : path;
        return pageInfo[currentPath] || pageInfo['/'];
    }

    addWhatsAppIntegration() {
        // Enhance existing WhatsApp links
        const phoneLinks = document.querySelectorAll('a[href*="tel:+393392005278"]');
        phoneLinks.forEach(link => {
            // Add WhatsApp alternative
            const whatsappLink = document.createElement('a');
            whatsappLink.href = this.generateWhatsAppUrl();
            whatsappLink.className = 'whatsapp-link inline-flex items-center ml-2 text-green-600 hover:text-green-700';
            whatsappLink.innerHTML = `
                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
                WhatsApp
            `;
            
            if (link.parentNode) {
                link.parentNode.insertBefore(whatsappLink, link.nextSibling);
            }
        });
    }

    generateWhatsAppUrl(messageType = 'default') {
        const message = this.config.whatsappMessages[messageType];
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${this.config.socialProfiles.whatsapp.replace('+', '')}?text=${encodedMessage}`;
    }

    optimizeSocialLinks() {
        // Find and enhance social media links
        const socialLinks = document.querySelectorAll('a[href*="instagram"], a[href*="facebook"], a[href*="linkedin"]');
        
        socialLinks.forEach(link => {
            // Add proper attributes for SEO
            link.rel = 'noopener noreferrer';
            link.target = '_blank';
            
            // Add structured data attributes
            link.setAttribute('itemProp', 'sameAs');
            
            // Add tracking
            link.addEventListener('click', () => {
                if (window.AnalyticsManager) {
                    window.AnalyticsManager.trackCustomEvent('social_click', {
                        platform: this.getSocialPlatform(link.href),
                        url: link.href
                    });
                }
            });
        });
    }

    getSocialPlatform(url) {
        if (url.includes('instagram')) return 'instagram';
        if (url.includes('facebook')) return 'facebook';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('twitter')) return 'twitter';
        return 'unknown';
    }

    addSocialProofElements() {
        // Add social proof indicators
        const socialProofContainer = document.createElement('div');
        socialProofContainer.className = 'social-proof-container fixed bottom-4 right-4 z-40 bg-white rounded-lg shadow-lg p-4 max-w-sm hidden';
        socialProofContainer.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Certificazioni Professionali</p>
                    <p class="text-xs text-gray-500">5+ certificazioni in mindfulness e yoga</p>
                </div>
                <button class="social-proof-close text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(socialProofContainer);

        // Show social proof after 5 seconds
        setTimeout(() => {
            socialProofContainer.classList.remove('hidden');
        }, 5000);

        // Hide after 10 seconds or on click
        const closeButton = socialProofContainer.querySelector('.social-proof-close');
        closeButton.addEventListener('click', () => {
            socialProofContainer.classList.add('hidden');
        });

        setTimeout(() => {
            socialProofContainer.classList.add('hidden');
        }, 15000);
    }

    createFloatingContactButtons() {
        // Create floating contact buttons
        const floatingButtons = document.createElement('div');
        floatingButtons.className = 'floating-contact-buttons fixed bottom-6 left-6 z-50 flex flex-col space-y-3';
        floatingButtons.innerHTML = `
            <a href="${this.generateWhatsAppUrl()}" 
               class="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
               title="Contattaci su WhatsApp">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
            </a>
            <a href="mailto:${this.config.socialProfiles.email}" 
               class="email-float bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
               title="Inviaci una email">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            </a>
        `;

        document.body.appendChild(floatingButtons);

        // Add click tracking
        floatingButtons.addEventListener('click', (e) => {
            const button = e.target.closest('a');
            if (button) {
                const contactMethod = button.classList.contains('whatsapp-float') ? 'whatsapp' : 'email';
                if (window.AnalyticsManager) {
                    window.AnalyticsManager.trackCustomEvent('floating_contact_click', {
                        method: contactMethod
                    });
                }
            }
        });
    }

    addSocialMetaTags() {
        // Add additional social meta tags
        const additionalTags = {
            'fb:app_id': 'YOUR_FACEBOOK_APP_ID', // Replace with actual app ID
            'twitter:domain': this.config.siteUrl.replace('https://', ''),
            'pinterest:rich_pin': 'true',
            'telegram:channel': '@caterinafiglioli'
        };

        Object.entries(additionalTags).forEach(([property, content]) => {
            if (content !== 'YOUR_FACEBOOK_APP_ID') { // Skip placeholder values
                this.updateOrCreateMetaProperty(property, content);
            }
        });
    }

    setupSocialTracking() {
        // Track social sharing events
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && target.href) {
                const href = target.href;
                
                // Detect social sharing
                if (href.includes('facebook.com/sharer') || 
                    href.includes('twitter.com/intent') || 
                    href.includes('linkedin.com/sharing') ||
                    href.includes('wa.me/') ||
                    href.includes('whatsapp.com/')) {
                    
                    if (window.AnalyticsManager) {
                        window.AnalyticsManager.trackCustomEvent('social_share', {
                            platform: this.getSocialPlatformFromShareUrl(href),
                            page: window.location.pathname
                        });
                    }
                }
            }
        });
    }

    getSocialPlatformFromShareUrl(url) {
        if (url.includes('facebook')) return 'facebook';
        if (url.includes('twitter')) return 'twitter';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('whatsapp') || url.includes('wa.me')) return 'whatsapp';
        if (url.includes('telegram')) return 'telegram';
        return 'unknown';
    }

    addShareButtons() {
        // Add share buttons to content sections
        const contentSections = document.querySelectorAll('section');
        
        contentSections.forEach((section, index) => {
            if (index === 0 || index === contentSections.length - 1) return; // Skip first and last sections
            
            const shareContainer = document.createElement('div');
            shareContainer.className = 'share-buttons flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200';
            shareContainer.innerHTML = `
                <span class="text-sm text-gray-600 self-center mr-2">Condividi:</span>
                <a href="${this.generateFacebookShareUrl()}" 
                   class="share-btn facebook bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                   target="_blank" rel="noopener">
                    Facebook
                </a>
                <a href="${this.generateTwitterShareUrl()}" 
                   class="share-btn twitter bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition-colors"
                   target="_blank" rel="noopener">
                    Twitter
                </a>
                <a href="${this.generateWhatsAppShareUrl()}" 
                   class="share-btn whatsapp bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                   target="_blank" rel="noopener">
                    WhatsApp
                </a>
                <a href="${this.generateLinkedInShareUrl()}" 
                   class="share-btn linkedin bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                   target="_blank" rel="noopener">
                    LinkedIn
                </a>
            `;
            
            section.appendChild(shareContainer);
        });
    }

    generateFacebookShareUrl() {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    }

    generateTwitterShareUrl() {
        const text = document.title;
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}&via=caterinafiglioli`;
    }

    generateWhatsAppShareUrl() {
        const text = `${document.title} - ${window.location.href}`;
        return `https://wa.me/?text=${encodeURIComponent(text)}`;
    }

    generateLinkedInShareUrl() {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    optimizeForMessaging() {
        // Add messaging app optimization
        const messagingMeta = {
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': this.config.siteName,
            'mobile-web-app-capable': 'yes',
            'msapplication-TileColor': '#5A67D8',
            'msapplication-TileImage': this.config.siteUrl + '/favicon-144.png'
        };

        Object.entries(messagingMeta).forEach(([name, content]) => {
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

    // Public methods for dynamic updates
    updateSocialSharing(pageInfo) {
        Object.assign(this.getCurrentPageInfo(), pageInfo);
        this.enhanceSocialSharing();
    }

    addCustomShareButton(platform, url, label) {
        const shareContainers = document.querySelectorAll('.share-buttons');
        shareContainers.forEach(container => {
            const button = document.createElement('a');
            button.href = url;
            button.className = `share-btn ${platform} bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm transition-colors`;
            button.target = '_blank';
            button.rel = 'noopener';
            button.textContent = label;
            container.appendChild(button);
        });
    }
}

// Initialize Social SEO Optimizer
window.SocialSEOOptimizer = new SocialSEOOptimizer();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialSEOOptimizer;
}

// Helper functions for easy access
window.shareOnWhatsApp = function(messageType = 'default') {
    if (window.SocialSEOOptimizer) {
        const url = window.SocialSEOOptimizer.generateWhatsAppUrl(messageType);
        window.open(url, '_blank');
    }
};

window.shareCurrentPage = function(platform) {
    if (window.SocialSEOOptimizer) {
        let url;
        switch(platform) {
            case 'facebook':
                url = window.SocialSEOOptimizer.generateFacebookShareUrl();
                break;
            case 'twitter':
                url = window.SocialSEOOptimizer.generateTwitterShareUrl();
                break;
            case 'linkedin':
                url = window.SocialSEOOptimizer.generateLinkedInShareUrl();
                break;
            case 'whatsapp':
                url = window.SocialSEOOptimizer.generateWhatsAppShareUrl();
                break;
        }
        if (url) window.open(url, '_blank');
    }
};
