// Accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addSkipLinks();
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.setupFocusManagement();
        this.enhanceSlideshowAccessibility();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }
        });

        // Ensure all interactive elements are keyboard accessible
        document.querySelectorAll('a, button, [tabindex]').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    }

    addAriaLabels() {
        // Add ARIA labels to slideshow
        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow) {
            slideshow.setAttribute('role', 'region');
            slideshow.setAttribute('aria-label', 'Image slideshow');
        }

        // Add labels to navigation buttons
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (prevBtn) prevBtn.setAttribute('aria-label', 'Previous image');
        if (nextBtn) nextBtn.setAttribute('aria-label', 'Next image');

        // Add labels to form inputs
        document.querySelectorAll('input, textarea, select').forEach(input => {
            if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
                const label = input.previousElementSibling?.textContent || input.placeholder;
                if (label) {
                    input.setAttribute('aria-label', label);
                }
            }
        });
    }

    setupFocusManagement() {
        // Trap focus in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal[aria-hidden="false"]');
                if (modal) {
                    this.trapFocusInModal(modal, e);
                }
            }
        });
    }

    trapFocusInModal(modal, event) {
        const focusableElements = modal.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }

    enhanceSlideshowAccessibility() {
        const slideshow = document.querySelector('.slideshow-container');
        if (!slideshow) return;

        // Add live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        slideshow.appendChild(liveRegion);

        // Update live region when slide changes
        const updateLiveRegion = (slideIndex, totalSlides) => {
            liveRegion.textContent = `Showing slide ${slideIndex + 1} of ${totalSlides}`;
        };

        // Hook into existing slideshow functionality
        const originalShowSlides = window.showSlides;
        if (originalShowSlides) {
            window.showSlides = function(n) {
                originalShowSlides(n);
                const slides = document.querySelectorAll('.mySlides');
                const currentSlide = (n - 1 + slides.length) % slides.length;
                updateLiveRegion(currentSlide, slides.length);
            };
        }
    }

    focusSearch() {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
}

// Initialize accessibility enhancements
const accessibility = new AccessibilityEnhancer();
