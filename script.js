// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        const heroTl = gsap.timeline();
        heroTl.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        // Parallax Effect for Hero Background
        gsap.to('.hero-bg', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 100,
            scale: 1.1
        });

        // Features Stagger Animation
        gsap.to('.feature-card', {
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    } else {
        console.warn('GSAP not loaded. Animations disabled.');
        // Fallback: Make elements visible
        document.querySelector('.hero-content').style.opacity = 1;
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '15px 5%';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.padding = '20px 5%';
        }
    });

    // Gallery Slider - Removed as gallery uses 360 viewer instead
    // If you need a traditional slider, add prev/next buttons to the HTML first

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Enhanced Preloader Hiding
    const preloader = document.querySelector('.preloader');
    let preloaderHidden = false;

    const forceHidePreloader = () => {
        if (preloaderHidden) return;
        preloaderHidden = true;

        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    };

    if (document.readyState === 'complete') {
        forceHidePreloader();
    } else {
        window.addEventListener('load', forceHidePreloader);
        // Fallback: If 'load' doesn't fire (local file), hide after timeout
        setTimeout(forceHidePreloader, 3000);
    }

    // Final safety net immediately to ensure it eventually hides
    setTimeout(forceHidePreloader, 4000);

    // Color Configurator
    const colorBtns = document.querySelectorAll('.color-btn');
    const heroImage = document.getElementById('hero-image');
    // gallery-hero-img removed as it does not exist in HTML

    const carImages = {
        silver: 'images/exterior-silver.png',
        red: 'images/exterior-red.png',
        white: 'images/exterior-white.png'
    };

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            colorBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            // Change Image
            const color = btn.getAttribute('data-color');
            const newSrc = carImages[color];

            // Simple fade effect
            if (typeof gsap !== 'undefined') {
                gsap.to(heroImage, {
                    opacity: 0, duration: 0.3, onComplete: () => {
                        heroImage.src = newSrc;
                        gsap.to(heroImage, { opacity: 1, duration: 0.3 });
                    }
                });
            } else {
                heroImage.src = newSrc;
            }
        });
    });

    // Test Drive Modal
    const modal = document.getElementById('test-drive-modal');
    const openModalBtns = document.querySelectorAll('.open-test-drive');
    const closeModal = document.querySelector('.close-modal');
    const testDriveForm = document.getElementById('test-drive-form');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (testDriveForm) {
        testDriveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            modal.style.display = 'none';
            testDriveForm.reset();
        });
    }

    // Map - Now using Google Maps iframe, no Leaflet initialization needed

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle (Simple)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0a0a0a';
            navLinks.style.padding = '20px';
        }
    });

    // Duplicate reviews for infinite scroll
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    if (reviewsCarousel) {
        const reviews = reviewsCarousel.innerHTML;
        reviewsCarousel.innerHTML += reviews;
    }

    // Finance Calculator
    const priceInput = document.getElementById('car-price');
    const downPaymentInput = document.getElementById('down-payment');
    const termInput = document.getElementById('loan-term');
    const termVal = document.getElementById('loan-term-val');
    const rateInput = document.getElementById('interest-rate');
    const monthlyPaymentDisplay = document.getElementById('monthly-payment');

    function calculateLoan() {
        const price = parseFloat(priceInput.value);
        const downPayment = parseFloat(downPaymentInput.value);
        const term = parseInt(termInput.value);
        const rate = parseFloat(rateInput.value) / 100 / 12;

        const loanAmount = price - downPayment;

        if (loanAmount <= 0) {
            monthlyPaymentDisplay.textContent = '0 ₽';
            return;
        }

        const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);

        monthlyPaymentDisplay.textContent = Math.round(monthlyPayment).toLocaleString('ru-RU') + ' ₽';
    }

    if (priceInput && downPaymentInput && termInput && rateInput) {
        [priceInput, downPaymentInput, termInput, rateInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input === termInput) {
                    termVal.textContent = termInput.value + ' мес';
                }
                calculateLoan();
            });
        });
        calculateLoan(); // Initial calc
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Подписано! ✓';
            btn.style.background = '#4CAF50';
            btn.style.borderColor = '#4CAF50';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                newsletterForm.reset();
            }, 3000);
        });
    }

    // Theme Switcher
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme);
    }

    // --- Advanced Features Set 2 ---

    // 1. Sport/Eco Modes
    const modeSelect = document.getElementById('drive-mode');

    if (modeSelect) {
        modeSelect.addEventListener('change', (e) => {
            const mode = e.target.value;
            document.documentElement.setAttribute('data-mode', mode);

            // Add some visual flair when changing modes
            gsap.from('body', {
                duration: 0.5,
                opacity: 0.8,
                ease: "power2.out"
            });
        });
    }

    // 2. Multilingual Support
    const translations = {
        ru: {
            nav_features: "Характеристики",
            nav_gallery: "Галерея",
            nav_models: "Комплектации",
            nav_compare: "Сравнение",
            nav_reviews: "Отзывы",
            nav_testdrive: "Тест-драйв",
            hero_title: "Твой новый автомобиль <br>ждёт тебя",
            hero_subtitle: "Мощность, стиль и технологии — всё в одной машине",
            choose_color: "Выберите цвет:",
            btn_more: "Узнать больше",
            btn_testdrive: "Записаться на тест-драйв",
            section_features: "Технологии будущего",
            section_gallery: "Галерея",
            section_models: "Комплектации",
            section_compare: "Сравнение",
            section_reviews: "Что говорят владельцы",
            section_faq: "Частые вопросы",
            section_calculator: "Кредитный калькулятор",
            section_interior: "Интерьер будущего"
        },
        en: {
            nav_features: "Features",
            nav_gallery: "Gallery",
            nav_models: "Models",
            nav_compare: "Compare",
            nav_reviews: "Reviews",
            nav_testdrive: "Test Drive",
            hero_title: "Your New Car <br>Awaits You",
            hero_subtitle: "Power, style, and technology — all in one machine",
            choose_color: "Choose Color:",
            btn_more: "Learn More",
            btn_testdrive: "Book Test Drive",
            section_features: "Future Technologies",
            section_gallery: "Gallery",
            section_models: "Trims",
            section_compare: "Comparison",
            section_reviews: "Owner Reviews",
            section_faq: "FAQ",
            section_calculator: "Finance Calculator",
            section_interior: "Future Interior"
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'ru';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ru' ? 'en' : 'ru';
            langToggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update placeholders
        if (lang === 'en') {
            document.getElementById('name').placeholder = "John Doe";
            document.getElementById('phone').placeholder = "+1 (555) 000-0000";
        } else {
            document.getElementById('name').placeholder = "Иван Иванов";
            document.getElementById('phone').placeholder = "+7 (999) 000-00-00";
        }
    }

    // 3. Live Notifications
    const notificationContainer = document.getElementById('notification-container');
    const messages = [
        { ru: "Александр из Москвы записался на тест-драйв", en: "Alexander from Moscow booked a test drive" },
        { ru: "Осталось всего 3 машины в комплектации GT", en: "Only 3 GT models left in stock" },
        { ru: "Кто-то сейчас смотрит комплектацию Performance", en: "Someone is viewing Performance trim right now" },
        { ru: "Новая заявка на кредит одобрена", en: "New finance application approved" },
        { ru: "Мария из СПб выбрала красный цвет", en: "Maria from SPb chose Red color" }
    ];

    function showNotification() {
        if (!notificationContainer) return;

        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const text = randomMsg[currentLang];

        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.innerHTML = `<i class="fa-solid fa-bell"></i> <span>${text}</span>`;

        notificationContainer.appendChild(toast);

        // Remove after animation (5s total: 0.5 in + 4 wait + 0.5 out)
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    // Start notifications loop
    setInterval(showNotification, 15000); // Every 15 seconds for demo purposes

    // Show first one quickly
    setTimeout(showNotification, 3000);

    // --- Advanced Features Set 3 (Sound, AI, 360, Configurator) ---

    // 4. Engine Sound Experience - REMOVED
    // User requested to remove this feature.

    // 5. AI Assistant
    const aiToggle = document.getElementById('ai-toggle');
    const aiWidget = document.getElementById('ai-widget');
    const aiClose = document.querySelector('.ai-close');
    const aiInput = document.getElementById('ai-input');
    const aiSend = document.getElementById('ai-send');
    const aiMessages = document.getElementById('ai-messages');

    if (aiToggle && aiWidget) {
        aiToggle.addEventListener('click', () => {
            aiWidget.classList.add('active');
            aiToggle.style.display = 'none';
        });

        aiClose.addEventListener('click', () => {
            aiWidget.classList.remove('active');
            setTimeout(() => {
                aiToggle.style.display = 'flex';
            }, 300);
        });
    }

    const aiKnowledge = {
        "цена": "Базовая версия стартует от 3 500 000 ₽, а топовая GT Sport — от 6 200 000 ₽.",
        "price": "Base model starts at 3.5M RUB, while GT Sport is 6.2M RUB.",
        "запас": "Запас хода составляет до 600 км на одном заряде.",
        "range": "Range is up to 600 km on a single charge.",
        "скорость": "Максимальная скорость — 320 км/ч в версии GT Sport.",
        "speed": "Top speed is 320 km/h for the GT Sport trim.",
        "зарядка": "Быстрая зарядка до 80% занимает всего 15 минут.",
        "charging": "Fast charging to 80% takes only 15 minutes.",
        "тест": "Вы можете записаться на тест-драйв, нажав кнопку 'Записаться' в меню.",
        "телефон": "Наш телефон: +7 (999) 123-45-67.",
        "default": "Я пока учусь, но могу рассказать про цену, скорость, запас хода и зарядку. Спрашивайте!"
    };

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `ai-msg ai-msg-${sender}`;
        div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        aiMessages.appendChild(div);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function processUserMessage() {
        const text = aiInput.value.trim().toLowerCase();
        if (!text) return;

        addMessage(aiInput.value, 'user');
        aiInput.value = '';

        // Simulate thinking
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'ai-msg ai-msg-bot';
        thinkingDiv.innerHTML = '<i class="fa-solid fa-ellipsis fa-bounce"></i>';
        aiMessages.appendChild(thinkingDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;

        setTimeout(() => {
            thinkingDiv.remove();
            let response = aiKnowledge.default;
            for (const key in aiKnowledge) {
                if (text.includes(key)) {
                    response = aiKnowledge[key];
                    break;
                }
            }
            addMessage(response, 'bot');
        }, 1000);
    }

    if (aiSend) {
        aiSend.addEventListener('click', processUserMessage);
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') processUserMessage();
        });
    }

    // 6. 360 Viewer - FIXED with Buttons
    const viewer360 = document.querySelector('.viewer-360');
    if (viewer360) {
        const img = viewer360.querySelector('img');
        const hint = viewer360.querySelector('.viewer-hint');
        const prevBtn = viewer360.querySelector('.prev');
        const nextBtn = viewer360.querySelector('.next');

        let isDragging = false;
        let startX = 0;

        // Available images for rotation simulation
        // In a real scenario, this would be an array of ~36 images for full rotation
        const frames = ['images/exterior-silver.png', 'images/interior-black.png', 'images/exterior-silver.png'];
        let currentFrameIndex = 0;

        viewer360.style.cursor = 'grab';

        const updateFrame = (direction) => {
            if (direction === 'next') {
                currentFrameIndex = (currentFrameIndex + 1) % frames.length;
            } else {
                currentFrameIndex = (currentFrameIndex - 1 + frames.length) % frames.length;
            }
            img.src = frames[currentFrameIndex];

            // Subtle animation
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(img, { opacity: 0.8 }, { opacity: 1, duration: 0.2 });
            }
        };

        // Button Controls
        if (prevBtn) prevBtn.addEventListener('click', () => updateFrame('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => updateFrame('next'));

        // Drag Controls
        viewer360.addEventListener('mousedown', (e) => {
            if (e.target.closest('button')) return; // Ignore clicks on buttons
            isDragging = true;
            startX = e.clientX;
            viewer360.style.cursor = 'grabbing';
            if (hint) hint.style.opacity = '0';
        });

        viewer360.addEventListener('touchstart', (e) => {
            if (e.target.closest('button')) return;
            isDragging = true;
            startX = e.touches[0].clientX;
            if (hint) hint.style.opacity = '0';
        }, { passive: true });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            if (viewer360) viewer360.style.cursor = 'grab';
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;

            // Reduced threshold for better sensitivity (was 80)
            if (Math.abs(dx) > 30) {
                if (dx > 0) {
                    updateFrame('prev'); // Drag right -> rotate left (usually natural feel)
                } else {
                    updateFrame('next'); // Drag left -> rotate right
                }
                startX = e.clientX; // Reset startX to prevent rapid spinning
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - startX;

            if (Math.abs(dx) > 30) {
                if (dx > 0) {
                    updateFrame('prev');
                } else {
                    updateFrame('next');
                }
                startX = e.touches[0].clientX;
            }
        }, { passive: true });
    }

    // 7. Advanced Configurator - FIXED with Visuals & Dynamic Pricing
    const configTabs = document.querySelectorAll('.config-tab');
    const configGrids = document.querySelectorAll('.config-options-grid');
    const configOptions = document.querySelectorAll('.config-option');
    const configPreview = document.querySelector('.config-preview img');
    const configPriceDisplay = document.getElementById('config-price');
    const basePrice = 4800000;

    // Asset Mappings for available images
    const configAssets = {
        color: {
            silver: { src: 'images/exterior-silver.png', filter: 'none' },
            red: { src: 'images/exterior-red.png', filter: 'none' },
            white: { src: 'images/exterior-white.png', filter: 'none' },
            black: { src: 'images/exterior-black.png', filter: 'none' },
            blue: { src: 'images/exterior-blue.png', filter: 'none' },
            green: { src: 'images/exterior-silver.png', filter: 'hue-rotate(90deg) saturate(1.2) brightness(0.8)' }, // Fallback
            gold: { src: 'images/exterior-silver.png', filter: 'sepia(1) saturate(2) brightness(0.9)' } // New Gold Option
        },
        interior: {
            black: { src: 'images/interior-black.png', filter: 'none' },
            white: { src: 'images/interior-black.png', filter: 'brightness(1.5) contrast(0.8)' }, // Fallback
            brown: { src: 'images/interior-black.png', filter: 'sepia(0.6) hue-rotate(-10deg) saturate(1.5) brightness(0.9)' }, // Fallback
            carbon: { src: 'images/interior-black.png', filter: 'grayscale(1) contrast(1.2)' } // Fallback
        }
    };

    function updateConfigPrice() {
        let totalPrice = basePrice;
        document.querySelectorAll('.config-option.active').forEach(opt => {
            const price = parseInt(opt.getAttribute('data-price') || 0);
            totalPrice += price;
        });
        if (configPriceDisplay) {
            configPriceDisplay.textContent = totalPrice.toLocaleString('ru-RU') + ' ₽';
        }
    }

    function updateConfigVisuals() {
        const activeTab = document.querySelector('.config-tab.active')?.dataset.target;
        const selectedColor = document.querySelector('#opt-colors .config-option.active')?.dataset.val || 'silver';
        const selectedInterior = document.querySelector('#opt-interior .config-option.active')?.dataset.val || 'black';

        // Determine what to show based on active tab
        if (activeTab === 'opt-interior') {
            // Show Interior
            const interiorSettings = configAssets.interior[selectedInterior];
            if (interiorSettings) {
                configPreview.src = interiorSettings.src;
                configPreview.style.filter = interiorSettings.filter;
            }
        } else {
            // Show Exterior (Colors or Wheels tab)
            // Ideally we would show wheels on the specific color, but for now we fallback to the selected color image
            // Note: Simplification - we don't have unique images for every Color + Wheel combo.
            // We will just show the Color image.

            const colorSettings = configAssets.color[selectedColor];
            if (colorSettings) {
                configPreview.src = colorSettings.src;
                configPreview.style.filter = colorSettings.filter;
            }
        }

        // Simple animation for transition
        if (typeof gsap !== 'undefined') {
            gsap.from(configPreview, { opacity: 0.8, duration: 0.2 });
        }
    }

    if (configTabs.length) {
        configTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Switch Tabs
                configTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const target = tab.getAttribute('data-target');
                configGrids.forEach(grid => {
                    if (grid.id === target) {
                        grid.classList.add('active');
                        if (typeof gsap !== 'undefined') {
                            gsap.from(grid, { opacity: 0, y: 20, duration: 0.3 });
                        }
                    } else {
                        grid.classList.remove('active');
                    }
                });

                // Update visuals when switching tabs
                updateConfigVisuals();
            });
        });

        configOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                // Select Option
                const siblings = opt.parentElement.children;
                for (let sibling of siblings) sibling.classList.remove('active');
                opt.classList.add('active');

                // Update price
                updateConfigPrice();

                // Update visual preview
                updateConfigVisuals();

                // Visual feedback on button
                if (typeof gsap !== 'undefined') {
                    gsap.from(opt, { scale: 0.9, duration: 0.2 });
                }
            });
        });

        // Initial setup
        updateConfigPrice();
        setTimeout(updateConfigVisuals, 100); // Ensure clean load
    }

    // --- Fixes for User Reported Issues + Animations ---

    // Fix 1: Finance Calculator "Оформить заявку" button
    const financeBtn = document.querySelector('.calculator-result .btn-primary');
    if (financeBtn) {
        financeBtn.addEventListener('click', () => {
            const price = document.getElementById('monthly-payment').textContent;
            if (price === '0 ₽') {
                alert('Пожалуйста, проверьте данные калькулятора (сумма кредита должна быть больше 0).');
            } else {
                alert(`Ваша заявка на кредит (Ежемесячный платеж: ${price}) отправлена! Менеджер свяжется с вами.`);
            }
        });
    }

    // Fix 2: Configurator "Заказать" button
    const configOrderBtn = document.querySelector('.config-controls .btn-primary');
    if (configOrderBtn) {
        configOrderBtn.addEventListener('click', () => {
            const selectedColor = document.querySelector('#opt-colors .config-option.active .option-tooltip')?.textContent || 'Default';
            const selectedWheel = document.querySelector('#opt-wheels .config-option.active .option-tooltip')?.textContent || 'Default';
            const selectedInterior = document.querySelector('#opt-interior .config-option.active .option-tooltip')?.textContent || 'Default';
            const totalPrice = document.getElementById('config-price')?.textContent || '0 ₽';

            alert(`Ваш заказ на конфигурацию принят!\nЦвет: ${selectedColor}\nДиски: ${selectedWheel}\nСалон: ${selectedInterior}\nИтоговая цена: ${totalPrice}\n\nМы скоро свяжемся с вами для уточнения деталей.`);
        });
    }

    // Fix 3: Model Cards "Выбрать" buttons with ANIMATIONS
    const modelBtns = document.querySelectorAll('.model-card button');
    const modelCards = document.querySelectorAll('.model-card');

    // Add hover animations to model cards
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0, 200, 255, 0.3)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    scale: 1,
                    boxShadow: '0 0 20px rgba(0, 200, 255, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });

    modelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.model-card');
            const modelName = card.querySelector('h3').textContent;

            // Animate button click
            if (typeof gsap !== 'undefined') {
                gsap.from(btn, { scale: 0.9, duration: 0.2 });
            }

            const modal = document.getElementById('test-drive-modal');
            if (modal) {
                modal.style.display = 'flex';
                const modalTitle = modal.querySelector('h2');
                if (modalTitle) modalTitle.textContent = `Запись на тест-драйв: ${modelName}`;
            }
        });
    });

});
