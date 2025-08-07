// Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add sample gallery images
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const galleryImages = [
            'https://source.unsplash.com/random/800x600/?home',
            'https://source.unsplash.com/random/800x600/?kitchen',
            'https://source.unsplash.com/random/800x600/?bathroom',
            'https://source.unsplash.com/random/800x600/?deck',
            'https://source.unsplash.com/random/800x600/?remodel',
            'https://source.unsplash.com/random/800x600/?construction'
        ];

        galleryImages.forEach(imgSrc => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${imgSrc}" alt="Project Image">`;
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .gallery-item').forEach(element => {
        observer.observe(element);
    });
});
