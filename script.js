// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Clear localStorage for testing to ensure popup shows
    localStorage.removeItem('arHoldingsObituarySeen');
    
    // Initialize obituary popup first
    initObituaryPopup();
    
    // Initialize all other functionality after popup is handled
    initNavigation();
    initScrollEffects();
    initTimeline();
    initCounters();
    initScrollToTop();
    initMobileMenu();
    initSmoothScrolling();
    initParallaxEffects();
});

// Obituary Popup functionality
function initObituaryPopup() {
    const obituaryOverlay = document.getElementById('obituaryOverlay');
    const obituaryClose = document.getElementById('obituaryClose');
    const obituaryContinue = document.getElementById('obituaryContinue');
    const mainWebsite = document.getElementById('mainWebsite');
    
    // Only show obituary popup on the main page (index.html)
    if (!obituaryOverlay || !mainWebsite) {
        return; // Not on main page, exit
    }
    
    // Check if user has already seen the obituary (using localStorage)
    const hasSeenObituary = localStorage.getItem('arHoldingsObituarySeen');
    
    if (hasSeenObituary) {
        // User has seen it before, show main website directly
        obituaryOverlay.classList.add('hidden');
        mainWebsite.classList.add('visible');
        document.body.style.overflow = 'auto';
    } else {
        // First time visitor, show obituary popup
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation for obituary
        setTimeout(() => {
            obituaryOverlay.style.opacity = '1';
            obituaryOverlay.style.visibility = 'visible';
        }, 100);
    }
    
    // Handle close button (X)
    if (obituaryClose) {
        obituaryClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeObituaryPopup();
        });
    }
    
    // Handle continue button
    if (obituaryContinue) {
        obituaryContinue.addEventListener('click', (e) => {
            e.preventDefault();
            closeObituaryPopup();
        });
    }
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !obituaryOverlay.classList.contains('hidden')) {
            closeObituaryPopup();
        }
    });
    
    // Handle clicking outside the popup
    obituaryOverlay.addEventListener('click', (e) => {
        if (e.target === obituaryOverlay) {
            closeObituaryPopup();
        }
    });
    
    function closeObituaryPopup() {
        // Mark as seen
        localStorage.setItem('arHoldingsObituarySeen', 'true');
        
        // Hide obituary popup immediately
        obituaryOverlay.classList.add('hidden');
        obituaryOverlay.style.display = 'none';
        
        // Show main website immediately
        mainWebsite.classList.add('visible');
        mainWebsite.style.opacity = '1';
        mainWebsite.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
        
        // Trigger hero animations after a short delay
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 300);
            });
        }, 100);
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const spans = navToggle.querySelectorAll('span');

    navToggle.addEventListener('click', () => {
        spans.forEach((span, index) => {
            span.style.transform = navToggle.classList.contains('active') 
                ? 'rotate(0deg)' 
                : `rotate(${45 * (index === 1 ? 0 : 1)}deg) translateY(${index === 1 ? 0 : index === 0 ? 6 : -6}px)`;
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Check if it's an external link (contains .html or starts with http)
            if (targetId.includes('.html') || targetId.startsWith('http')) {
                // Allow normal navigation for external links
                return;
            }
            
            // Only prevent default and smooth scroll for internal links
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.timeline-item, .value-card, .leader-card, .vertical-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Timeline functionality
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        const details = item.querySelector('.timeline-details');
        
        if (marker && details) {
            marker.addEventListener('click', () => {
                // Close other expanded items
                timelineItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('expanded');
                
                // Add click animation
                marker.style.transform = 'translateX(-50%) scale(0.9)';
                setTimeout(() => {
                    marker.style.transform = 'translateX(-50%) scale(1)';
                }, 150);
            });
        }
    });

    // Timeline scroll animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particles, .geometric-pattern');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle button actions
            if (this.textContent.includes('Discover Our Vision')) {
                document.querySelector('#vision').scrollIntoView({ behavior: 'smooth' });
            } else if (this.textContent.includes('Explore Verticals')) {
                document.querySelector('#verticals').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Vertical cards read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you can add functionality to show more details
            // For now, we'll just show an alert
            const cardTitle = this.closest('.vertical-card').querySelector('h3').textContent;
            alert(`More information about ${cardTitle} will be available soon.`);
        });
    });

    // Vision section button
    const visionButton = document.querySelector('.vision .btn');
    if (visionButton) {
        visionButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Add contact functionality
            alert('Thank you for your interest! Please contact us at kelsey@arholdings.group for partnership opportunities.');
        });
    }
});

// Enhanced scroll animations
function enhanceScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', enhanceScrollAnimations);

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations here
        }, 16); // ~60fps
    });

    // Lazy load images if any are added later
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Only animate hero elements if main website is visible
    const mainWebsite = document.getElementById('mainWebsite');
    if (mainWebsite.classList.contains('visible')) {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Arrow keys for timeline navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const expandedItem = document.querySelector('.timeline-item.expanded');
        if (expandedItem) {
            const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
            const currentIndex = timelineItems.indexOf(expandedItem);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % timelineItems.length;
            } else {
                nextIndex = (currentIndex - 1 + timelineItems.length) % timelineItems.length;
            }
            
            expandedItem.classList.remove('expanded');
            timelineItems[nextIndex].classList.add('expanded');
        }
    }
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    .hero-title, .hero-subtitle, .hero-description, .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style); 