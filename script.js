// SPM Lorry Workshop & Transport — navigation, workshop list, theme and bilingual WhatsApp enquiry
(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const trigger = document.querySelector('.workshop-trigger');
  const serviceList = document.getElementById('workshopServices');
  const openLabel = document.getElementById('workshopOpenLabel');
  if (trigger && serviceList) trigger.addEventListener('click', () => {
    const opening = serviceList.hidden;
    serviceList.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
    if (openLabel) openLabel.textContent = opening ? 'Hide workshop services ↑' : 'View all 30 services ↗';
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById('themeToggle');
  const setTheme = dark => {
    document.body.classList.toggle('dark-theme', dark);
    if (themeToggle) {
      themeToggle.textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
      themeToggle.setAttribute('aria-pressed', String(dark));
    }
    try { localStorage.setItem('spm-theme', dark ? 'dark' : 'light'); } catch (_) {}
  };
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('spm-theme') || 'dark'; } catch (_) {}
  setTheme(savedTheme === 'dark');
  if (themeToggle) themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-theme')));

  const languageSelect = document.getElementById('languageSelect');
  const contactCopy = document.getElementById('contactCopy');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const languageLabel = document.querySelector('label[for="languageSelect"]');

  const translations = {
    en: {
      language:'Language', eyebrow:'GET IN TOUCH', title:'Let\'s discuss', title2:'your requirements.', intro:'Contact SPM for workshop enquiries, lorry breakdown assistance or goods transport requirements.', phone:'PHONE', address:'WORKSHOP ADDRESS', directions:'Get Directions',
      formTitle:'Send a Service Enquiry', formIntro:'Complete the form to prepare your enquiry.', name:'Full Name *', namePlaceholder:'Enter your name', email:'Email Address', emailPlaceholder:'you@example.com', phoneLabel:'Phone Number *', phonePlaceholder:'Enter your phone number', type:'Enquiry Type *', choose:'Choose a service', details:'Vehicle / Transport Details *', detailsPlaceholder:'For transport: pickup location, destination and load details. For workshop/breakdown: vehicle details and current location...', submit:'Prepare Enquiry', disclaimer:'This form opens WhatsApp with your enquiry. Review the message and press Send in WhatsApp.', status:'WhatsApp opened with your enquiry. Review the message and press Send.',
      options:['Workshop Support','Heavy Vehicle Repair','Engine Repair / Overhauling','Gearbox / Clutch Repair','Brake / Suspension Repair','Electrical / Battery Service','Tyre Service','Periodic Servicing','Breakdown Assistance','On-Site Lorry Repair','Lorry Load Transport','Other']
    },
    ta: {
      language:'மொழி', eyebrow:'தொடர்புகொள்ளுங்கள்', title:'உங்கள் தேவைகள் பற்றி', title2:'கலந்துரையாடுவோம்.', intro:'பட்டறை சேவை, லாரி பழுது மற்றும் சரக்கு போக்குவரத்து தொடர்பான விசாரணைகளுக்கு SPM-ஐ தொடர்புகொள்ளுங்கள்.', phone:'தொலைபேசி', address:'பட்டறை முகவரி', directions:'வழியைப் பார்க்க',
      formTitle:'சேவை விசாரணை', formIntro:'உங்கள் விசாரணையைத் தயாரிக்க இந்தப் படிவத்தை நிரப்புங்கள்.', name:'முழுப் பெயர் *', namePlaceholder:'உங்கள் பெயரை உள்ளிடவும்', email:'மின்னஞ்சல் முகவரி', emailPlaceholder:'உங்கள் மின்னஞ்சல் முகவரி', phoneLabel:'தொலைபேசி எண் *', phonePlaceholder:'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்', type:'விசாரணை வகை *', choose:'சேவையைத் தேர்ந்தெடுக்கவும்', details:'வாகனம் / போக்குவரத்து விவரங்கள் *', detailsPlaceholder:'போக்குவரத்துக்கு: சரக்கு ஏற்றும் இடம், சேரும் இடம் மற்றும் சரக்கு விவரங்களை உள்ளிடவும். பழுதுபார்ப்புக்கு: வாகன விவரங்கள் மற்றும் தற்போதைய இடத்தை உள்ளிடவும்.', submit:'WhatsApp மூலம் விசாரிக்கவும்', disclaimer:'இந்தப் படிவம் உங்கள் விசாரணையுடன் WhatsApp-ஐ திறக்கும். செய்தியைச் சரிபார்த்து WhatsApp-இல் அனுப்பு என்பதை அழுத்தவும்.', status:'உங்கள் விசாரணையுடன் WhatsApp திறக்கப்பட்டது. செய்தியைச் சரிபார்த்து அனுப்பவும்.',
      options:['பட்டறை சேவை','கனரக வாகன பழுது','எஞ்சின் பழுது / முழுப் பழுது நீக்கம்','கியர்பாக்ஸ் / கிளட்ச் பழுது','பிரேக் / சஸ்பென்ஷன் பழுது','மின்சாரம் / பேட்டரி சேவை','டயர் சேவை','காலமுறை சர்வீஸ்','வழியிலான பழுது உதவி','இடத்திலேயே லாரி பழுது நீக்கம்','லாரி சரக்கு போக்குவரத்து','மற்றவை']
    }
  };

  const englishServiceValues = form ? Array.from(form.querySelector('[name="service"]').options).map(o => o.value) : [];
  function setLanguage(language) {
    const lang = language === 'ta' ? 'ta' : 'en';
    const t = translations[lang];
    if (languageLabel) languageLabel.textContent = t.language;
    if (contactCopy) {
      const eyebrow = contactCopy.querySelector('.eyebrow');
      if (eyebrow) {
        const textNode = Array.from(eyebrow.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.nodeValue = '\n            ' + t.eyebrow + '\n          ';
      }
      const heading = contactCopy.querySelector('h2');
      if (heading) heading.innerHTML = `${t.title}<br><em>${t.title2}</em>`;
      const intro = contactCopy.querySelector(':scope > p');
      if (intro) intro.textContent = t.intro;
      const smalls = contactCopy.querySelectorAll('.contact-detail small');
      if (smalls[0]) smalls[0].textContent = t.phone;
      if (smalls[1]) smalls[1].textContent = t.address;
      const directions = contactCopy.querySelector('.btn-light');
      if (directions) directions.innerHTML = `${t.directions} <span>↗</span>`;
    }
    if (form) {
      const heading = form.querySelector('.form-heading h3');
      const intro = form.querySelector('.form-heading p');
      if (heading) heading.textContent = t.formTitle;
      if (intro) intro.textContent = t.formIntro;
      const labels = Array.from(form.querySelectorAll('label')).filter(label => label.querySelector('input, select, textarea'));
      const labelTexts = [t.name, t.email, t.phoneLabel, t.type, t.details];
      labels.forEach((label, i) => {
        if (!labelTexts[i]) return;
        const firstText = Array.from(label.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim());
        if (firstText) firstText.nodeValue = '\n              ' + labelTexts[i] + '\n              ';
      });
      const name = form.elements.namedItem('name'); if (name) name.placeholder = t.namePlaceholder;
      const email = form.elements.namedItem('email'); if (email) email.placeholder = t.emailPlaceholder;
      const phone = form.elements.namedItem('phone'); if (phone) phone.placeholder = t.phonePlaceholder;
      const details = form.elements.namedItem('message'); if (details) details.placeholder = t.detailsPlaceholder;
      const service = form.elements.namedItem('service');
      if (service) Array.from(service.options).forEach((option, i) => {
        option.textContent = i === 0 ? t.choose : (t.options[i - 1] || option.value);
      });
      const submit = form.querySelector('.submit-btn'); if (submit) submit.innerHTML = `${t.submit} <span>↗</span>`;
      const disclaimer = form.querySelector('.form-disclaimer'); if (disclaimer) disclaimer.textContent = t.disclaimer;
    }
    document.documentElement.lang = lang;
    if (languageSelect) languageSelect.value = lang;
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', event => setLanguage(event.target.value));
    setLanguage(languageSelect.value || 'en');
  }

  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lang = languageSelect && languageSelect.value === 'ta' ? 'ta' : 'en';
    const serviceValue = data.get('service') || '';
    const serviceIndex = englishServiceValues.indexOf(serviceValue);
    const serviceName = lang === 'ta' && serviceIndex > 0 ? translations.ta.options[serviceIndex - 1] : serviceValue;
    const message = lang === 'ta' ? [
      'வணக்கம் SPM லாரி பட்டறை மற்றும் போக்குவரத்து நிறுவனத்தினரே,', '',
      'எனக்கு ஒரு சேவை தொடர்பான விசாரணை உள்ளது.',
      'பெயர்: ' + (data.get('name') || ''), 'தொலைபேசி: ' + (data.get('phone') || ''),
      'மின்னஞ்சல்: ' + (data.get('email') || 'வழங்கப்படவில்லை'), 'சேவை: ' + serviceName,
      'விவரங்கள்: ' + (data.get('message') || '')
    ].join('\n') : [
      'Hello SPM Lorry Workshop & Transport,', '', 'I would like to make an enquiry.',
      'Name: ' + (data.get('name') || ''), 'Phone: ' + (data.get('phone') || ''),
      'Email: ' + (data.get('email') || 'Not provided'), 'Service: ' + serviceValue,
      'Details: ' + (data.get('message') || '')
    ].join('\n');
    if (formStatus) formStatus.textContent = translations[lang].status;
    window.open('https://wa.me/919443896946?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
})();
