// Handle interactive demo section
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Enhanced scroll-triggered animations
    const initScrollAnimations = () => {
        // Basic fade-in animations
        const fadeElements = document.querySelectorAll('.animate-on-scroll');
        
        // Slide animations
        const slideUpElements = document.querySelectorAll('.slide-up');
        const slideLeftElements = document.querySelectorAll('.slide-left');
        const slideRightElements = document.querySelectorAll('.slide-right');
        
        // Stagger animations for groups
        const staggerElements = document.querySelectorAll('.stagger-animation');
        
        // Scale animations
        const scaleElements = document.querySelectorAll('.scale-in');
        
        // Create intersection observer with different thresholds
        const createObserver = (threshold = 0.1, rootMargin = '0px') => {
            return new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-visible');
                        
                        // Handle stagger animations
                        if (entry.target.classList.contains('stagger-parent')) {
                            const children = entry.target.querySelectorAll('.stagger-child');
                            children.forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add('animate-visible');
                                }, index * 100);
                            });
                        }
                    }
                });
            }, {
                threshold: threshold,
                rootMargin: rootMargin
            });
        };
        
        // Main observer for most animations
        const mainObserver = createObserver(0.1, '-50px');
        
        // Observe all animated elements
        [...fadeElements, ...slideUpElements, ...slideLeftElements, 
         ...slideRightElements, ...staggerElements, ...scaleElements].forEach(element => {
            mainObserver.observe(element);
        });
        
        // Hero section parallax effect
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
        
        // Navbar background opacity on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                if (scrolled > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
        }
        
        // Counter animations for numbers
        const counterElements = document.querySelectorAll('.counter');
        const counterObserver = createObserver(0.5);
        
        counterElements.forEach(counter => {
            counterObserver.observe(counter);
            counter.addEventListener('animationstart', () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            });
        });
    };
    
    // Initialize animations
    initScrollAnimations();
    
    // Modal functionality
    const contactButtons = document.querySelectorAll('[data-bs-target="#contactModal"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
            contactModal.show();
        });
    });
    
    // Feature tabs functionality
    const featureTabs = document.querySelectorAll('#feature-tabs .nav-link');
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            featureTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const target = this.getAttribute('data-bs-target');
            document.querySelectorAll('.feature-content').forEach(content => {
                content.classList.remove('show', 'active');
            });
            document.querySelector(target).classList.add('show', 'active');
        });
    });
    

    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
