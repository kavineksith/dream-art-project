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
        this.emailNowBtn = document.getElementById('emailNow');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation links
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
        this.emailNowBtn.addEventListener('click', () => this.sendEmail());

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
        let lastScrollY = window.scrollY;

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

            // Update active navigation based on scroll position
            this.updateActiveNavigation();

            lastScrollY = currentScrollY;
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
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

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - this.header.offsetHeight - 50;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
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
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - this.header.offsetHeight - 50;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
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

    sendEmail() {
        const subject = encodeURIComponent('Design Service Inquiry');
        const body = encodeURIComponent('Hi there!\n\nI\'m interested in your graphic design services and would like to discuss my project requirements.\n\nLooking forward to hearing from you!\n\nBest regards');
        window.location.href = `mailto:dreamartcreation.digitalpaint@gmail.com?subject=${subject}&body=${body}`;
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

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DreamArtWebsite();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

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