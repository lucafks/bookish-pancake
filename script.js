document.addEventListener('DOMContentLoaded', () => {

    /* === Theme Toggle === */
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');

    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme, animate = true) {
        if (animate) {
            html.classList.add('theme-transition');
            setTimeout(() => html.classList.remove('theme-transition'), 350);
        }
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    setTheme(getPreferredTheme(), false);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    });

    /* === Navigation === */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    }, { passive: true });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let lastFocusedElement = null;

    function openMenu() {
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Fechar menu');
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
        lastFocusedElement = document.activeElement;
        const firstLink = navLinks.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        navLinks.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
                return;
            }
            if (e.key !== 'Tab') return;

            const focusable = navLinks.querySelectorAll('.nav-link, .theme-toggle');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    /* === Smooth Scroll === */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* === Active Section === */
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollPos = window.pageYOffset + 200;
                sections.forEach(section => {
                    const { top, height, id } = section.getBoundingClientRect();
                    const sectionTop = top + window.pageYOffset;
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + height) {
                        navLinkItems.forEach(link => {
                            const isActive = link.getAttribute('href') === '#' + id;
                            link.classList.toggle('active', isActive);
                            if (isActive) {
                                link.setAttribute('aria-current', 'page');
                            } else {
                                link.removeAttribute('aria-current');
                            }
                        });
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* === Animations === */
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(entry.target.dataset.delay || 0));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => observer.observe(el));

    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
        setTimeout(() => {
            line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 100 + i * 150);
    });

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 500 + i * 100);
    });

    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + i * 200);
    });

    /* === Form === */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Enviado!</span>';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    /* === Scroll to Top === */
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* === Dynamic Year === */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
