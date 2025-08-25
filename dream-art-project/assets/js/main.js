// Enhanced Dynamic Navbar with Smooth Underline Transitions
class EnhancedNavigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link[data-section]');
        this.sections = document.querySelectorAll('section[id]');
        this.currentActiveLink = null;
        this.isScrolling = false;
        this.scrollTimeout = null;

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollListener();
        this.setupClickHandlers();
        this.setInitialActiveLink();
    }

    setupIntersectionObserver() {
        // More precise intersection observer for section detection
        const observerOptions = {
            root: null,
            rootMargin: `-${this.header ? this.header.offsetHeight : 80}px 0px -50% 0px`,
            threshold: [0, 0.1, 0.2, 0.3, 0.5]
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
            if (this.isScrolling) return;

            let mostVisibleSection = null;
            let maxVisibility = 0;

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
                    maxVisibility = entry.intersectionRatio;
                    mostVisibleSection = entry.target;
                }
            });

            if (mostVisibleSection) {
                this.updateActiveNavigation(mostVisibleSection.id);
            }
        }, observerOptions);

        this.sections.forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    setupScrollListener() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        // Set scrolling flag
        this.isScrolling = true;

        // Clear existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        // Reset scrolling flag after scroll ends
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 150);

        // Manual section detection for more precision
        let current = '';
        const scrollPosition = window.scrollY + (this.header?.offsetHeight || 80) + 100;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.id;
                break;
            }
        }

        // Handle edge cases for first and last sections
        if (window.scrollY < 100) {
            current = this.sections[0]?.id || 'home';
        } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
            current = this.sections[this.sections.length - 1]?.id || 'contact';
        }

        if (current) {
            this.updateActiveNavigation(current);
        }
    }

    updateActiveNavigation(activeSection) {
        // Find the link that should be active
        const targetLink = Array.from(this.navLinks).find(link =>
            link.getAttribute('data-section') === activeSection
        );

        // Only update if there's actually a change
        if (targetLink && targetLink !== this.currentActiveLink) {
            // Remove active class from all links
            this.navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to target link
            targetLink.classList.add('active');
            this.currentActiveLink = targetLink;

            // Add temporary highlight effect
            this.addHighlightEffect(targetLink);
        }
    }

    addHighlightEffect(link) {
        // Create a temporary glow effect
        link.style.textShadow = '0 0 8px rgba(219, 47, 47, 0.5)';

        setTimeout(() => {
            link.style.textShadow = '';
        }, 600);
    }

    setupClickHandlers() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetSection = link.getAttribute('data-section');
                const targetElement = document.getElementById(targetSection);

                if (targetElement) {
                    // Set scrolling flag
                    this.isScrolling = true;

                    // Immediately update active state for better UX
                    this.updateActiveNavigation(targetSection);

                    // Calculate scroll position
                    const headerHeight = this.header?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Reset scrolling flag after animation
                    setTimeout(() => {
                        this.isScrolling = false;
                    }, 1000);
                }
            });
        });
    }

    setInitialActiveLink() {
        // Set the initial active link based on current scroll position
        const scrollPosition = window.scrollY;

        if (scrollPosition < 100) {
            const firstLink = this.navLinks[0];
            if (firstLink) {
                firstLink.classList.add('active');
                this.currentActiveLink = firstLink;
            }
        } else {
            // Trigger a scroll check to set the correct initial state
            this.handleScroll();
        }
    }
}

// Professional JavaScript for Dream Art Creations Website
class DreamArtWebsite {
    constructor() {
        this.header = document.getElementById('header');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.scrollToTop = document.getElementById('scrollToTop');
        this.bookingModal = document.getElementById('bookingModal');
        this.bookAppointmentBtn = document.getElementById('bookAppointment');
        this.bookServiceBtns = document.querySelectorAll('.book-service');
        this.closeModalBtn = document.getElementById('closeModal');
        this.callNowBtn = document.getElementById('callNow');
        this.whatsappNowBtn = document.getElementById('whatsappNow');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupAnimations();
        // REMOVED: this.setupActiveNavigation() - Let EnhancedNavigation handle this
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation links (only handle mobile menu closing, not active states)
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll to top
        this.scrollToTop.addEventListener('click', () => this.scrollToTopAction());

        // Modal controls
        this.bookAppointmentBtn.addEventListener('click', (e) => this.openBookingModal(e));
        this.bookServiceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.openBookingModal(e, btn.dataset.service));
        });
        this.closeModalBtn.addEventListener('click', () => this.closeBookingModal());

        // Contact buttons in modal
        this.callNowBtn.addEventListener('click', () => this.makeCall());
        this.whatsappNowBtn.addEventListener('click', () => this.openWhatsApp());

        // Close modal when clicking outside
        this.bookingModal.addEventListener('click', (e) => {
            if (e.target === this.bookingModal) {
                this.closeBookingModal();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Header scroll effect
            if (currentScrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Scroll to top button visibility
            if (currentScrollY > 300) {
                this.scrollToTop.classList.add('visible');
            } else {
                this.scrollToTop.classList.remove('visible');
            }
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all internal links (but don't interfere with active states)
        document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavClick(e) {
        if (window.innerWidth <= 768) {
            this.closeMobileMenu();
        }
        // Let EnhancedNavigation handle the actual navigation
    }

    scrollToTopAction() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    openBookingModal(e, service = '') {
        e.preventDefault();
        this.bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (service) {
            const modalTitle = this.bookingModal.querySelector('h3');
            modalTitle.textContent = `Book ${service} Service`;
        }
    }

    closeBookingModal() {
        this.bookingModal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset modal title
        const modalTitle = this.bookingModal.querySelector('h3');
        modalTitle.textContent = 'Start Your Creative Project';
    }

    makeCall() {
        window.location.href = 'tel:+94717134000';
    }

    openWhatsApp() {
        const message = encodeURIComponent('Hi! I\'m interested in your graphic design services. Could you please provide more information?');
        window.open(`https://wa.me/+94717134000?text=${message}`, '_blank');
    }

    handleKeyboardNavigation(e) {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            if (this.bookingModal.classList.contains('active')) {
                this.closeBookingModal();
            }
            if (this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        }
    }
}

// Initialize both navigation systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the enhanced navigation first
    new EnhancedNavigation();

    // Then initialize the main website functionality
    new DreamArtWebsite();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images that aren't in viewport
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        this.style.background = 'linear-gradient(135deg, #D4AF37 0%, #F7DC6F 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.color = 'white';
        this.style.fontSize = '24px';
        this.innerHTML = '<i class="fas fa-image"></i>';
    });
});