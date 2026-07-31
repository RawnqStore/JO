document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Header
    const header = document.getElementById('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // Theme Toggle
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('rawnq_theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('rawnq_theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Language Toggle
    const langToggleBtn = document.querySelector('.lang-toggle');
    const savedLang = localStorage.getItem('rawnq_lang') || 'ar';
    htmlEl.setAttribute('lang', savedLang);
    htmlEl.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');

    langToggleBtn.addEventListener('click', () => {
        const currentLang = htmlEl.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        htmlEl.setAttribute('lang', newLang);
        htmlEl.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('rawnq_lang', newLang);
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.getElementById('closeNavBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if(mobileBtn && closeBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => mobileNav.classList.add('active'));
        closeBtn.addEventListener('click', () => mobileNav.classList.remove('active'));
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('active'));
        });
    }

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Form Submission (WhatsApp Integration)
    const waForm = document.getElementById('whatsapp-form');
    if (waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('clientName').value;
            const service = document.getElementById('serviceType').value;
            const details = document.getElementById('orderDetails').value;
            
            const message = `*طلب رسمي - Rawnq Store*%0A%0A*الجهة:* ${name}%0A*الخدمة المطلوبة:* ${service}%0A*التفاصيل:* ${details}`;
            
            // Corrected phone number
            const phone = '962781918513';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(url, '_blank');
        });
    }
});
