/**
 * Blog Enhancement Script
 * Adds interactive features to blog pages
 */

class BlogEnhancer {
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
    }

    // Blog search functionality
    setupSearch() {
        const searchInput = document.querySelector('.blog-search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterArticles(searchTerm);
        });
    }

    filterArticles(searchTerm) {
        const articles = document.querySelectorAll('.blog-card');
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const tags = article.dataset.tags ? article.dataset.tags.toLowerCase() : '';
            
            const matches = title.includes(searchTerm) || 
                          content.includes(searchTerm) || 
                          tags.includes(searchTerm);
            
            article.style.display = matches ? 'block' : 'none';
            article.classList.toggle('hidden', !matches);
        });
    }

    // Category filtering
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                this.filterByCategory(category);
            });
        });
    }

    filterByCategory(category) {
        const articles = document.querySelectorAll('.blog-card');
        
        articles.forEach(article => {
            const articleCategory = article.dataset.category;
            
            if (category === 'all' || articleCategory === category) {
                article.style.display = 'block';
                article.classList.remove('hidden');
            } else {
                article.style.display = 'none';
                article.classList.add('hidden');
            }
        });
    }

    // Lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('.blog-card img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Reading progress bar
    setupReadingProgress() {
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    // Social sharing
    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-button');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = window.location.href;
                const title = document.querySelector('h1').textContent;
                
                if (navigator.share) {
                    navigator.share({
                        title: title,
                        url: url
                    });
                } else {
                    this.fallbackShare(url, title);
                }
            });
        });
    }

    fallbackShare(url, title) {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    // Related articles
    setupRelatedArticles() {
        const currentArticle = document.querySelector('.blog-card.featured');
        if (!currentArticle) return;

        const currentTags = currentArticle.dataset.tags ? currentArticle.dataset.tags.split(',') : [];
        const relatedArticles = document.querySelectorAll('.blog-card:not(.featured)');
        
        relatedArticles.forEach(article => {
            const articleTags = article.dataset.tags ? article.dataset.tags.split(',') : [];
            const hasCommonTags = currentTags.some(tag => articleTags.includes(tag));
            
            if (hasCommonTags) {
                article.classList.add('related');
            }
        });
    }
}

// Initialize blog enhancer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogEnhancer();
});

// Export for use in other modules
window.BlogEnhancer = BlogEnhancer;
