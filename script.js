// Mobile Menu Toggle
const menuButton = document.getElementById('menu-button');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    // Toggle the CSS class (controls visibility via CSS)
    navLinks.classList.toggle('open');
    
    // Update the button text/icon for accessibility
    const isExpanded = navLinks.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
    menuButton.innerHTML = isExpanded ? '✕' : '☰';
}

// Add the event handler
menuButton.addEventListener('click', toggleMenu);

// Close the menu when a link inside is clicked (for mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Calculate scroll percentage
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Update the progress bar width
    scrollProgress.style.width = scrollPercentage + '%';
});

// Form Submission Handling
const contactForm = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

if (contactForm && messageDiv) {
    contactForm.addEventListener('submit', function(event) {
        // Stop the browser from submitting the form and refreshing the page
        event.preventDefault();
        
        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();
        
        // Validation
        if (nameInput === '' || emailInput === '' || messageInput === '') {
            messageDiv.textContent = 'Please fill out all required fields.';
            messageDiv.style.color = '#ff0000';
            messageDiv.style.backgroundColor = '#ffe6e6';
            messageDiv.style.border = '1px solid #ff0000';
        } else if (!isValidEmail(emailInput)) {
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.style.color = '#ff0000';
            messageDiv.style.backgroundColor = '#ffe6e6';
            messageDiv.style.border = '1px solid #ff0000';
        } else {
            // Successful mock submission
            messageDiv.textContent = 'Thank you for your message! I will be in touch shortly.';
            messageDiv.style.color = '#008000';
            messageDiv.style.backgroundColor = '#e6ffe6';
            messageDiv.style.border = '1px solid #008000';
            
            // Clear the form fields
            contactForm.reset();
        }
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll for project cards
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

// Initially hide project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Console message for visitors
console.log('%cWelcome to my portfolio! 👋', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the source!', 'color: #2196F3; font-size: 14px;');