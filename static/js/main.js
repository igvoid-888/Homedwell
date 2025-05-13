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
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
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
    
    // Demo video functionality
    const demoVideoButton = document.getElementById('demoVideoButton');
    if (demoVideoButton) {
        demoVideoButton.addEventListener('click', function() {
            const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
            videoModal.show();
            
            // Start video when modal is shown
            const videoElement = document.getElementById('demoVideo');
            document.getElementById('videoModal').addEventListener('shown.bs.modal', function() {
                if (videoElement) {
                    videoElement.play();
                }
            });
            
            // Pause video when modal is hidden
            document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
                if (videoElement) {
                    videoElement.pause();
                }
            });
        });
    }
    
    // Interactive demo tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            demoTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const featureId = this.getAttribute('data-feature');
            document.querySelectorAll('.demo-feature').forEach(feature => {
                feature.classList.remove('active');
            });
            document.getElementById(featureId).classList.add('active');
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
