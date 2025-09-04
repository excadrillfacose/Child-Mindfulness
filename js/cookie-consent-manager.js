/**
 * Cookie Consent Manager - GDPR Compliant Cookie Management System
 * Version: 1.0.0
 * Author: Caterina Figlioli
 */

class CookieConsentManager {
    constructor() {
        this.config = {
            cookieName: 'cookie_consent',
            cookieExpiryDays: 365,
            essentialCookies: ['session', 'theme', 'auth'],
            categories: {
                essential: {
                    title: 'Essential',
                    description: 'These cookies are necessary for the website to function and cannot be switched off.',
                    required: true
                },
                analytics: {
                    title: 'Analytics',
                    description: 'These cookies allow us to count visits and traffic sources so we can measure and improve site performance.',
                    required: false
                },
                marketing: {
                    title: 'Marketing',
                    description: 'These cookies may be set through our site by advertising partners to build a profile of your interests.',
                    required: false
                },
                preferences: {
                    title: 'Preferences',
                    description: 'These cookies enable the website to provide enhanced functionality and personalization.',
                    required: false
                }
            }
        };

        this.consentState = {
            essential: true,
            analytics: false,
            marketing: false,
            preferences: false
        };

        this.init();
    }

    init() {
        this.loadConsent();
        this.renderBanner();
        this.setupEventListeners();
        this.applyConsent();
    }

    loadConsent() {
        const savedConsent = localStorage.getItem(this.config.cookieName);
        
        if (savedConsent) {
            try {
                this.consentState = JSON.parse(savedConsent);
            } catch (e) {
                console.error('Error parsing saved consent:', e);
                this.resetToDefaultConsent();
            }
        } else {
            this.resetToDefaultConsent();
        }
    }

    resetToDefaultConsent() {
        // Set all non-essential categories to false
        Object.keys(this.consentState).forEach(category => {
            if (!this.config.categories[category]?.required) {
                this.consentState[category] = false;
            }
        });
    }

    saveConsent() {
        localStorage.setItem(this.config.cookieName, JSON.stringify(this.consentState));
        this.applyConsent();
        this.hideBanner();
        
        // Dispatch event for other components
        const event = new CustomEvent('cookieConsentChanged', {
            detail: { 
                accepted: this.hasConsent(),
                consentState: this.consentState 
            }
        });
        document.dispatchEvent(event);
    }

    hasConsent(category = null) {
        if (category) {
            return this.consentState[category] === true;
        }
        return Object.values(this.consentState).some(val => val === true);
    }

    applyConsent() {
        // Apply consent to analytics
        if (window.AnalyticsManager) {
            if (this.hasConsent('analytics')) {
                window.AnalyticsManager.initializeTracking();
            } else {
                window.AnalyticsManager.disableTracking();
            }
        }

        // Apply consent to other tracking scripts
        this.toggleTrackingScripts('analytics', this.hasConsent('analytics'));
        this.toggleTrackingScripts('marketing', this.hasConsent('marketing'));
    }

    toggleTrackingScripts(category, enable) {
        // This would enable/disable specific tracking scripts based on category
        // Implementation depends on specific scripts used
    }

    renderBanner() {
        if (this.hasConsent() || document.getElementById('cookie-consent-banner')) {
            return;
        }

        const bannerHTML = `
            <div id="cookie-consent-banner" class="cookie-consent-banner">
                <div class="cookie-consent-content">
                    <h3 class="cookie-consent-title">Cookie Preferences</h3>
                    <p class="cookie-consent-message">
                        We use cookies to enhance your experience. By clicking "Accept All", you consent to all cookies. 
                        You can manage preferences in <a href="cookie-settings.html">Cookie Settings</a>.
                    </p>
                    <div class="cookie-consent-actions">
                        <button id="cookie-consent-accept-all" class="cookie-consent-btn accept-all">Accept All</button>
                        <button id="cookie-consent-settings" class="cookie-consent-btn settings">Cookie Settings</button>
                        <button id="cookie-consent-reject" class="cookie-consent-btn reject">Reject All</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        document.getElementById('cookie-consent-banner').classList.add('active');
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('active');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    showSettingsModal() {
        this.hideBanner();
        
        if (document.getElementById('cookie-settings-modal')) {
            document.getElementById('cookie-settings-modal').classList.add('active');
            return;
        }

        const modalHTML = `
            <div id="cookie-settings-modal" class="cookie-settings-modal">
                <div class="cookie-settings-content">
                    <div class="cookie-settings-header">
                        <h3 class="cookie-settings-title">Cookie Settings</h3>
                        <button id="cookie-settings-close" class="cookie-settings-close">&times;</button>
                    </div>
                    
                    <div class="cookie-settings-body">
                        <p class="cookie-settings-description">
                            You can set your preferences for how we and our partners use cookies. 
                            Essential cookies are always active.
                        </p>
                        
                        <div class="cookie-categories">
                            ${Object.entries(this.config.categories).map(([key, category]) => `
                                <div class="cookie-category ${category.required ? 'required' : ''}">
                                    <div class="category-header">
                                        <h4 class="category-title">${category.title}</h4>
                                        <label class="switch">
                                            <input type="checkbox" id="cookie-category-${key}" 
                                                ${category.required ? 'disabled checked' : this.consentState[key] ? 'checked' : ''}>
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                    <p class="category-description">${category.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="cookie-settings-footer">
                        <button id="cookie-settings-save" class="cookie-settings-save">Save Preferences</button>
                        <button id="cookie-settings-accept-all" class="cookie-settings-accept-all">Accept All</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.getElementById('cookie-settings-modal').classList.add('active');

        // Add event listeners for modal
        document.getElementById('cookie-settings-close').addEventListener('click', () => {
            this.closeSettingsModal();
        });

        document.getElementById('cookie-settings-save').addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('cookie-settings-accept-all').addEventListener('click', () => {
            this.acceptAll();
        });
    }

    closeSettingsModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    saveSettings() {
        Object.keys(this.config.categories).forEach(category => {
            if (!this.config.categories[category].required) {
                const checkbox = document.getElementById(`cookie-category-${category}`);
                if (checkbox) {
                    this.consentState[category] = checkbox.checked;
                }
            }
        });

        this.saveConsent();
        this.closeSettingsModal();
    }

    acceptAll() {
        Object.keys(this.consentState).forEach(category => {
            this.consentState[category] = true;
        });
        this.saveConsent();
        this.closeSettingsModal();
    }

    rejectAll() {
        this.resetToDefaultConsent();
        this.saveConsent();
    }

    setupEventListeners() {
        // Banner event listeners
        document.addEventListener('click', (e) => {
            if (e.target.matches('#cookie-consent-accept-all')) {
                this.acceptAll();
            } else if (e.target.matches('#cookie-consent-settings')) {
                this.showSettingsModal();
            } else if (e.target.matches('#cookie-consent-reject')) {
                this.rejectAll();
            }
        });

        // Listen for external requests to show settings
        document.addEventListener('showCookieSettings', () => {
            this.showSettingsModal();
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.CookieConsentManager = new CookieConsentManager();
});

// Helper function to show settings from anywhere
window.showCookieSettings = function() {
    if (window.CookieConsentManager) {
        window.CookieConsentManager.showSettingsModal();
    } else {
        const event = new Event('showCookieSettings');
        document.dispatchEvent(event);
    }
};
