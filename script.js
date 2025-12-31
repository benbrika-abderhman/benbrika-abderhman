/* ========================================
   Portfolio - JavaScript Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initSkillBars();
    initPortfolioFilter();
    initStatsCounter();
    initScrollAnimations();
    initContactForm();
    initTradingViewCharts();
});

// ========================================
// TradingView Charts
// ========================================
function initTradingViewCharts() {
    // Load TradingView library
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = function () {
        // BTC Chart
        new TradingView.MediumWidget({
            "symbols": [["Bitcoin", "BINANCE:BTCUSDT|1M"]],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "ar",
            "colorTheme": "dark",
            "autosize": true,
            "showVolume": false,
            "hideDateRanges": false,
            "hideMarketStatus": true,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "lineColor": "#6366f1",
            "bottomColor": "rgba(99, 102, 241, 0)",
            "topColor": "rgba(99, 102, 241, 0.3)",
            "container_id": "btc-chart-widget"
        });

        // US30 Chart
        new TradingView.MediumWidget({
            "symbols": [["US30", "TVC:DJI|1M"]],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "ar",
            "colorTheme": "dark",
            "autosize": true,
            "showVolume": false,
            "hideDateRanges": false,
            "hideMarketStatus": true,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "lineColor": "#10b981",
            "bottomColor": "rgba(16, 185, 129, 0)",
            "topColor": "rgba(16, 185, 129, 0.3)",
            "container_id": "us30-chart-widget"
        });
    };
    document.head.appendChild(script);
}

// ========================================
// Chart Modal Functions
// ========================================
function openChartModal(symbol, title) {
    const modal = document.getElementById('chartModal');
    const modalTitle = document.getElementById('chartModalTitle');
    const modalBody = document.getElementById('chartModalBody');

    modalTitle.textContent = title;

    // Create TradingView Advanced Chart iframe
    modalBody.innerHTML = `
        <iframe 
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_modal&symbol=${encodeURIComponent(symbol)}&interval=60&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=1e222d&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=ar&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=${encodeURIComponent(symbol)}"
            style="width: 100%; height: 100%; border: none;"
            allowtransparency="true"
            frameborder="0"
            allowfullscreen>
        </iframe>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeChartModal() {
    const modal = document.getElementById('chartModal');
    const modalBody = document.getElementById('chartModalBody');

    modal.classList.remove('active');
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeChartModal();
    }
});

// Close modal on background click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('chart-modal')) {
        closeChartModal();
    }
});

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Skill Bars Animation
// ========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ========================================
// Portfolio Filter
// ========================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// Stats Counter Animation
// ========================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .detail-card, .service-card, .portfolio-item, .stat-box, .testimonial-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Show success message (in real app, send to server)
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>تم الإرسال بنجاح! ✓</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);

            console.log('Form submitted:', data);
        });
    }
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// TradingView Charts
// ========================================
function initTradingViewCharts() {
    // Load TradingView library
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = function () {
        // BTC Chart
        new TradingView.MediumWidget({
            "symbols": [["Bitcoin", "BINANCE:BTCUSDT|1M"]],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "ar",
            "colorTheme": "dark",
            "autosize": true,
            "showVolume": false,
            "hideDateRanges": false,
            "hideMarketStatus": true,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "lineColor": "#6366f1",
            "bottomColor": "rgba(99, 102, 241, 0)",
            "topColor": "rgba(99, 102, 241, 0.3)",
            "container_id": "btc-chart-widget"
        });

        // US30 Chart
        new TradingView.MediumWidget({
            "symbols": [["US30", "FOREXCOM:DJI|1M"]],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "ar",
            "colorTheme": "dark",
            "autosize": true,
            "showVolume": false,
            "hideDateRanges": false,
            "hideMarketStatus": true,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "lineColor": "#10b981",
            "bottomColor": "rgba(16, 185, 129, 0)",
            "topColor": "rgba(16, 185, 129, 0.3)",
            "container_id": "us30-chart-widget"
        });
    };
    document.head.appendChild(script);
}

// ========================================
// Chart Modal Functions
// ========================================
function openChartModal(symbol, title) {
    const modal = document.getElementById('chartModal');
    const modalTitle = document.getElementById('chartModalTitle');
    const modalBody = document.getElementById('chartModalBody');

    modalTitle.textContent = title;

    // Create TradingView Advanced Chart iframe
    modalBody.innerHTML = `
        <iframe 
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_modal&symbol=${encodeURIComponent(symbol)}&interval=60&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=1e222d&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=ar&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=${encodeURIComponent(symbol)}"
            style="width: 100%; height: 100%; border: none;"
            allowtransparency="true"
            frameborder="0"
            allowfullscreen>
        </iframe>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeChartModal() {
    const modal = document.getElementById('chartModal');
    const modalBody = document.getElementById('chartModalBody');

    modal.classList.remove('active');
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeChartModal();
    }
});

// Close modal on background click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('chart-modal')) {
        closeChartModal();
    }
});
