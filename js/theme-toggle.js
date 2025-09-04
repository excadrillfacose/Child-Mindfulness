// Theme Toggle Utility
// This file provides theme switching functionality for the Child Mindfulness application

class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = document.getElementById('sun-icon');
        this.moonIcon = document.getElementById('moon-icon');
        this.htmlElement = document.documentElement;
        
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme
        this.applyTheme(savedTheme);
        
        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            this.htmlElement.classList.add('dark');
            if (this.sunIcon) this.sunIcon.classList.add('hidden');
            if (this.moonIcon) this.moonIcon.classList.remove('hidden');
        } else {
            this.htmlElement.classList.remove('dark');
            if (this.sunIcon) this.sunIcon.classList.remove('hidden');
            if (this.moonIcon) this.moonIcon.classList.add('hidden');
        }
    }

    toggleTheme() {
        const isDark = this.htmlElement.classList.contains('dark');
        
        if (isDark) {
            // Switch to light mode
            this.applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            this.applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    getCurrentTheme() {
        return this.htmlElement.classList.contains('dark') ? 'dark' : 'light';
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeToggle;
}
