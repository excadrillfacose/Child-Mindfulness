// Mobile optimization utilities
class MobileOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupTouchGestures();
        this.optimizeViewport();
        this.enhanceTouchTargets();
        this.setupResponsiveImages();
        this.addMobileMenu();
    }

    setupTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipeGesture();
        });

        const handleSwipeGesture = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Only process horizontal swipes if they're more prominent than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe right - previous slide
                    this.triggerSlideChange('prev');
                } else {
                    // Swipe left - next slide
                    this.triggerSlideChange('next');
                }
            }
        };

        // Make handleSwipeGesture available to the class
        this.handleSwipeGesture = handleSwipeGesture;
    }

    triggerSlideChange(direction) {
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (direction === 'prev' && prevBtn) {
            prevBtn.click();
        } else if (direction === 'next' && nextBtn) {
            nextBtn.click();
        }
    }

    optimizeViewport() {
        // Ensure viewport meta tag exists
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
            document.head.appendChild(viewport);
        }
    }

    enhanceTouchTargets() {
        // Ensure minimum touch target size (44x44px)
        const touchElements = document.querySelectorAll('button, a, [role="button"]');
        
        touchElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const width = parseInt(computedStyle.width);
            const height = parseInt(computedStyle.height);
            
            if (width < 44 || height < 44) {
                element.style.minWidth = '44px';
                element.style.minHeight = '44px';
                element.style.padding = '12px';
            }
        });
    }

    setupResponsiveImages() {
        // Add responsive image attributes
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // Add srcset for responsive images
            if (!img.hasAttribute('srcset') && img.src.includes('fotoprofilo')) {
                img.setAttribute('srcset', `
                    ${img.src} 1x,
                    ${img.src.replace('.png', '@2x.png')} 2x
                `);
            }
        });
    }

    addMobileMenu() {
        // Create mobile hamburger menu
        const header = document.querySelector('header');
        if (!header) return;

        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn md:hidden';
        mobileMenuBtn.innerHTML = `
            <span class="sr-only">Toggle menu</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;

        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.add('hidden', 'md:block');
            
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('hidden');
                nav.classList.toggle('block');
            });
        }

        header.appendChild(mobileMenuBtn);
    }

    // Add viewport height fix for mobile browsers
    fixViewportHeight() {
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
    }
}

// Initialize mobile optimizer
const mobileOptimizer = new MobileOptimizer();
mobileOptimizer.fixViewportHeight();
