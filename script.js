document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    function toggleMenu() {
        menuLinks.classList.toggle('open');
        hamburgerIcon.classList.toggle('open');
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburgerMenu && !hamburgerMenu.contains(e.target)) {
            menuLinks.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    const hamburgerNav = document.querySelector('#hamburger-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            hamburgerNav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
            hamburgerNav.classList.remove('scrolled');
        }
    });

    // Equipment selector functionality
    const subjectSelect = document.getElementById('subject');
    const equipmentSelector = document.getElementById('equipment-selector');
    const materialSelector = document.getElementById('material-selector');

    if (subjectSelect && equipmentSelector && materialSelector) {
        subjectSelect.addEventListener('change', function() {
            if (this.value === 'rent') {
                equipmentSelector.style.display = 'block';
                materialSelector.style.display = 'none';
            } else if (this.value === 'buy') {
                materialSelector.style.display = 'block';
                equipmentSelector.style.display = 'none';
            } else {
                equipmentSelector.style.display = 'none';
                materialSelector.style.display = 'none';
            }
        });
    }

    // Rent button functionality
    const rentButtons = document.querySelectorAll('.rent-btn[data-equipment]');
    const equipmentSelect = document.getElementById('equipment');

    rentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Set subject to equipment rental
            if (subjectSelect) {
                subjectSelect.value = 'rent';
                // Trigger change event to show equipment selector
                subjectSelect.dispatchEvent(new Event('change'));
            }
            
            // Set equipment type
            const equipmentType = this.getAttribute('data-equipment');
            if (equipmentSelect) {
                equipmentSelect.value = equipmentType;
            }
        });
    });

    // Buy button functionality
    const buyButtons = document.querySelectorAll('.buy-btn[data-material]');
    const materialSelect = document.getElementById('material');

    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Set subject to buy
            if (subjectSelect) {
                subjectSelect.value = 'buy';
                // Trigger change event to show material selector
                subjectSelect.dispatchEvent(new Event('change'));
            }
            
            // Set material type
            const materialType = this.getAttribute('data-material');
            if (materialSelect) {
                materialSelect.value = materialType;
            }
        });
    });

    // Price calculator functionality
    const quantityInput = document.getElementById('quantity');
    const priceCalculator = document.getElementById('price-calculator');
    const calculatedPriceSpan = document.getElementById('calculated-price');

    const materialPrices = {
        'bm': 3600,
        'dbm': 4000,
        'sdbc': 4500
    };

    function calculatePrice() {
        const selectedMaterial = materialSelect.value;
        const quantity = parseInt(quantityInput.value) || 0;
        
        if (selectedMaterial && quantity > 0) {
            const pricePerTon = materialPrices[selectedMaterial];
            const totalPrice = pricePerTon * quantity;
            calculatedPriceSpan.textContent = `Total Price: ₹${totalPrice.toLocaleString()}`;
            priceCalculator.style.display = 'block';
        } else {
            priceCalculator.style.display = 'none';
        }
    }

    if (materialSelect && quantityInput) {
        materialSelect.addEventListener('change', calculatePrice);
        quantityInput.addEventListener('input', calculatePrice);
    }

    // Expand/collapse project cards in all-projects section
    const projectCards = document.querySelectorAll('#all-projects .project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent nested clicks from bubbling (e.g., clicking inside .project-more-details)
            if (e.target.closest('.project-more-details')) return;
            // Collapse any other expanded card
            projectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
            // Toggle this card
            card.classList.toggle('expanded');
        });
    });

    // Expand/collapse project cards in index.html projects section
    const indexProjectCards = document.querySelectorAll('#projects .project-card');
    indexProjectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent nested clicks from bubbling (e.g., clicking inside .project-more-details)
            if (e.target.closest('.project-more-details')) return;
            // Collapse any other expanded card
            indexProjectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
            // Toggle this card
            card.classList.toggle('expanded');
        });
    });

    // Handle contact form submission for all pages
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(contactForm => {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Set reply-to field to user's email
            const emailInput = contactForm.querySelector('input[name="email"]');
            const replyToField = contactForm.querySelector('input[name="_replyto"]');
            if (emailInput && replyToField) {
                replyToField.value = emailInput.value;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Form submission failed');
                    });
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                // Fallback: try direct form submission
                const formData = new FormData(contactForm);
                const params = new URLSearchParams(formData);
                
                // Create a temporary form for fallback submission
                const tempForm = document.createElement('form');
                tempForm.method = 'POST';
                tempForm.action = contactForm.action;
                tempForm.style.display = 'none';
                
                // Add all form data
                for (const [key, value] of formData.entries()) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    tempForm.appendChild(input);
                }
                
                document.body.appendChild(tempForm);
                tempForm.submit();
                
                alert('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    });

    // Handle rent/buy/apply button clicks to scroll to contact form
    document.querySelectorAll('.rent-btn, .buy-btn, .apply-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const form = document.getElementById('contact-form');
            if (form) {
                form.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Auto-select the appropriate subject based on button type
                const subjectSelect = document.getElementById('subject');
                if (subjectSelect) {
                    if (this.classList.contains('rent-btn')) {
                        subjectSelect.value = 'rent';
                    } else if (this.classList.contains('buy-btn')) {
                        subjectSelect.value = 'buy';
                    } else if (this.classList.contains('apply-btn')) {
                        subjectSelect.value = 'career';
                    }
                    
                    // Trigger change event to show conditional fields
                    subjectSelect.dispatchEvent(new Event('change'));
                }
            }
        });
    });

    // Carousel functionality for Uparmunda project in projects.html
    document.querySelectorAll('.carousel[data-project="uparmunda"]').forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const leftBtn = carousel.querySelector('.carousel-btn.left');
        const rightBtn = carousel.querySelector('.carousel-btn.right');
        let current = 0;

        function showImage(idx) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === idx);
            });
        }

        leftBtn.addEventListener('click', e => {
            e.stopPropagation();
            current = (current - 1 + images.length) % images.length;
            showImage(current);
        });
        rightBtn.addEventListener('click', e => {
            e.stopPropagation();
            current = (current + 1) % images.length;
            showImage(current);
        });
    });
});
