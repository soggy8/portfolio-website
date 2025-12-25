// Create stars background
function createStars() {
    const starsContainer = document.getElementById('stars-background');
    if (!starsContainer) return;
    
    const numStars = 150;
    const starSizes = ['star-small', 'star-medium', 'star-large'];
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = `star ${starSizes[Math.floor(Math.random() * starSizes.length)]}`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Language switching functionality
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (window.translations && window.translations[lang] && window.translations[lang][key]) {
            // Check if the translation contains HTML
            if (window.translations[lang][key].includes('<')) {
                element.innerHTML = window.translations[lang][key];
            } else {
                element.textContent = window.translations[lang][key];
            }
        }
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.setAttribute('data-lang', lang);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'mk' : 'en';
    setLanguage(newLang);
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Create stars
    createStars();
    
    // Initialize language
    setLanguage(currentLang);
    
    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to current nav item
                const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
                
                // Update progress bar
                updateProgressBar(sectionId);
            }
        });
    }
    
    // Update sidebar progress bar
    function updateProgressBar(activeSectionId) {
        const allSections = ['hero', 'about', 'why-hire-me', 'achievements', 'projects', 'skills', 'testimonials', 'contact'];
        const activeIndex = allSections.indexOf(activeSectionId);
        const progress = ((activeIndex + 1) / allSections.length) * 100;
        
                const progressBar = document.getElementById('sidebar-progress');
        if (progressBar) {
            // Update progress bar height directly
            const existingStyle = document.querySelector('#progress-bar-style');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            const style = document.createElement('style');
            style.id = 'progress-bar-style';
            style.textContent = `.sidebar-progress::after { height: ${progress}% !important; }`;
            document.head.appendChild(style);
        }
    }
    
    // Mouse gradient effect for hero section
    const heroGradient = document.getElementById('hero-gradient');
    if (heroGradient) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroGradient.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.1), transparent 50%)`;
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Initial scroll check
    updateActiveNav();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Disable submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    formMessage.textContent = data.message;
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    formMessage.textContent = data.message || 'Something went wrong. Please try again.';
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                formMessage.textContent = 'Network error. Please try again later.';
                formMessage.className = 'form-message error';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Update progress bar on page load
    window.addEventListener('load', function() {
        updateActiveNav();
        
        // Set initial progress bar height
        const progressBar = document.getElementById('sidebar-progress');
        if (progressBar) {
            const style = document.createElement('style');
            style.textContent = `
                .sidebar-progress::after {
                    height: 14.28% !important;
                }
            `;
            document.head.appendChild(style);
        }
    });
});

// Update progress bar dynamically
function updateProgressBarHeight(percentage) {
    const progressBar = document.getElementById('sidebar-progress');
    if (progressBar) {
        const existingStyle = document.querySelector('#progress-bar-style');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = 'progress-bar-style';
        style.textContent = `.sidebar-progress::after { height: ${percentage}% !important; }`;
        document.head.appendChild(style);
    }
}

// Re-export for global access
window.updateProgressBarHeight = updateProgressBarHeight;

