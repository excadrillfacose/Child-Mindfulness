/**
 * Enhanced Blog Enhancement Script
 * Adds interactive features, animations, and accessibility improvements to blog pages
 */

class EnhancedBlogEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupSearch();
        this.setupFilters();
        this.setupLazyLoading();
        this.setupReadingProgress();
        this.setupShareButtons();
        this.setupRelatedArticles();
        this.setupAnimations();
        this.setupAccessibility();
        this.setupComments();
        this.setupNewsletter();
        this.setupBackToTop();
    }

    // Enhanced blog search with debouncing
    setupSearch() {
        const searchInput = document.querySelector('.blog-search-input');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase();
                this.filterArticles(searchTerm);
                this.updateSearchResults(searchTerm);
            }, 300);
        });
    }

    filterArticles(searchTerm) {
        const articles = document.querySelectorAll('.blog-card');
        let visibleCount = 0;
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const tags = article.dataset.tags ? article.dataset.tags.toLowerCase() : '';
            const category = article.dataset.category || '';
            
            const matches = title.includes(searchTerm) || 
                          content.includes(searchTerm) || 
                          tags.includes(searchTerm) ||
                          category.toLowerCase().includes(searchTerm);
            
            article.style.display = matches ? 'block' : 'none';
            article.classList.toggle('hidden', !matches);
            
            if (matches) visibleCount++;
        });
        
        // Update no results message
        this.updateNoResultsMessage(visibleCount, searchTerm);
    }

    updateSearchResults(searchTerm) {
        const resultsInfo = document.querySelector('.search-results-info');
        if (resultsInfo) {
            if (searchTerm) {
                resultsInfo.textContent = `Searching for: "${searchTerm}"`;
                resultsInfo.style.display = 'block';
            } else {
                resultsInfo.style.display = 'none';
            }
        }
    }

    updateNoResultsMessage(count, searchTerm) {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            if (count === 0 && searchTerm) {
                noResults.innerHTML = `
                    <div class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                        <p class="mt-1 text-sm text-gray-500">No articles match your search for "${searchTerm}".</p>
                    </div>
                `;
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    // Enhanced category filtering with smooth transitions
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Smooth transition
                this.animateFilterTransition(category);
            });
        });
    }

    animateFilterTransition(category) {
        const articles = document.querySelectorAll('.blog-card');
        const grid = document.querySelector('.blog-grid');
        
        // Add transition class
        grid.classList.add('filtering');
        
        setTimeout(() => {
            this.filterByCategory(category);
            grid.classList.remove('filtering');
        }, 300);
    }

    // Enhanced lazy loading with fade-in effect
    setupLazyLoading() {
        const images = document.querySelectorAll('.blog-card img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Enhanced reading progress with smooth animation
    setupReadingProgress() {
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) return;

        let ticking = false;
        
        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            
            progressBar.style.width = `${scrollPercent}%`;
            progressBar.setAttribute('aria-valuenow', scrollPercent);
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }

    // Enhanced social sharing with multiple platforms
    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-button');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = e.target.dataset.platform;
                const url = window.location.href;
                const title = document.querySelector('h1').textContent;
                const description = document.querySelector('meta[name="description"]')?.content || '';
                
                this.shareArticle(platform, url, title, description);
            });
        });
    }

    shareArticle(platform, url, title, description) {
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`
        };

        if (navigator.share && platform === 'native') {
            navigator.share({
                title: title,
                text: description,
                url: url
            });
        } else if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }

    // Enhanced related articles with AI-like recommendations
    setupRelatedArticles() {
        const currentArticle = document.querySelector('.blog-card.featured');
        if (!currentArticle) return;

        const currentTags = currentArticle.dataset.tags ? currentArticle.dataset.tags.split(',') : [];
        const currentCategory = currentArticle.dataset.category || '';
        const relatedArticles = document.querySelectorAll('.blog-card:not(.featured)');
        
        const recommendations = [];
        
        relatedArticles.forEach(article => {
            const articleTags = article.dataset.tags ? article.dataset.tags.split(',') : [];
            const articleCategory = article.dataset.category || '';
            
            let score = 0;
            
            // Category match
            if (articleCategory === currentCategory) score += 3;
            
            // Tag matches
            const tagMatches = currentTags.filter(tag => articleTags.includes(tag)).length;
            score += tagMatches * 2;
            
            if (score > 0) {
                recommendations.push({ element: article, score });
            }
        });
        
        // Sort by relevance score
        recommendations.sort((a, b) => b.score - a.score);
        
        // Show top 3 recommendations
        recommendations.slice(0, 3).forEach(({ element }) => {
            element.classList.add('related');
        });
    }

    // Smooth animations and transitions
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Accessibility improvements
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey) {
                // Handle shift+tab navigation
                this.handleKeyboardNavigation(e);
            }
        });

        // Focus management
        const focusableElements = document.querySelectorAll('.blog-card a, .blog-card button');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.closest('.blog-card').classList.add('focus-visible');
            });
            
            element.addEventListener('blur', () => {
                element.closest('.blog-card').classList.remove('focus-visible');
            });
        });
    }

    handleKeyboardNavigation(e) {
        // Implement keyboard shortcuts for blog navigation
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.blog-search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    // Comments system
    setupComments() {
        const commentForm = document.querySelector('.comment-form');
        if (!commentForm) return;

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCommentSubmission(e.target);
        });
    }

    handleCommentSubmission(form) {
        const formData = new FormData(form);
        const comment = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Here you would typically send to your backend
        console.log('New comment:', comment);
        
        // Show success message
        this.showNotification('Comment submitted successfully!');
        form.reset();
    }

    // Newsletter signup
    setupNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSignup(e.target);
        });
    }

    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        
        // Validate email
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Here you would typically send to your backend
        console.log('Newsletter signup:', email);
        
        this.showNotification('Successfully subscribed to newsletter!');
        form.reset();
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Back to top button
    setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Notification system
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize enhanced blog enhancer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedBlogEnhancer();
});

// Export for use in other modules
window.EnhancedBlogEnhancer = EnhancedBlogEnhancer;
