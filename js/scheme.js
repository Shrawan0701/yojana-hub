// Scheme Detail Page JavaScript
class SchemeDetailPage {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferred_language') || 'english';
        this.schemeId = this.getSchemeIdFromURL();
        this.schemeData = null;

        this.init();
    }

    getSchemeIdFromURL() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '');
    }

    async init() {
        try {
            await this.loadSchemeData();
            this.setupEventListeners();
            this.initializeLanguage();
            this.setupFAQAccordion();
        } catch (error) {
            console.error('Failed to initialize scheme page:', error);
        }
    }

    async loadSchemeData() {
        try {
            const response = await fetch('../data/schemes.json');
            if (!response.ok) throw new Error('Failed to fetch scheme data');

            const data = await response.json();
            this.schemeData = data.schemes.find(scheme => scheme.id === this.schemeId);

            if (this.schemeData) {
                this.updatePageContent();
            }
        } catch (error) {
            console.error('Error loading scheme data:', error);
        }
    }

    setupEventListeners() {
        // Language switcher
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }

        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.transform = 'translateY(0)';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.transform = 'translateY(20px)';
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
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
        this.updatePageContent();
    }

    translatePage() {
        const translations = {
            english: {
                // Navigation
                home: "Home",
                schemes: "Schemes",
                currentScheme: "Current Scheme",

                // Scheme Details
                overview: "Overview",
                eligibility: "Eligibility Criteria",
                documentsRequired: "Documents Required",
                applicationProcess: "Application Process",

                // Actions
                applyOnline: "Apply Online",
                downloadInfo: "Download Info",
                applyNow: "Apply Now",
                checkStatus: "Check Status",

                // Process Steps
                step1: "Visit Official Website",
                step1Details: "Go to the official scheme website and look for the application link.",
                step2: "Register/Login",
                step2Details: "Create a new account or login with existing credentials.",
                step3: "Fill Application Form",
                step3Details: "Complete the application form with accurate information.",
                step4: "Upload Documents",
                step4Details: "Upload all required documents in the specified format.",
                step5: "Submit & Track",
                step5Details: "Submit your application and track its status regularly.",

                // Sidebar
                quickInfo: "Quick Information",
                lastUpdate: "Last Updated",
                officialWebsite: "Official Website",
                category: "Category",
                targetGroup: "Target Group",
                targetGroupValue: "General Public",
                relatedSchemes: "Related Schemes",
                helpSupport: "Help & Support",
                helpline: "Helpline",
                liveChat: "Live Chat",
                faq: "FAQ",

                // Meta Information
                benefit: "Benefit",
                frequency: "Frequency",
                area: "Area",
                status: "Status",
                active: "Active",

                // FAQ
                faqTitle: "Frequently Asked Questions",
                faq1Question: "How do I check if I'm eligible for this scheme?",
                faq1Answer: "You can check your eligibility by reviewing the criteria mentioned above and using our eligibility checker tool.",
                faq2Question: "How long does the application process take?",
                faq2Answer: "The application process typically takes 15-30 days from the date of submission, depending on document verification.",
                faq3Question: "Can I apply offline for this scheme?",
                faq3Answer: "While online application is preferred, offline applications may be accepted at designated government offices.",

                // Tips and Highlights
                keyHighlights: "Key Highlights",
                highlight1: "Direct bank transfer of benefits",
                highlight2: "Online application process",
                highlight3: "Transparent selection process",
                highlight4: "Regular status updates",

                checkEligibility: "Check Your Eligibility",
                eligibilityNote: "Use our quick eligibility checker to see if you qualify for this scheme.",
                startCheck: "Start Eligibility Check",

                documentTips: "Document Preparation Tips",
                tip1: "Keep all documents in PDF format (max 2MB each)",
                tip2: "Ensure all documents are clearly visible and readable",
                tip3: "Self-attested photocopies are acceptable",
                tip4: "Keep original documents ready for verification",

                // Footer
                disclaimerText: "This is an unofficial information portal. Please verify all details from official government sources before applying.",
                copyright: "© 2024 Sarkari Yojana Portal. All rights reserved."
            },
            hindi: {
                // Navigation
                home: "होम",
                schemes: "योजनाएं",
                currentScheme: "वर्तमान योजना",

                // Scheme Details
                overview: "अवलोकन",
                eligibility: "पात्रता मापदंड",
                documentsRequired: "आवश्यक दस्तावेज",
                applicationProcess: "आवेदन प्रक्रिया",

                // Actions
                applyOnline: "ऑनलाइन आवेदन करें",
                downloadInfo: "जानकारी डाउनलोड करें",
                applyNow: "अभी आवेदन करें",
                checkStatus: "स्थिति जांचें",

                // Process Steps
                step1: "आधिकारिक वेबसाइट पर जाएं",
                step1Details: "आधिकारिक योजना वेबसाइट पर जाएं और आवेदन लिंक खोजें।",
                step2: "पंजीकरण/लॉगिन करें",
                step2Details: "नया खाता बनाएं या मौजूदा साख से लॉगिन करें।",
                step3: "आवेदन फॉर्म भरें",
                step3Details: "सटीक जानकारी के साथ आवेदन फॉर्म पूरा करें।",
                step4: "दस्तावेज अपलोड करें",
                step4Details: "निर्दिष्ट प्रारूप में सभी आवश्यक दस्तावेज अपलोड करें।",
                step5: "जमा करें और ट्रैक करें",
                step5Details: "अपना आवेदन जमा करें और नियमित रूप से इसकी स्थिति को ट्रैक करें।",

                // Sidebar
                quickInfo: "त्वरित जानकारी",
                lastUpdate: "अंतिम अपडेट",
                officialWebsite: "आधिकारिक वेबसाइट",
                category: "श्रेणी",
                targetGroup: "लक्षित समूह",
                targetGroupValue: "आम जनता",
                relatedSchemes: "संबंधित योजनाएं",
                helpSupport: "सहायता और समर्थन",
                helpline: "हेल्पलाइन",
                liveChat: "लाइव चैट",
                faq: "सामान्य प्रश्न",

                // Meta Information
                benefit: "लाभ",
                frequency: "आवृत्ति",
                area: "क्षेत्र",
                status: "स्थिति",
                active: "सक्रिय",

                // FAQ
                faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
                faq1Question: "मैं कैसे जांच सकूं कि मैं इस योजना के लिए पात्र हूं?",
                faq1Answer: "आप ऊपर उल्लिखित मापदंडों की समीक्षा करके और हमारे पात्रता जांचकर्ता उपकरण का उपयोग करके अपनी पात्रता की जांच कर सकते हैं।",
                faq2Question: "आवेदन प्रक्रिया में कितना समय लगता है?",
                faq2Answer: "आवेदन प्रक्रिया में आमतौर पर जमा करने की तारीख से 15-30 दिन लगते हैं, जो दस्तावेज सत्यापन पर निर्भर करता है।",
                faq3Question: "क्या मैं इस योजना के लिए ऑफलाइन आवेदन कर सकता हूं?",
                faq3Answer: "जबकि ऑनलाइन आवेदन को प्राथमिकता दी जाती है, नामित सरकारी कार्यालयों में ऑफलाइन आवेदन स्वीकार किए जा सकते हैं।",

                // Tips and Highlights
                keyHighlights: "मुख्य विशेषताएं",
                highlight1: "लाभों का सीधा बैंक स्थानांतरण",
                highlight2: "ऑनलाइन आवेदन प्रक्रिया",
                highlight3: "पारदर्शी चयन प्रक्रिया",
                highlight4: "नियमित स्थिति अपडेट",

                checkEligibility: "अपनी पात्रता जांचें",
                eligibilityNote: "यह देखने के लिए हमारे त्वरित पात्रता जांचकर्ता का उपयोग करें कि क्या आप इस योजना के लिए योग्य हैं।",
                startCheck: "पात्रता जांच शुरू करें",

                documentTips: "दस्तावेज तैयारी के सुझाव",
                tip1: "सभी दस्तावेजों को PDF प्रारूप में रखें (प्रत्येक अधिकतम 2MB)",
                tip2: "सुनिश्चित करें कि सभी दस्तावेज स्पष्ट रूप से दिखाई दे रहे हैं और पढ़ने योग्य हैं",
                tip3: "स्व-सत्यापित फोटोकॉपी स्वीकार्य हैं",
                tip4: "सत्यापन के लिए मूल दस्तावेज तैयार रखें",

                // Footer
                disclaimerText: "यह एक अनधिकृत सूचना पोर्टल है। कृपया आवेदन करने से पहले आधिकारिक सरकारी स्रोतों से सभी विवरण सत्यापित करें।",
                copyright: "© 2024 सरकारी योजना पोर्टल। सभी अधिकार सुरक्षित।"
            },
            marathi: {
                // Navigation
                home: "होम",
                schemes: "योजना",
                currentScheme: "सद्य योजना",

                // Scheme Details
                overview: "अवलोकन",
                eligibility: "पात्रता निकष",
                documentsRequired: "आवश्यक कागदपत्रे",
                applicationProcess: "अर्ज प्रक्रिया",

                // Actions
                applyOnline: "ऑनलाइन अर्ज करा",
                downloadInfo: "माहिती डाउनलोड करा",
                applyNow: "आता अर्ज करा",
                checkStatus: "स्थिती तपासा",

                // Process Steps
                step1: "अधिकृत वेबसाइटला भेट द्या",
                step1Details: "अधिकृत योजना वेबसाइटवर जा आणि अर्ज लिंक शोधा।",
                step2: "नोंदणी/लॉगिन करा",
                step2Details: "नवे खाते तयार करा किंवा विद्यमान साख सह लॉगिन करा।",
                step3: "अर्ज फॉर्म भरा",
                step3Details: "अचूक माहितीसह अर्ज फॉर्म पूर्ण करा।",
                step4: "कागदपत्रे अपलोड करा",
                step4Details: "निर्दिष्ट स्वरूपात सर्व आवश्यक कागदपत्रे अपलोड करा।",
                step5: "सबमिट करा आणि ट्रॅक करा",
                step5Details: "तुमचा अर्ज सबमिट करा आणि नियमितपणे त्याची स्थिती ट्रॅक करा।",

                // Sidebar
                quickInfo: "जलद माहिती",
                lastUpdate: "शेवटचे अपडेट",
                officialWebsite: "अधिकृत वेबसाइट",
                category: "श्रेणी",
                targetGroup: "लक्ष्यित गट",
                targetGroupValue: "सामान्य जनता",
                relatedSchemes: "संबंधित योजना",
                helpSupport: "मदत आणि समर्थन",
                helpline: "हेल्पलाइन",
                liveChat: "लाइव्ह चॅट",
                faq: "सामान्य प्रश्न",

                // Meta Information
                benefit: "फायदा",
                frequency: "वारंवारता",
                area: "क्षेत्र",
                status: "स्थिती",
                active: "सक्रिय",

                // FAQ
                faqTitle: "वारंवार विचारले जाणारे प्रश्न",
                faq1Question: "मी या योजनेसाठी पात्र आहे का हे कसे तपासू?",
                faq1Answer: "तुम्ही वर नमूद केलेल्या निकषांचे पुनरावलोकन करून आणि आमच्या पात्रता तपासणी साधनाचा वापर करून तुमची पात्रता तपासू शकता।",
                faq2Question: "अर्ज प्रक्रियेला किती वेळ लागतो?",
                faq2Answer: "अर्ज प्रक्रियेला सामान्यतः सादर करण्याच्या तारखेपासून 15-30 दिवस लागतात, जे कागदपत्र पडताळणीवर अवलंबून असते।",
                faq3Question: "मी या योजनेसाठी ऑफलाइन अर्ज करू शकतो का?",
                faq3Answer: "ऑनलाइन अर्जाला प्राधान्य दिले जात असताना, नियुक्त सरकारी कार्यालयांमध्ये ऑफलाइन अर्ज स्वीकारले जाऊ शकतात।",

                // Tips and Highlights
                keyHighlights: "मुख्य वैशिष्ट्ये",
                highlight1: "फायद्यांचे थेट बँक हस्तांतरण",
                highlight2: "ऑनलाइन अर्ज प्रक्रिया",
                highlight3: "पारदर्शक निवड प्रक्रिया",
                highlight4: "नियमित स्थिती अपडेट्स",

                checkEligibility: "तुमची पात्रता तपासा",
                eligibilityNote: "तुम्ही या योजनेसाठी पात्र आहात का हे पाहण्यासाठी आमच्या जलद पात्रता तपासणी साधनाचा वापर करा।",
                startCheck: "पात्रता तपासणी सुरू करा",

                documentTips: "कागदपत्र तयारीच्या टिपा",
                tip1: "सर्व कागदपत्रे PDF स्वरूपात ठेवा (प्रत्येकी जास्तीत जास्त 2MB)",
                tip2: "सर्व कागदपत्रे स्पष्टपणे दिसत आहेत आणि वाचण्यायोग्य आहेत याची खात्री करा",
                tip3: "स्व-प्रमाणित फोटोकॉपी मान्य आहेत",
                tip4: "पडताळणीसाठी मूळ कागदपत्रे तयार ठेवा",

                // Footer
                disclaimerText: "हे एक अनधिकृत माहिती पोर्टल आहे. कृपया अर्ज करण्यापूर्वी अधिकृत सरकारी स्रोतांकडून सर्व तपशील सत्यापित करा.",
                copyright: "© 2024 सरकारी योजना पोर्टल. सर्व हक्क राखीव."
            }
        };

        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[this.currentLanguage]?.[key];

            if (translation) {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage === 'hindi' ? 'hi' : 
                                        this.currentLanguage === 'marathi' ? 'mr' : 'en';
    }

    updatePageContent() {
        if (!this.schemeData) return;

        // Update dynamic content based on current language
        const titleElement = document.querySelector('.scheme-title');
        const descriptionElement = document.querySelector('.scheme-description');
        const overviewContent = document.querySelector('[data-translate="overviewContent"]');

        if (titleElement) {
            titleElement.textContent = this.schemeData.name[this.currentLanguage] || this.schemeData.name.english;
        }

        if (descriptionElement) {
            descriptionElement.textContent = this.schemeData.description[this.currentLanguage] || this.schemeData.description.english;
        }

        if (overviewContent) {
            overviewContent.textContent = this.schemeData.description[this.currentLanguage] || this.schemeData.description.english;
        }

        // Update page title
        const pageTitle = this.schemeData.name[this.currentLanguage] || this.schemeData.name.english;
        document.title = `${pageTitle} - Complete Information & Application Process`;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const description = this.schemeData.description[this.currentLanguage] || this.schemeData.description.english;
            metaDescription.content = `Complete information about ${pageTitle} - ${description}`;
        }
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
}

// Utility functions for scheme pages
class SchemeUtils {
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

    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Link copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    static shareScheme(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            });
        } else {
            this.copyToClipboard(url);
        }
    }
}

// Initialize scheme detail page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.schemeDetailPage = new SchemeDetailPage();
});