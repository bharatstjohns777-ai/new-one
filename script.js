// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Scroll animations
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#39ff14' : type === 'error' ? '#ff6b35' : '#00d4ff'};
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Mouse-controlled parallax and slide animations
let mouseX = 0;
let mouseY = 0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Create cursor trail effect
function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    return trail;
}

const cursorTrail = createCursorTrail();

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor trail
    cursorTrail.style.left = mouseX + 'px';
    cursorTrail.style.top = mouseY + 'px';
    
    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (mouseX / windowWidth) * 2 - 1;
    const normalizedY = (mouseY / windowHeight) * 2 - 1;
    
    // Apply mouse-controlled animations
    applyMouseAnimations(normalizedX, normalizedY);
});

// Apply mouse-controlled animations
function applyMouseAnimations(x, y) {
    // Hero section parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-container');
        const profileImage = hero.querySelector('.image-placeholder');
        const heroTitle = hero.querySelector('.hero-title');
        const heroTagline = hero.querySelector('.hero-tagline');
        
        // Subtle movement for hero content
        if (heroContent) {
            heroContent.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
        
        // More pronounced movement for profile image
        if (profileImage) {
            profileImage.style.transform = `translate(${x * 30}px, ${y * 30}px) rotate(${x * 5}deg)`;
        }
        
        // Text movement
        if (heroTitle) {
            heroTitle.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        }
        
        if (heroTagline) {
            heroTagline.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }
    }
    
    // Animated background elements movement
    const floatingElements = document.querySelectorAll('.floating-dot, .floating-rectangle');
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const moveX = x * speed * 50;
        const moveY = y * speed * 50;
        
        element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
    
    // Skill items hover effect based on mouse position
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - itemCenterX;
        const distanceY = mouseY - itemCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 200) {
            const intensity = 1 - (distance / 200);
            const moveX = (distanceX / distance) * intensity * 20;
            const moveY = (distanceY / distance) * intensity * 20;
            
            item.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.1})`;
            item.style.boxShadow = `0 ${10 + intensity * 20}px ${30 + intensity * 30}px rgba(0, 212, 255, ${0.3 + intensity * 0.2})`;
        } else {
            item.style.transform = 'translate(0, 0) scale(1)';
            item.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
        }
    });
    
    // Service cards mouse interaction
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - cardCenterX;
        const distanceY = mouseY - cardCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 300) {
            const intensity = 1 - (distance / 300);
            const moveX = (distanceX / distance) * intensity * 15;
            const moveY = (distanceY / distance) * intensity * 15;
            
            card.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.05})`;
            card.style.boxShadow = `0 ${15 + intensity * 25}px ${40 + intensity * 40}px rgba(255, 107, 53, ${0.3 + intensity * 0.2})`;
        } else {
            card.style.transform = 'translate(0, 0) scale(1)';
            card.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.3)';
        }
    });
    
    // Project cards mouse interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - cardCenterX;
        const distanceY = mouseY - cardCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 250) {
            const intensity = 1 - (distance / 250);
            const moveX = (distanceX / distance) * intensity * 12;
            const moveY = (distanceY / distance) * intensity * 12;
            
            card.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.03})`;
            card.style.boxShadow = `0 ${15 + intensity * 20}px ${40 + intensity * 30}px rgba(57, 255, 20, ${0.3 + intensity * 0.2})`;
        } else {
            card.style.transform = 'translate(0, 0) scale(1)';
            card.style.boxShadow = '0 15px 40px rgba(57, 255, 20, 0.3)';
        }
    });
    
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn, .social-link');
    buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - buttonCenterX;
        const distanceY = mouseY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 100) {
            const intensity = 1 - (distance / 100);
            const moveX = (distanceX / distance) * intensity * 10;
            const moveY = (distanceY / distance) * intensity * 10;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            button.style.transform = 'translate(0, 0)';
        }
    });
    
    // Magnetic effect for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const linkCenterX = rect.left + rect.width / 2;
        const linkCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - linkCenterX;
        const distanceY = mouseY - linkCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 80) {
            const intensity = 1 - (distance / 80);
            const moveX = (distanceX / distance) * intensity * 8;
            const moveY = (distanceY / distance) * intensity * 8;
            
            link.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            link.style.transform = 'translate(0, 0)';
        }
    });
}

// Parallax effect for hero section on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill items hover effect enhancement
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
});

// Add CSS for active navigation state
const activeNavStyles = document.createElement('style');
activeNavStyles.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    /* Smooth transitions for mouse-controlled animations */
    .hero-container,
    .image-placeholder,
    .hero-title,
    .hero-tagline,
    .skill-item,
    .service-card,
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Enhanced floating elements */
    .floating-dot,
    .floating-rectangle {
        transition: transform 0.2s ease;
    }
    
    /* Magnetic effect transitions */
    .btn,
    .social-link,
    .nav-link {
        transition: transform 0.2s ease;
    }
    
    /* Cursor trail effect */
    .cursor-trail {
        mix-blend-mode: difference;
    }
`;
document.head.appendChild(activeNavStyles);
