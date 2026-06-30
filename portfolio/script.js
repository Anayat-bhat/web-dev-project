document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between hamburger bars and close 'X'
        if(navMenu.classList.contains('active')) {
            menuIcon.className = 'fas fa-xmark';
        } else {
            menuIcon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when a navigation item is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuIcon.className = 'fas fa-bars';
            }
        });
    });


    // --- 2. ACTIVE LINK HIGHLIGHT ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Evaluates section placement subtracting navbar height
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- 3. FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        let isValid = true;
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Name verification
        if (name.value.trim() === '') {
            showError('name-error');
            isValid = false;
        } else {
            hideError('name-error');
        }

        // Email validation with regex pattern
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
        if (!email.value.match(emailPattern)) {
            showError('email-error');
            isValid = false;
        } else {
            hideError('email-error');
        }

        // Message validation
        if (message.value.trim() === '') {
            showError('message-error');
            isValid = false;
        } else {
            hideError('message-error');
        }

        // Prevent submission if form logic fails checks
        if (!isValid) {
            e.preventDefault();
        } else {
            // Success placeholder logic
            alert('Form submitted successfully!');
            contactForm.reset();
            e.preventDefault(); // Remove this line if submitting to an action endpoint
        }
    });

    function showError(id) {
        document.getElementById(id).style.display = 'block';
    }

    function hideError(id) {
        document.getElementById(id).style.display = 'none';
    }


    // --- 4. SCROLL TO TOP BUTTON ---
    const scrollTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});