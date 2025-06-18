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
});
