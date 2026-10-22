
/* =========================================================
   SPM LORRY WORKSHOP & TRANSPORT
   Navigation, Workshop Services, Theme, Language & WhatsApp
   File: script.js
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     01. MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("is-open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }


  /* =======================================================
     02. WORKSHOP SERVICES — SHOW / HIDE
     ======================================================= */

  const workshopTrigger = document.querySelector(".workshop-trigger");
  const serviceList = document.getElementById("workshopServices");
  const openLabel = document.getElementById("workshopOpenLabel");

  if (workshopTrigger && serviceList) {
    workshopTrigger.addEventListener("click", () => {
      const opening = serviceList.hidden;

      serviceList.hidden = !opening;

      workshopTrigger.setAttribute(
        "aria-expanded",
        String(opening)
      );

      if (openLabel) {
        openLabel.textContent = opening
          ? "Hide workshop services ↑"
          : "View all 30 services ↗";
      }
    });
  }


  /* =======================================================
     03. AUTOMATIC FOOTER YEAR
     ======================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     04. DARK / LIGHT THEME SWITCHER
     ======================================================= */

  const themeToggle = document.getElementById("themeToggle");

  const setTheme = (dark) => {
    document.body.classList.toggle("dark-theme", dark);

    if (themeToggle) {
      themeToggle.textContent = dark
        ? "☀️ Light mode"
        : "🌙 Dark mode";

      themeToggle.setAttribute("aria-pressed", String(dark));
    }

    try {
      localStorage.setItem(
        "spm-theme",
        dark ? "dark" : "light"
      );
    } catch (error) {
      // Theme switching still works if storage is unavailable.
    }
  };

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("spm-theme") || "dark";
  } catch (error) {
    // Use dark mode when saved preferences cannot be accessed.
  }

  setTheme(savedTheme === "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");

      setTheme(!isDark);
    });
  }


  /* =======================================================
     05. LANGUAGE SWITCHER & CONTACT FORM REFERENCES
     ======================================================= */

  const languageSelect = document.getElementById("languageSelect");
  const contactCopy = document.getElementById("contactCopy");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  const languageLabel = document.querySelector(
    'label[for="languageSelect"]'
  );


  /* =======================================================
     06. ENGLISH & TAMIL TRANSLATIONS
     ======================================================= */

  const translations = {
    en: {
      language: "Language",

      eyebrow: "GET IN TOUCH",
      title: "Let's discuss",
      title2: "your requirements.",

      intro:
        "Contact SPM for workshop enquiries, lorry breakdown assistance or goods transport requirements.",

      phone: "PHONE",
      address: "WORKSHOP ADDRESS",
      directions: "Get Directions",

      formTitle: "Send a Service Enquiry",
      formIntro: "Complete the form to prepare your enquiry.",

      name: "Full Name *",
      namePlaceholder: "Enter your name",

      email: "Email Address",
      emailPlaceholder: "you@example.com",

      phoneLabel: "Phone Number *",
      phonePlaceholder: "Enter your phone number",

      type: "Enquiry Type *",
      choose: "Choose a service",

      details: "Vehicle / Transport Details *",
      detailsPlaceholder:
        "For transport: pickup location, destination and load details. For workshop/breakdown: vehicle details and current location...",

      submit: "Prepare Enquiry",

      disclaimer:
        "This form opens WhatsApp with your enquiry. Review the message and press Send in WhatsApp.",

      status:
        "WhatsApp opened with your enquiry. Review the message and press Send.",

      options: [
        "Workshop Support",
        "Heavy Vehicle Repair",
        "Engine Repair / Overhauling",
        "Gearbox / Clutch Repair",
        "Brake / Suspension Repair",
        "Electrical / Battery Service",
        "Tyre Service",
        "Periodic Servicing",
        "Breakdown Assistance",
        "On-Site Lorry Repair",
        "Lorry Load Transport",
        "Other"
      ]
    },

    ta: {
      language: "மொழி",

      eyebrow: "தொடர்புகொள்ளுங்கள்",
      title: "உங்கள் தேவைகள் பற்றி",
      title2: "கலந்துரையாடுவோம்.",

      intro:
        "பட்டறை சேவை, லாரி பழுது மற்றும் சரக்கு போக்குவரத்து தொடர்பான விசாரணைகளுக்கு SPM-ஐ தொடர்புகொள்ளுங்கள்.",

      phone: "தொலைபேசி",
      address: "பட்டறை முகவரி",
      directions: "வழியைப் பார்க்க",

      formTitle: "சேவை விசாரணை",
      formIntro:
        "உங்கள் விசாரணையைத் தயாரிக்க இந்தப் படிவத்தை நிரப்புங்கள்.",

      name: "முழுப் பெயர் *",
      namePlaceholder: "உங்கள் பெயரை உள்ளிடவும்",

      email: "மின்னஞ்சல் முகவரி",
      emailPlaceholder: "உங்கள் மின்னஞ்சல் முகவரி",

      phoneLabel: "தொலைபேசி எண் *",
      phonePlaceholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",

      type: "விசாரணை வகை *",
      choose: "சேவையைத் தேர்ந்தெடுக்கவும்",

      details: "வாகனம் / போக்குவரத்து விவரங்கள் *",
      detailsPlaceholder:
        "போக்குவரத்துக்கு: சரக்கு ஏற்றும் இடம், சேரும் இடம் மற்றும் சரக்கு விவரங்களை உள்ளிடவும். பழுதுபார்ப்புக்கு: வாகன விவரங்கள் மற்றும் தற்போதைய இடத்தை உள்ளிடவும்.",

      submit: "WhatsApp மூலம் விசாரிக்கவும்",

      disclaimer:
        "இந்தப் படிவம் உங்கள் விசாரணையுடன் WhatsApp-ஐ திறக்கும். செய்தியைச் சரிபார்த்து WhatsApp-இல் அனுப்பு என்பதை அழுத்தவும்.",

      status:
        "உங்கள் விசாரணையுடன் WhatsApp திறக்கப்பட்டது. செய்தியைச் சரிபார்த்து அனுப்பவும்.",

      options: [
        "பட்டறை சேவை",
        "கனரக வாகன பழுது",
        "எஞ்சின் பழுது / முழுப் பழுது நீக்கம்",
        "கியர்பாக்ஸ் / கிளட்ச் பழுது",
        "பிரேக் / சஸ்பென்ஷன் பழுது",
        "மின்சாரம் / பேட்டரி சேவை",
        "டயர் சேவை",
        "காலமுறை சர்வீஸ்",
        "வழியிலான பழுது உதவி",
        "இடத்திலேயே லாரி பழுது நீக்கம்",
        "லாரி சரக்கு போக்குவரத்து",
        "மற்றவை"
      ]
    }
  };


  /* =======================================================
     07. SAVE ORIGINAL SERVICE VALUES
     ======================================================= */

  const serviceSelect = form
    ? form.querySelector('[name="service"]')
    : null;

  const englishServiceValues = serviceSelect
    ? Array.from(serviceSelect.options).map((option) => option.value)
    : [];


  /* =======================================================
     08. APPLY SELECTED LANGUAGE
     ======================================================= */

  function setLanguage(language) {
    const lang = language === "ta" ? "ta" : "en";
    const translation = translations[lang];

    // Language selector label
    if (languageLabel) {
      languageLabel.textContent = translation.language;
    }

    // Contact section text
    if (contactCopy) {
      const eyebrow = contactCopy.querySelector(".eyebrow");

      if (eyebrow) {
        const textNode = Array.from(eyebrow.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE
        );

        if (textNode) {
          textNode.nodeValue = ` ${translation.eyebrow} `;
        }
      }

      const heading = contactCopy.querySelector("h2");

      if (heading) {
        heading.replaceChildren();

        heading.append(
          document.createTextNode(translation.title)
        );

        heading.append(document.createElement("br"));

        const emphasizedText = document.createElement("em");
        emphasizedText.textContent = translation.title2;

        heading.append(emphasizedText);
      }

      const intro = contactCopy.querySelector(":scope > p");

      if (intro) {
        intro.textContent = translation.intro;
      }

      const smallLabels = contactCopy.querySelectorAll(
        ".contact-detail small"
      );

      if (smallLabels[0]) {
        smallLabels[0].textContent = translation.phone;
      }

      if (smallLabels[1]) {
        smallLabels[1].textContent = translation.address;
      }

      const directionsButton = contactCopy.querySelector(".btn-light");

      if (directionsButton) {
        directionsButton.replaceChildren();

        directionsButton.append(
          document.createTextNode(translation.directions + " ")
        );

        const arrow = document.createElement("span");
        arrow.textContent = "↗";

        directionsButton.append(arrow);
      }
    }

    // Contact form headings
    if (form) {
      const heading = form.querySelector(".form-heading h3");
      const intro = form.querySelector(".form-heading p");

      if (heading) {
        heading.textContent = translation.formTitle;
      }

      if (intro) {
        intro.textContent = translation.formIntro;
      }

      // Translate labels while preserving their form controls.
      const labelTexts = [
        translation.name,
        translation.email,
        translation.phoneLabel,
        translation.type,
        translation.details
      ];

      const labels = Array.from(
        form.querySelectorAll("label")
      ).filter((label) =>
        label.querySelector("input, select, textarea")
      );

      labels.forEach((label, index) => {
        if (!labelTexts[index]) return;

        const firstText = Array.from(label.childNodes).find(
          (node) =>
            node.nodeType === Node.TEXT_NODE &&
            node.nodeValue.trim()
        );

        if (firstText) {
          firstText.nodeValue = ` ${labelTexts[index]} `;
        }
      });

      // Translate placeholders
      const nameInput = form.elements.namedItem("name");
      const emailInput = form.elements.namedItem("email");
      const phoneInput = form.elements.namedItem("phone");
      const detailsInput = form.elements.namedItem("message");

      if (nameInput) {
        nameInput.placeholder = translation.namePlaceholder;
      }

      if (emailInput) {
        emailInput.placeholder = translation.emailPlaceholder;
      }

      if (phoneInput) {
        phoneInput.placeholder = translation.phonePlaceholder;
      }

      if (detailsInput) {
        detailsInput.placeholder = translation.detailsPlaceholder;
      }

      // Translate service dropdown options
      const service = form.elements.namedItem("service");

      if (service && service.options) {
        Array.from(service.options).forEach((option, index) => {
          option.textContent =
            index === 0
              ? translation.choose
              : translation.options[index - 1] || option.value;
        });
      }

      // Translate submit button
      const submitButton = form.querySelector(".submit-btn");

      if (submitButton) {
        submitButton.replaceChildren();

        submitButton.append(
          document.createTextNode(translation.submit + " ")
        );

        const arrow = document.createElement("span");
        arrow.textContent = "↗";

        submitButton.append(arrow);
      }

      // Translate disclaimer
      const disclaimer = form.querySelector(".form-disclaimer");

      if (disclaimer) {
        disclaimer.textContent = translation.disclaimer;
      }
    }

    // Update document language and selector
    document.documentElement.lang = lang;

    if (languageSelect) {
      languageSelect.value = lang;
    }
  }


  /* =======================================================
     09. LANGUAGE SELECTOR EVENT
     ======================================================= */

  if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });

    setLanguage(languageSelect.value || "en");
  }


  /* =======================================================
     10. WHATSAPP ENQUIRY FORM
     ======================================================= */

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Validate required form fields.
      if (!form.reportValidity()) {
        return;
      }

      const data = new FormData(form);

      const lang =
        languageSelect && languageSelect.value === "ta"
          ? "ta"
          : "en";

      const serviceValue = data.get("service") || "";

      const serviceIndex = englishServiceValues.indexOf(
        serviceValue
      );

      const serviceName =
        lang === "ta" && serviceIndex > 0
          ? translations.ta.options[serviceIndex - 1] || serviceValue
          : serviceValue;

      let message;

      // Tamil WhatsApp message
      if (lang === "ta") {
        message = [
          "வணக்கம் SPM லாரி பட்டறை மற்றும் போக்குவரத்து நிறுவனத்தினரே,",
          "",
          "எனக்கு ஒரு சேவை தொடர்பான விசாரணை உள்ளது.",
          "பெயர்: " + (data.get("name") || ""),
          "தொலைபேசி: " + (data.get("phone") || ""),
          "மின்னஞ்சல்: " + (data.get("email") || "வழங்கப்படவில்லை"),
          "சேவை: " + serviceName,
          "விவரங்கள்: " + (data.get("message") || "")
        ].join("\n");
      } else {
        // English WhatsApp message
        message = [
          "Hello SPM Lorry Workshop & Transport,",
          "",
          "I would like to make an enquiry.",
          "Name: " + (data.get("name") || ""),
          "Phone: " + (data.get("phone") || ""),
          "Email: " + (data.get("email") || "Not provided"),
          "Service: " + serviceValue,
          "Details: " + (data.get("message") || "")
        ].join("\n");
      }

      // Display the correct status message.
      if (formStatus) {
        formStatus.textContent = translations[lang].status;
      }

      // Open WhatsApp with the prepared enquiry.
      const whatsappNumber = "919443896946";

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

})();
