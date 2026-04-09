// Initialize Lucide Icons
lucide.createIcons();

// Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

// Theme Management
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    // Re-initialize the specific icon
    lucide.createIcons({
        nameAttr: 'data-lucide',
        attrs: {
            class: "lucide lucide-" + (theme === 'dark' ? 'sun' : 'moon')
        }
    });
}

// Nav indicator logic
const indicator = document.querySelector('.nav-indicator');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateIndicator(activeLink) {
    if (!activeLink || !indicator) return;
    
    // We want the indicator to match the left offset and width of the active link
    indicator.style.width = `${activeLink.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
}

// Initial positioning on load
window.addEventListener('load', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) {
        // slight timeout ensures fonts are loaded and widths are correct
        setTimeout(() => updateIndicator(active), 100);
    }
});

// Update position when window is resized
window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) updateIndicator(active);
});

// Active link highlighting on scroll via Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to corresponding link and update indicator
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                updateIndicator(activeLink);
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    if (section.getAttribute('id')) {
        observer.observe(section);
    }
});
