function toggleTraining(trainingType) {
    const schoolDetails = document.getElementById("schoolTrainingDetails");
    const preschoolDetails = document.getElementById("preschoolTrainingDetails");
    
    // Find the specific toggle text paragraph within the clicked card
    let clickedCardToggleText = null;
    if (trainingType === "school") {
        clickedCardToggleText = document.querySelector('[onclick="toggleTraining(\'school\')"] .service-card-details-toggle');
    } else if (trainingType === "preschool") {
        clickedCardToggleText = document.querySelector('[onclick="toggleTraining(\'preschool\')"] .service-card-details-toggle');
    }
    
    // Helper to update toggle text and arrow for a specific element
    const updateToggleText = (detailsElement, toggleTextElement) => {
        if (toggleTextElement) { // Check if the element exists
            if (detailsElement.classList.contains('hidden')) {
                toggleTextElement.innerHTML = 'Kliknij, aby rozwinąć &#8595;';
            } else {
                toggleTextElement.innerHTML = 'Kliknij, aby zwinąć &#8593;';
            }
        }
    };

    if (trainingType === "school") {
        schoolDetails.classList.toggle('hidden');
        // If school details are now open, ensure preschool details are hidden
        if (!schoolDetails.classList.contains('hidden')) {
            preschoolDetails.classList.add('hidden');
            // Update preschool toggle text if it was open
            const preschoolToggleText = document.querySelector('[onclick="toggleTraining(\'preschool\')"] .service-card-details-toggle');
            updateToggleText(preschoolDetails, preschoolToggleText);
        }
        updateToggleText(schoolDetails, clickedCardToggleText);
    } else if (trainingType === "preschool") {
        preschoolDetails.classList.toggle('hidden');
        // If preschool details are now open, ensure school details are hidden
        if (!preschoolDetails.classList.contains('hidden')) {
            schoolDetails.classList.add('hidden');
            // Update school toggle text if it was open
            const schoolToggleText = document.querySelector('[onclick="toggleTraining(\'school\')"] .service-card-details-toggle');
            updateToggleText(schoolDetails, schoolToggleText);
        }
        updateToggleText(preschoolDetails, clickedCardToggleText);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Prevent error if href is just "#"
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            let offset = 70; // Default offset for sticky nav
            if (window.innerWidth <= 768 && getComputedStyle(navbar).position === 'static') {
                offset = 10; // Smaller offset if nav is static
            }

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Shrinking header (navbar style change) and back to top button visibility
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Navbar style and Back-to-top button
    if (window.scrollY > 100) {
        if (navbar) navbar.classList.add('nav-scrolled');
        if (backToTop) backToTop.classList.add('visible');
    } else {
        if (navbar) navbar.classList.remove('nav-scrolled');
        if (backToTop) backToTop.classList.remove('visible');
    }
    
    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    let offset = 100; // Default offset
    if (navbar && window.innerWidth <= 768 && getComputedStyle(navbar).position === 'static') {
        offset = 50; // Smaller offset if nav is static
    }
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset; 
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSectionId) {
            link.classList.add('active');
        }
    });
});

// Form submission with validation and feedback (if a form with id="contactForm" is added)
const contactForm = document.getElementById('contactForm'); 
const submitBtn = document.getElementById('submitBtn'); 
const formLoader = document.getElementById('formLoader');
const toast = document.getElementById('toast');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (submitBtn && formLoader) {
            const buttonTextSpan = submitBtn.querySelector('span:first-child'); // Assuming button text is in a span
            if (buttonTextSpan) {
                 buttonTextSpan.style.opacity = '0.5';
            }
            formLoader.style.display = 'inline-block';
            submitBtn.disabled = true; // Disable button during submission
        }
        
        // Simulate form submission
        setTimeout(() => {
             if (submitBtn && formLoader) {
                const buttonTextSpan = submitBtn.querySelector('span:first-child');
                 if (buttonTextSpan) {
                     buttonTextSpan.style.opacity = '1';
                 }
                 formLoader.style.display = 'none';
                 submitBtn.disabled = false; // Re-enable button
             }
            
            contactForm.reset(); // Reset form fields
            // Trigger input event for floating labels to reset (if any field had value)
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                input.dispatchEvent(new Event('input'));
            });
            
            if (toast) {
                 toast.classList.add('show');
                 setTimeout(() => {
                     toast.classList.remove('show');
                 }, 3000);
            }
        }, 1500);
    });
} else {
    // console.warn('Contact form with id="contactForm" not found. Form submission script not fully active.');
}

// Floating labels animation enhancement/fix (if a form is added)
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    const label = input.nextElementSibling; // Assuming label is the next sibling

    const checkValue = () => {
        if (input.value) {
            if(label && label.tagName === 'LABEL') label.classList.add('has-value'); // Check if label exists and is a LABEL
        } else {
            if(label && label.tagName === 'LABEL') label.classList.remove('has-value');
        }
    };

    checkValue(); // Initial check
    input.addEventListener('input', checkValue);
});

// Note: The script for '.service-card-details-toggle' was removed as its
// functionality (updating text/arrow) is now part of the toggleTraining function.