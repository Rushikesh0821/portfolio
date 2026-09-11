// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- FORM SUBMISSION LOGIC ---
const form = document.querySelector('.contact-form-container form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default page reload
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    // Change button text to show loading
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            // Success Message
            alert("Message sent successfully! I'll get back to you soon.");
            form.reset(); // Clears the form
        } else {
            // Error Message
            console.log(response);
            alert(json.message);
        }
    })
    .catch(error => {
        console.log(error);
        alert("Something went wrong! Please try again.");
    })
    .finally(() => {
        // Change button text back to original
        submitBtn.innerText = originalText;
    });
});