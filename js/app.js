// Government Schemes Portal - Main JavaScript
class GovernmentSchemesPortal {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferred_language') || 'hindi';
        this.schemes = [];
        this.categories = [];
        this.updates = [];
        this.translations = {};

        this.init();
    }

    async init() {
        try {
            // Show loading overlay
            this.showLoading();

            // Load data and translations
            await Promise.all([
                this.loadSchemesData(),
                this.loadTranslations()
            ]);

            // Initialize components
            this.setupEventListeners();
            this.initializeLanguage();
            this.renderComponents();
            this.setupSearchFunctionality();
            this.setupBackToTop();
            this.setupFAQAccordion();

            // Hide loading overlay
            this.hideLoading();

        } catch (error) {
            console.error('Failed to initialize portal:', error);
            this.hideLoading();
        }
    }

    async loadSchemesData() {
        try {
            const response = await fetch('data/schemes.json');
            if (!response.ok) throw new Error('Failed to fetch schemes data');

            const data = await response.json();
            this.schemes = data.schemes || [];
            this.categories = data.categories || [];
            this.updates = data.updates || [];

            console.log(`Loaded ${this.schemes.length} schemes, ${this.categories.length} categories, ${this.updates.length} updates`);
        } catch (error) {
            console.error('Error loading schemes data:', error);
            // Fallback to empty arrays if data loading fails
            this.schemes = [];
            this.categories = [];
            this.updates = [];
        }
    }

    async loadTranslations() {
        this.translations = {
            english: {
                // Header & Navigation
                portalName: "Sarkari Yojana Portal",
                navHome: "Home",
                navSchemes: "Schemes", 
                navUpdates: "Latest Updates",
                navCategories: "Categories",
                navContact: "Contact",
                searchPlaceholder: "Search schemes...",

                // Hero Section
                heroTitle: "Complete Government Schemes Information Portal",
                heroSubtitle: "Get latest updates on installment dates, eligibility criteria, application process, and benefits for all major Indian government schemes in Hindi, English & Marathi",
                browseSchemes: "Browse All Schemes",
                latestUpdates: "Latest Updates",

                // Stats
                statSchemes: "Major Schemes",
                statBeneficiaries: "Crore Beneficiaries", 
                statLanguages: "Languages",

                // Breaking News
                breakingNews: "Breaking News",
                loadingUpdates: "Loading latest updates...",

                // Sections
                featuredSchemes: "Featured Government Schemes",
                featuredSchemesDesc: "Explore the most popular and beneficial government schemes",
                latestUpdatesTitle: "Latest Updates & News",
                latestUpdatesDesc: "Stay informed with the latest scheme updates and announcements",
                browseByCategory: "Browse by Category",
                browseByCategoryDesc: "Find schemes organized by different categories",

                // Categories
                allCategories: "All Categories",
                womenWelfare: "Women Welfare",
                housing: "Housing", 
                health: "Health",
                agriculture: "Agriculture",

                // How It Works
                howItWorksTitle: "How to Apply for Government Schemes",
                howItWorksDesc: "Simple 4-step process to apply for any government scheme",
                step1Title: "Find Your Scheme",
                step1Desc: "Browse and search for schemes that match your profile",
                step2Title: "Check Eligibility", 
                step2Desc: "Verify if you meet all the eligibility criteria",
                step3Title: "Prepare Documents",
                step3Desc: "Gather all required documents as per the scheme",
                step4Title: "Submit Application",
                step4Desc: "Apply online or offline through official channels",

                // Newsletter
                newsletterTitle: "Never Miss An Update",
                newsletterDesc: "Subscribe to get instant notifications about scheme updates, new launches, and application deadlines",
                emailPlaceholder: "Enter your email address",
                subscribe: "Subscribe",
                privacyNote: "We respect your privacy. Unsubscribe anytime.",

                // Footer
                footerDesc: "Your trusted source for complete information about Indian government schemes and benefits.",
                popularSchemes: "Popular Schemes",
                quickLinks: "Quick Links", 
                contactUs: "Contact Us",
                aboutUs: "About Us",
                privacyPolicy: "Privacy Policy",
                termsConditions: "Terms & Conditions",
                disclaimer: "Disclaimer",
                copyright: "© 2024 Sarkari Yojana Portal. All rights reserved.",

                // Buttons & Actions
                applyNow: "Apply Now",
                viewAllSchemes: "View All Schemes",
                learnMore: "Learn More",
                checkStatus: "Check Status",
                loading: "Loading...",

                // Common
                benefit: "Benefit",
                frequency: "Frequency", 
                area: "Area",
                status: "Status",
                active: "Active",
                eligibility: "Eligibility",
                documents: "Documents Required",
                lastUpdate: "Last Updated"
            },
            hindi: {
                // Header & Navigation  
                portalName: "सरकारी योजना पोर्टल",
                navHome: "होम",
                navSchemes: "योजनाएं",
                navUpdates: "नवीनतम अपडेट",
                navCategories: "श्रेणियां",
                navContact: "संपर्क",
                searchPlaceholder: "योजनाएं खोजें...",

                // Hero Section
                heroTitle: "संपूर्ण सरकारी योजना सूचना पोर्टल",
                heroSubtitle: "सभी प्रमुख भारतीय सरकारी योजनाओं की किस्त तिथियों, पात्रता मापदंड, आवेदन प्रक्रिया और लाभों के बारे में हिंदी, अंग्रेजी और मराठी में नवीनतम अपडेट प्राप्त करें",
                browseSchemes: "सभी योजनाएं देखें",
                latestUpdates: "नवीनतम अपडेट",

                // Stats
                statSchemes: "प्रमुख योजनाएं",
                statBeneficiaries: "करोड़ लाभार्थी",
                statLanguages: "भाषाएं",

                // Breaking News
                breakingNews: "ब्रेकिंग न्यूज",
                loadingUpdates: "नवीनतम अपडेट लोड हो रहे हैं...",

                // Sections
                featuredSchemes: "प्रमुख सरकारी योजनाएं",
                featuredSchemesDesc: "सबसे लोकप्रिय और लाभकारी सरकारी योजनाओं का अन्वेषण करें",
                latestUpdatesTitle: "नवीनतम अपडेट और समाचार",
                latestUpdatesDesc: "नवीनतम योजना अपडेट और घोषणाओं के साथ अपडेट रहें",
                browseByCategory: "श्रेणी के अनुसार ब्राउज़ करें",
                browseByCategoryDesc: "विभिन्न श्रेणियों में व्यवस्थित योजनाएं खोजें",

                // Categories
                allCategories: "सभी श्रेणियां",
                womenWelfare: "महिला कल्याण", 
                housing: "आवास",
                health: "स्वास्थ्य",
                agriculture: "कृषि",

                // How It Works
                howItWorksTitle: "सरकारी योजनाओं के लिए आवेदन कैसे करें",
                howItWorksDesc: "किसी भी सरकारी योजना के लिए आवेदन करने की सरल 4-चरणीय प्रक्रिया",
                step1Title: "अपनी योजना खोजें",
                step1Desc: "अपनी प्रोफ़ाइल से मेल खाने वाली योजनाओं को ब्राउज़ और खोजें",
                step2Title: "पात्रता जांचें",
                step2Desc: "सत्यापित करें कि क्या आप सभी पात्रता मापदंडों को पूरा करते हैं",
                step3Title: "दस्तावेज तैयार करें",
                step3Desc: "योजना के अनुसार सभी आवश्यक दस्तावेज एकत्र करें",
                step4Title: "आवेदन जमा करें",
                step4Desc: "आधिकारिक चैनलों के माध्यम से ऑनलाइन या ऑफलाइन आवेदन करें",

                // Newsletter
                newsletterTitle: "कोई अपडेट न चूकें",
                newsletterDesc: "योजना अपडेट, नई लॉन्च और आवेदन की समय सीमा के बारे में तुरंत सूचनाएं प्राप्त करने के लिए सब्स्क्राइब करें",
                emailPlaceholder: "अपना ईमेल पता दर्ज करें",
                subscribe: "सब्स्क्राइब करें",
                privacyNote: "हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी अनसब्स्क्राइब करें।",

                // Footer
                footerDesc: "भारतीय सरकारी योजनाओं और लाभों के बारे में पूरी जानकारी के लिए आपका विश्वसनीय स्रोत।",
                popularSchemes: "लोकप्रिय योजनाएं",
                quickLinks: "त्वरित लिंक",
                contactUs: "संपर्क करें",
                aboutUs: "हमारे बारे में",
                privacyPolicy: "गोपनीयता नीति",
                termsConditions: "नियम और शर्तें",
                disclaimer: "अस्वीकरण",
                copyright: "© 2024 सरकारी योजना पोर्टल। सभी अधिकार सुरक्षित।",

                // Buttons & Actions
                applyNow: "अभी आवेदन करें",
                viewAllSchemes: "सभी योजनाएं देखें",
                learnMore: "और जानें",
                checkStatus: "स्थिति जांचें",
                loading: "लोड हो रहा है...",

                // Common
                benefit: "लाभ",
                frequency: "आवृत्ति",
                area: "क्षेत्र",
                status: "स्थिति",
                active: "सक्रिय",
                eligibility: "पात्रता",
                documents: "आवश्यक दस्तावेज",
                lastUpdate: "अंतिम अपडेट"
            },
            marathi: {
                // Header & Navigation
                portalName: "सरकारी योजना पोर्टल",
                navHome: "होम", 
                navSchemes: "योजना",
                navUpdates: "नवीनतम अपडेट्स",
                navCategories: "श्रेणी",
                navContact: "संपर्क",
                searchPlaceholder: "योजना शोधा...",

                // Hero Section
                heroTitle: "संपूर्ण सरकारी योजना माहिती पोर्टल",
                heroSubtitle: "सर्व प्रमुख भारतीय सरकारी योजनांच्या हप्त्याच्या तारखा, पात्रता निकष, अर्ज प्रक्रिया आणि फायद्यांबद्दल हिंदी, इंग्रजी आणि मराठीमध्ये नवीनतम अपडेट्स मिळवा",
                browseSchemes: "सर्व योजना पहा",
                latestUpdates: "नवीनतम अपडेट्स",

                // Stats
                statSchemes: "प्रमुख योजना",
                statBeneficiaries: "कोटी लाभार्थी", 
                statLanguages: "भाषा",

                // Breaking News
                breakingNews: "ब्रेकिंग न्यूज",
                loadingUpdates: "नवीनतम अपडेट्स लोड होत आहेत...",

                // Sections
                featuredSchemes: "प्रमुख सरकारी योजना",
                featuredSchemesDesc: "सर्वात लोकप्रिय आणि फायदेशीर सरकारी योजनांचा शोध घ्या",
                latestUpdatesTitle: "नवीनतम अपडेट्स आणि बातम्या",
                latestUpdatesDesc: "नवीनतम योजना अपडेट्स आणि घोषणांसह अपडेट राहा",
                browseByCategory: "श्रेणीनुसार ब्राउझ करा",
                browseByCategoryDesc: "विविध श्रेणींमध्ये आयोजित योजना शोधा",

                // Categories
                allCategories: "सर्व श्रेणी",
                womenWelfare: "महिला कल्याण",
                housing: "गृहनिर्माण", 
                health: "आरोग्य",
                agriculture: "शेती",

                // How It Works  
                howItWorksTitle: "सरकारी योजनांसाठी अर्ज कसा करावा",
                howItWorksDesc: "कोणत्याही सरकारी योजनेसाठी अर्ज करण्याची साधी 4-चरण प्रक्रिया",
                step1Title: "तुमची योजना शोधा",
                step1Desc: "तुमच्या प्रोफाइलशी जुळणाऱ्या योजना ब्राउझ आणि शोधा",
                step2Title: "पात्रता तपासा",
                step2Desc: "तुम्ही सर्व पात्रता निकष पूर्ण करता का ते सत्यापित करा",
                step3Title: "कागदपत्रे तयार करा",
                step3Desc: "योजनेनुसार सर्व आवश्यक कागदपत्रे गोळा करा",
                step4Title: "अर्ज सबमिट करा", 
                step4Desc: "अधिकृत चॅनेलद्वारे ऑनलाइन किंवा ऑफलाइन अर्ज करा",

                // Newsletter
                newsletterTitle: "कोणतेही अपडेट चुकवू नका",
                newsletterDesc: "योजना अपडेट्स, नवीन लॉन्च आणि अर्जाच्या अंतिम तारखेबद्दल तत्काळ सूचना मिळविण्यासाठी सबस्क्राइब करा",
                emailPlaceholder: "तुमचा ईमेल पत्ता टाका",
                subscribe: "सबस्क्राइब करा",
                privacyNote: "आम्ही तुमच्या गोपनीयतेचा आदर करतो। कधीही अनसबस्क्राइब करा।",

                // Footer
                footerDesc: "भारतीय सरकारी योजना आणि फायद्यांबद्दल संपूर्ण माहितीसाठी तुमचा विश्वसनीय स्रोत।",
                popularSchemes: "लोकप्रिय योजना",
                quickLinks: "द्रुत लिंक्स",
                contactUs: "संपर्क करा",
                aboutUs: "आमच्याबद्दल",
                privacyPolicy: "गोपनीयता धोरण", 
                termsConditions: "अटी आणि शर्ती",
                disclaimer: "अस्वीकरण",
                copyright: "© 2024 सरकारी योजना पोर्टल. सर्व हक्क राखीव.",

                // Buttons & Actions
                applyNow: "आता अर्ज करा",
                viewAllSchemes: "सर्व योजना पहा",
                learnMore: "अधिक जाणा",
                checkStatus: "स्थिती तपासा",
                loading: "लोड होत आहे...",

                // Common
                benefit: "फायदा",
                frequency: "वारंवारता",
                area: "क्षेत्र", 
                status: "स्थिती",
                active: "सक्रिय",
                eligibility: "पात्रता",
                documents: "आवश्यक कागदपत्रे",
                lastUpdate: "शेवटचे अपडेट"
            }
        };
    }

    setupEventListeners() {
        // Language switcher
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }

        // Category filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterSchemes(e.target.dataset.category);
                this.updateActiveFilter(e.target);
            });
        });
    }

    initializeLanguage() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
        }

        this.translatePage();
    }

    switchLanguage(newLanguage) {
        this.currentLanguage = newLanguage;
        localStorage.setItem('preferred_language', newLanguage);

        this.translatePage();
        this.renderSchemes(); // Re-render schemes with new language
        this.renderUpdates(); // Re-render updates with new language
        this.renderCategories(); // Re-render categories with new language
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLanguage]?.[key];

            if (translation) {
                if (element.tagName === 'INPUT' && element.type !== 'submit') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage === 'hindi' ? 'hi' : 
                                        this.currentLanguage === 'marathi' ? 'mr' : 'en';
    }

    renderComponents() {
        this.renderSchemes();
        this.renderUpdates();
        this.renderCategories();
        this.updateTicker();
    }

    renderSchemes(category = 'all') {
        const schemesGrid = document.getElementById('schemesGrid');
        if (!schemesGrid) return;

        let filteredSchemes = this.schemes;
        if (category !== 'all') {
            filteredSchemes = this.schemes.filter(scheme => scheme.category === category);
        }

        schemesGrid.innerHTML = filteredSchemes.map(scheme => this.createSchemeCard(scheme)).join('');
    }

    createSchemeCard(scheme) {
        const name = scheme.name[this.currentLanguage] || scheme.name.english;
        const description = scheme.description[this.currentLanguage] || scheme.description.english;
        const categoryName = scheme.category.replace('-', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return `
            <div class="scheme-card" data-category="${scheme.category}">
                <div class="scheme-header">
                    <span class="scheme-badge" style="background-color: ${scheme.color};">${categoryName}</span>
                    <span class="scheme-amount">${scheme.amount}</span>
                </div>
                <h3 class="scheme-title">${name}</h3>
                <p class="scheme-description">${description}</p>
                <div class="scheme-meta">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${scheme.frequency}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${scheme.state}</span>
                    </div>
                </div>
                <div class="scheme-actions">
                    <a href="schemes/${scheme.id}.html" class="btn btn--primary">
                        <span data-translate="learnMore">Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="${scheme.applicationUrl}" target="_blank" class="btn btn--outline">
                        <span data-translate="applyNow">Apply Now</span>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
    }

    renderUpdates() {
        const updatesGrid = document.getElementById('updatesGrid');
        if (!updatesGrid) return;

        updatesGrid.innerHTML = this.updates.map(update => this.createUpdateCard(update)).join('');
    }

    createUpdateCard(update) {
        const title = update.title[this.currentLanguage] || update.title.english;
        const date = new Date(update.date).toLocaleDateString(
            this.currentLanguage === 'hindi' ? 'hi-IN' : 
            this.currentLanguage === 'marathi' ? 'mr-IN' : 'en-IN'
        );

        return `
            <div class="update-card">
                <div class="update-date">
                    <i class="fas fa-calendar"></i>
                    <span>${date}</span>
                </div>
                <h3 class="update-title">${title}</h3>
            </div>
        `;
    }

    renderCategories() {
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (!categoriesGrid) return;

        const categoryIcons = {
            'women-welfare': 'fas fa-female',
            'housing': 'fas fa-home', 
            'health': 'fas fa-heartbeat',
            'agriculture': 'fas fa-seedling',
            'welfare': 'fas fa-hands-helping',
            'financial-inclusion': 'fas fa-university',
            'technology': 'fas fa-laptop'
        };

        categoriesGrid.innerHTML = this.categories.map(category => {
            const name = category.name[this.currentLanguage] || category.name.english;
            const count = this.schemes.filter(scheme => scheme.category === category.id).length;
            const icon = categoryIcons[category.id] || 'fas fa-folder';

            return `
                <div class="category-card" data-category="${category.id}">
                    <div class="category-icon">
                        <i class="${icon}"></i>
                    </div>
                    <h3 class="category-name">${name}</h3>
                    <p class="category-count">${count} schemes</p>
                </div>
            `;
        }).join('');

        // Add click handlers to category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterSchemes(category);
                this.scrollToSection('schemes');
            });
        });
    }

    updateTicker() {
        const tickerContent = document.getElementById('tickerContent');
        if (!tickerContent || this.updates.length === 0) return;

        const latestUpdate = this.updates[0];
        const title = latestUpdate.title[this.currentLanguage] || latestUpdate.title.english;
        tickerContent.innerHTML = `<span>${title}</span>`;
    }

    filterSchemes(category) {
        this.renderSchemes(category);
        this.translatePage(); // Re-translate after rendering
    }

    updateActiveFilter(activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchSchemes(e.target.value);
            }, 300);
        });
    }

    searchSchemes(query) {
        if (!query.trim()) {
            this.renderSchemes();
            return;
        }

        const filteredSchemes = this.schemes.filter(scheme => {
            const searchText = query.toLowerCase();
            return (
                scheme.name.english.toLowerCase().includes(searchText) ||
                scheme.name.hindi.includes(searchText) ||
                scheme.name.marathi.includes(searchText) ||
                scheme.description.english.toLowerCase().includes(searchText) ||
                scheme.category.toLowerCase().includes(searchText)
            );
        });

        const schemesGrid = document.getElementById('schemesGrid');
        if (schemesGrid) {
            schemesGrid.innerHTML = filteredSchemes.map(scheme => this.createSchemeCard(scheme)).join('');
            this.translatePage();
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    setupFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value;

        if (this.validateEmail(email)) {
            // Simulate newsletter subscription
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            emailInput.value = '';
        } else {
            this.showNotification('Please enter a valid email address.', 'error');
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);

        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }
}

// Additional utility functions
class Utils {
    static formatDate(dateString, language = 'english') {
        const date = new Date(dateString);
        const locale = language === 'hindi' ? 'hi-IN' : 
                      language === 'marathi' ? 'mr-IN' : 'en-IN';

        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        });
    }

    static formatCurrency(amount, language = 'english') {
        const locale = language === 'hindi' ? 'hi-IN' : 
                      language === 'marathi' ? 'mr-IN' : 'en-IN';

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    static debounce(func, wait) {
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

    static animateCounter(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Initialize portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portal = new GovernmentSchemesPortal();

    // Add notification styles dynamically
    const notificationStyles = `
        <style>
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 10000;
                transform: translateX(400px);
                animation: slideIn 0.3s ease-out forwards;
                min-width: 300px;
                border-left: 4px solid;
            }

            .notification--success {
                border-left-color: #059669;
                color: #059669;
            }

            .notification--error {
                border-left-color: #dc2626;
                color: #dc2626;
            }

            .notification--info {
                border-left-color: #0284c7;
                color: #0284c7;
            }

            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                color: #6b7280;
                margin-left: auto;
            }

            .notification-close:hover {
                background: #f3f4f6;
            }

            @keyframes slideIn {
                to { transform: translateX(0); }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', notificationStyles);
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GovernmentSchemesPortal, Utils };
}