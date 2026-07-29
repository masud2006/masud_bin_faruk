// Luxury Executive Website – Interactive Enhancements

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Executive Portfolio Initialized');

    initNavigation();
    initMobileMenu();
    initScrollReveal();
    initAchievementsButton();
    initVentureCards();
    initContactLinks();
    initSmoothHoverEffects();
    setCurrentYear();
});

// Navigation – active link & smooth scroll
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Header background opacity
        const header = document.querySelector('.executive-header');
        if (window.scrollY > 60) {
            header.style.background = 'rgba(10, 10, 10, 0.96)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.92)';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = target.offsetTop - 80;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
            // Close mobile menu
            const nav = document.querySelector('.executive-nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                resetMenuIcon();
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.executive-nav');
    if (!btn) return;

    btn.addEventListener('click', function() {
        nav.classList.toggle('active');
        animateMenuIcon(nav);
    });

    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !btn.contains(e.target)) {
            nav.classList.remove('active');
            resetMenuIcon();
        }
    });
}

function animateMenuIcon(nav) {
    const bars = document.querySelectorAll('.mobile-menu-btn .bar');
    if (nav.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-6px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-6px, -6px)';
    } else {
        resetMenuIcon();
    }
}

function resetMenuIcon() {
    const bars = document.querySelectorAll('.mobile-menu-btn .bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

// Scroll Reveal (only opacity, no translation)
function initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal:not(.journey-container .scroll-reveal)');

    function checkReveal() {
        const trigger = window.innerHeight * 0.88;
        elements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < trigger) {
                el.classList.add('active');
            }
        });
    }

    checkReveal();
    let timeout;
    window.addEventListener('scroll', function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                checkReveal();
                timeout = null;
            }, 100);
        }
    });
}

// Achievements "View All" button – show maintenance modal
function initAchievementsButton() {
    const btn = document.querySelector('.view-all-achievements');
    if (!btn) return;

    btn.addEventListener('click', function() {
        showMaintenanceModal();
    });
}

function showMaintenanceModal() {
    // Create elegant modal overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.backdropFilter = 'blur(8px)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.animation = 'fadeIn 0.3s ease';

    const modal = document.createElement('div');
    modal.style.background = '#1A1A1A';
    modal.style.border = '1px solid #D4AF37';
    modal.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8)';
    modal.style.padding = '3rem 4rem';
    modal.style.maxWidth = '500px';
    modal.style.width = '90%';
    modal.style.textAlign = 'center';
    modal.style.borderRadius = '4px';
    modal.style.position = 'relative';

    modal.innerHTML = `
        <span style="position:absolute; top:1rem; right:1.5rem; font-size:2rem; color:#D4AF37; cursor:pointer; transition:transform 0.2s;" class="close-modal">&times;</span>
        <div style="font-size:3rem; color:#D4AF37; margin-bottom:1rem;">&#9889;</div>
        <h2 style="font-family:'Playfair Display',serif; color:#D4AF37; margin-bottom:0.5rem;">Page Under Maintenance</h2>
        <p style="color:#CCCCCC; font-weight:300; margin-bottom:1.5rem;">We're working on something amazing. Please check back soon.</p>
        <button style="background:#D4AF37; color:#0A0A0A; border:none; padding:0.8rem 2.5rem; font-weight:600; cursor:pointer; transition:0.3s; border-radius:2px;" class="modal-close-btn">Close</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close functions
    const closeModal = () => {
        document.body.removeChild(overlay);
    };

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });

    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Venture Cards – already have href, just ensure smooth behavior
function initVentureCards() {
    // All venture cards are <a> tags, default behavior is fine.
}

// Contact links – open in new tab (already have target="_blank")
function initContactLinks() {
    const items = document.querySelectorAll('.contact-visual-item');
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            // add a subtle feedback
            this.style.transform = 'scale(0.97)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Smooth hover micro-interactions (optional)
function initSmoothHoverEffects() {
    // Already handled in CSS
}

// Set current year in footer
function setCurrentYear() {
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        const year = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2026', year);
    }
}

// Additional: handle resize for mobile menu
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            const nav = document.querySelector('.executive-nav');
            if (nav) nav.classList.remove('active');
            resetMenuIcon();
        }
    }, 200);
});

// Keyboard accessibility: close modal with Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.parentElement.removeChild(modal);
        }
    }
});

console.log('✅ Executive website ready');