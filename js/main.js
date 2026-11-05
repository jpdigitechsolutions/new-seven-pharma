/**
 * New Seven Pharma - Advanced Motion Engine & Interactive Application Logic
 * Mobile-responsive, accessible SPA with WhatsApp order generator,
 * Herd Supplement Estimator, bilingual support, scroll reveals, toast system & image lightbox.
 */

// Application State with robust localStorage parsing
const appState = {
  lang: getSafeStorage('nsp_lang', 'en'),
  activeCategory: 'all',
  searchQuery: '',
  cart: getSafeStorage('nsp_cart', []),
  selectedProduct: null,
  lightboxIndex: 0,
  lastFocusedElement: null
};

// Safe localStorage getter
function getSafeStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return (key === 'nsp_lang') ? val : JSON.parse(val);
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initStickyNav();
  initLiveStoreStatus();
  initLanguage();
  renderCategories();
  renderProducts();
  renderGallery();
  renderStoreServices();
  renderFAQs();
  renderCart();
  initCalculator();
  initPrescriptionFileInput();
  initEventListeners();
  updateStoreDetailsDOM();
  initScrollReveals();
});

// Window load fallback for preloader
window.addEventListener('load', () => {
  hidePreloader();
});

// 1. PRELOADER REVEAL ENGINE
function initPreloader() {
  const preloader = document.getElementById('pagePreloader');
  if (!preloader) return;

  setTimeout(() => {
    hidePreloader();
  }, 650);
}

function hidePreloader() {
  const preloader = document.getElementById('pagePreloader');
  if (preloader && !preloader.classList.contains('preloader-hidden')) {
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
      triggerInitialReveals();
    }, 600);
  }
}

function triggerInitialReveals() {
  document.querySelectorAll('#hero .reveal-init').forEach(el => {
    el.classList.add('reveal-visible');
  });
}

// 2. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.getElementById('bttProgressCircle');

  function onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent * 100))}%`;
    }

    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('btn-show');
      } else {
        backToTopBtn.classList.remove('btn-show');
      }

      if (progressCircle) {
        const offset = 140 - (140 * scrollPercent);
        progressCircle.style.strokeDashoffset = offset;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 3. STICKY NAV ENHANCEMENT & ACTIVE SECTION HIGHLIGHT
function initStickyNav() {
  const siteHeader = document.getElementById('siteHeader');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add('header-scrolled');
      } else {
        siteHeader.classList.remove('header-scrolled');
      }
    }

    if (nav) {
      if (scrollY > 30) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }

    let currentSectionId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('text-emerald-600', 'font-bold', 'active');
        link.classList.remove('text-slate-700');
      } else {
        link.classList.remove('text-emerald-600', 'font-bold', 'active');
        link.classList.add('text-slate-700');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// 4. SCROLL REVEALS ENGINE (Intersection Observer)
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-init');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

// 5. TOAST NOTIFICATION ENGINE
function showToast(message, type = 'success', icon = 'fa-check') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-pill toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, 2800);
}

// 6. STORE CONTACT DETAILS POPULATION
function updateStoreDetailsDOM() {
  document.querySelectorAll('.store-phone-primary').forEach(el => el.textContent = STORE_CONFIG.phones.primary);
  document.querySelectorAll('.store-phone-whatsapp').forEach(el => el.textContent = STORE_CONFIG.phones.whatsapp);
  document.querySelectorAll('.store-phone-landline').forEach(el => el.textContent = STORE_CONFIG.phones.landline);
  document.querySelectorAll('.store-address-full').forEach(el => el.textContent = STORE_CONFIG.address.full);
}

// 7. REAL-TIME STORE OPEN/CLOSED STATUS (Asia/Kolkata Timezone)
function initLiveStoreStatus() {
  const statusBadge = document.getElementById('storeLiveStatus');
  const mobileStatusBadge = document.getElementById('mobileStoreLiveStatus');
  const allMarqueeBadges = document.querySelectorAll('.store-live-status-badge');
  if (!statusBadge && !mobileStatusBadge && allMarqueeBadges.length === 0) return;

  function checkStatus() {
    try {
      const kolkataFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: STORE_CONFIG.timeZone || 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const parts = kolkataFormatter.formatToParts(new Date());
      const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
      const minute = parseInt(parts.find(p => p.type === 'minute').value, 10);
      const currentMinutes = hour * 60 + minute;

      const openMinutes = STORE_CONFIG.timingHours.openHour * 60 + STORE_CONFIG.timingHours.openMinute; // 9:30 AM = 570
      const closeMinutes = STORE_CONFIG.timingHours.closeHour * 60 + STORE_CONFIG.timingHours.closeMinute; // 9:30 PM = 1290

      // Exact boundary: 09:30 inclusive up to 21:30 exclusive
      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
      const isMarathi = appState.lang === 'mr';

      // Dark badge for top marquee ticker
      const marqueeBadgeHtml = isOpen
        ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3"></span>
             ${isMarathi ? 'आता सुरू आहे (९:३० AM - ९:३० PM)' : 'Open Now (9:30 AM - 9:30 PM)'}
           </span>`
        : `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
             <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
             ${isMarathi ? 'दुकान बंद आहे (सकाळी ९:३० वाजता उघडेल)' : 'Closed Now (Opens at 9:30 AM)'}
           </span>`;

      // Light badge for mobile drawer
      const standardBadgeHtml = isOpen
        ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
             <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
             <span class="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5"></span>
             ${isMarathi ? 'आता सुरू आहे (९:३० AM - ९:३० PM)' : 'Open Now (9:30 AM - 9:30 PM)'}
           </span>`
        : `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
             <span class="w-2 h-2 rounded-full bg-amber-500"></span>
             ${isMarathi ? 'दुकान बंद आहे (सकाळी ९:३० वाजता उघडेल)' : 'Closed Now (Opens at 9:30 AM)'}
           </span>`;

      if (statusBadge) statusBadge.innerHTML = marqueeBadgeHtml;
      document.querySelectorAll('.store-live-status-badge').forEach(el => {
        el.innerHTML = marqueeBadgeHtml;
      });
      if (mobileStatusBadge) mobileStatusBadge.innerHTML = standardBadgeHtml;
    } catch (e) {
      console.warn('Error calculating store status:', e);
    }
  }

  checkStatus();
  setInterval(checkStatus, 60000);
}

// 8. BILINGUAL LANGUAGE ENGINE (English & Marathi)
function initLanguage() {
  const langToggleBtn = document.getElementById('langToggle');
  const mobileLangToggleBtn = document.getElementById('mobileLangToggle');

  function updateLangUI() {
    const isMr = appState.lang === 'mr';
    document.documentElement.lang = isMr ? 'mr' : 'en';

    // Dynamic Page Title
    document.title = isMr
      ? 'न्यू सेव्हन फार्मा | पशुवैद्यकीय औषधे, रबरी मॅट, मिल्किंग मशीन व पेट केअर | धुळे'
      : 'New Seven Pharma | Veterinary Medicine, Cow Mat, Milking Machine & Pet Care | Dhule';

    if (langToggleBtn) {
      langToggleBtn.innerHTML = isMr
        ? `<span class="font-extrabold text-emerald-400">मराठी</span> / EN`
        : `EN / <span class="font-extrabold text-emerald-400">मराठी</span>`;
    }
    if (mobileLangToggleBtn) {
      mobileLangToggleBtn.innerHTML = isMr
        ? `Language: <strong class="text-emerald-700">मराठी</strong> (Switch to EN)`
        : `Language: <strong class="text-emerald-700">English</strong> (मराठीत पहा)`;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[appState.lang] && I18N[appState.lang][key]) {
        el.textContent = I18N[appState.lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (I18N[appState.lang] && I18N[appState.lang][key]) {
        el.setAttribute('placeholder', I18N[appState.lang][key]);
      }
    });

    const playPauseText = document.getElementById('sliderPlayPauseText');
    if (playPauseText) {
      playPauseText.textContent = isSliderPaused 
        ? (isMr ? 'स्लायडर सुरू करा' : 'Resume Slide')
        : (isMr ? 'स्लायडर थांबवा' : 'Pause Auto-Slide');
    }

    if (typeof window.recalculateHerdSupply === 'function') {
      window.recalculateHerdSupply();
    }

    renderCategories();
    renderProducts();
    renderGallery();
    renderStoreServices();
    renderFAQs();
    renderCart();
    initLiveStoreStatus();

    // Re-render open product quick-view modal if active
    if (appState.selectedProduct) {
      const modal = document.getElementById('productQuickViewModal');
      if (modal && !modal.classList.contains('hidden')) {
        openProductQuickView(appState.selectedProduct.id);
      }
    }
  }

  window.toggleLanguage = function () {
    appState.lang = appState.lang === 'en' ? 'mr' : 'en';
    try {
      localStorage.setItem('nsp_lang', appState.lang);
    } catch (e) {
      console.warn('Error saving language preference:', e);
    }
    updateLangUI();
    showToast(appState.lang === 'mr' ? 'भाषा मराठीत बदलली' : 'Language set to English', 'info', 'fa-language');
  };

  if (langToggleBtn) langToggleBtn.addEventListener('click', window.toggleLanguage);
  if (mobileLangToggleBtn) mobileLangToggleBtn.addEventListener('click', window.toggleLanguage);

  updateLangUI();
}

// 9. DYNAMIC CATEGORIES RENDERING WITH ACCURATE PRODUCT COUNTS
function renderCategories() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  const isMr = appState.lang === 'mr';

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = appState.activeCategory === cat.id;
    const name = isMr ? cat.nameMr : cat.name;
    const count = getCategoryCount(cat.id);

    return `
      <button 
        type="button"
        onclick="setCategory('${cat.id}')"
        aria-pressed="${isActive}"
        class="cat-pill whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${isActive
        ? 'active'
        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
      }"
      >
        <i class="fa-solid ${cat.icon} ${isActive ? 'text-white' : 'text-emerald-600'}"></i>
        <span>${name}</span>
        <span class="text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'} font-bold">(${count})</span>
      </button>
    `;
  }).join('');
}

window.setCategory = function (catId) {
  appState.activeCategory = catId;
  renderCategories();
  renderProducts();
};

// 10. PRODUCT SEARCH & FILTERING
function getFilteredProducts() {
  return PRODUCTS.filter(prod => {
    const matchCat = appState.activeCategory === 'all' || prod.category === appState.activeCategory;
    if (!matchCat) return false;

    if (!appState.searchQuery.trim()) return true;

    const q = appState.searchQuery.toLowerCase().trim();
    const nameEn = (prod.name || '').toLowerCase();
    const nameMr = (prod.nameMr || '').toLowerCase();
    const sumEn = (prod.summary || '').toLowerCase();
    const sumMr = (prod.summaryMr || '').toLowerCase();
    const pkg = (prod.packaging || '').toLowerCase();

    return nameEn.includes(q) || nameMr.includes(q) || sumEn.includes(q) || sumMr.includes(q) || pkg.includes(q);
  });
}

// 11. PRODUCT CATALOGUE WITH DEDICATED INDIVIDUAL VISUALS
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countBadge = document.getElementById('productResultsCount');
  if (!container) return;

  const filtered = getFilteredProducts();
  const isMr = appState.lang === 'mr';

  if (countBadge) {
    countBadge.textContent = isMr
      ? `एकूण ${filtered.length} उत्पादने उपलब्ध`
      : `Showing ${filtered.length} products`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-xs">
        <div class="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-1">
          ${isMr ? 'कोणतेही उत्पादन सापडले नाही' : 'No matching products found'}
        </h3>
        <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          ${isMr ? 'कृपया दुसरा शब्द शोधून पहा किंवा तुमच्या गरजेप्रमाणे थेट व्हॉट्सॲपवर विचारणा करा.' : 'Try different keywords or enquire directly on WhatsApp for any specific medicine or equipment.'}
        </p>
        <button onclick="resetSearchAndFilter()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition btn-premium shadow-sm">
          ${isMr ? 'सर्व उत्पादने पुन्हा दाखवा' : 'Show All Products'}
        </button>
      </div>
    `;
    return;
  }

    container.innerHTML = filtered.map(prod => {
      const name = isMr ? prod.nameMr : prod.name;
      const summary = isMr ? prod.summaryMr : prod.summary;
      const isInCart = appState.cart.some(item => item.id === prod.id);
      const badge = isMr && prod.badgeMr ? prod.badgeMr : prod.badge;
      const packaging = isMr && prod.packagingMr ? prod.packagingMr : prod.packaging;

      let badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (prod.badgeType === 'hot') badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
      if (prod.badgeType === 'accent') badgeColor = 'bg-sky-50 text-sky-800 border-sky-200';
      if (prod.badgeType === 'warning') badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';

      return `
      <div class="product-card group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
        
        <!-- Individual Product Visual -->
        <div class="img-container relative h-52 bg-gradient-to-tr from-slate-100 to-slate-50 p-4 flex items-center justify-center cursor-pointer" onclick="openProductQuickView('${prod.id}', this)">
          <img 
            src="${prod.image}" 
            alt="${name}" 
            loading="lazy"
            width="360"
            height="260"
            onerror="this.onerror=null; this.src='images/products/placeholder.svg';"
            class="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500"
          />
          
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}">
              ${badge}
            </span>
          </div>

          <button 
            type="button" 
            aria-label="Quick Preview of ${name}"
            onclick="event.stopPropagation(); openProductQuickView('${prod.id}', this)"
            class="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur shadow text-slate-700 hover:text-emerald-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          >
            <i class="fa-solid fa-up-right-and-down-left-from-center text-xs"></i>
          </button>
        </div>

        <!-- Product Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">
              <i class="fa-solid ${prod.thumbIcon}"></i>
              <span>${getCategoryName(prod.category)}</span>
            </div>
            
            <h3 class="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2" onclick="openProductQuickView('${prod.id}', this)">
              ${name}
            </h3>

            <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              ${summary}
            </p>

            <div class="mt-3.5 inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 border border-slate-100">
              <i class="fa-solid fa-box-open text-emerald-500"></i>
              <span>${packaging}</span>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
            <button 
              type="button"
              onclick="toggleCartItem('${prod.id}')"
              id="cartBtn-${prod.id}"
              class="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 btn-lift ${isInCart
          ? 'bg-emerald-700 text-white shadow-sm'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
        }"
            >
              <i class="fa-solid ${isInCart ? 'fa-check' : 'fa-cart-plus'}"></i>
              <span>${isInCart ? (isMr ? 'यादीत जोडले' : 'Added to List') : (isMr ? 'ऑर्डर यादीत जोडा' : 'Add to List')}</span>
            </button>

            <button 
              type="button"
              aria-label="Direct WhatsApp inquiry for ${name}"
              onclick="directWhatsAppEnquiry('${prod.id}')"
              class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/80 flex items-center justify-center transition-all hover:scale-105"
            >
              <i class="fa-brands fa-whatsapp text-lg"></i>
            </button>
          </div>
        </div>

      </div>
    `;
    }).join('');

    renderContinuousSlider();
  }

  let isSliderPaused = false;
  window.toggleSliderPlayPause = function () {
    const track = document.getElementById('continuousSliderTrack');
    const icon = document.getElementById('sliderPlayPauseIcon');
    const text = document.getElementById('sliderPlayPauseText');
    if (!track) return;

    isSliderPaused = !isSliderPaused;
    if (isSliderPaused) {
      track.classList.add('paused');
      if (icon) icon.className = 'fa-solid fa-play text-emerald-600 text-xs';
      if (text) text.textContent = appState.lang === 'mr' ? 'सुरू करा' : 'Resume Slide';
    } else {
      track.classList.remove('paused');
      if (icon) icon.className = 'fa-solid fa-pause text-emerald-600 text-xs';
      if (text) text.textContent = appState.lang === 'mr' ? 'थांबवा' : 'Pause Auto-Slide';
    }
  };

  function renderContinuousSlider() {
    const track = document.getElementById('continuousSliderTrack');
    if (!track) return;

    const isMr = appState.lang === 'mr';
    // Duplicate array for infinite seamless looping
    const loopedItems = [...PRODUCTS, ...PRODUCTS];

    track.innerHTML = loopedItems.map(prod => {
      const name = isMr ? prod.nameMr : prod.name;
      const summary = isMr ? prod.summaryMr : prod.summary;
      const isInCart = appState.cart.some(item => item.id === prod.id);
      const badge = isMr && prod.badgeMr ? prod.badgeMr : prod.badge;
      const packaging = isMr && prod.packagingMr ? prod.packagingMr : prod.packaging;

      let badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (prod.badgeType === 'hot') badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
      if (prod.badgeType === 'accent') badgeColor = 'bg-sky-50 text-sky-800 border-sky-200';
      if (prod.badgeType === 'warning') badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';

      return `
        <div class="product-card group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden w-72 sm:w-80 shrink-0 select-none">
          
          <!-- Product Visual -->
          <div class="img-container relative h-48 bg-gradient-to-tr from-slate-100 to-slate-50 p-4 flex items-center justify-center cursor-pointer" onclick="openProductQuickView('${prod.id}', this)">
            <img 
              src="${prod.image}" 
              alt="${name}" 
              loading="lazy"
              width="320"
              height="220"
              onerror="this.onerror=null; this.src='images/products/placeholder.svg';"
              class="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
            
            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}">
                ${badge}
              </span>
            </div>

            <button 
              type="button" 
              aria-label="Quick Preview of ${name}"
              onclick="event.stopPropagation(); openProductQuickView('${prod.id}', this)"
              class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur shadow text-slate-700 hover:text-emerald-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <i class="fa-solid fa-up-right-and-down-left-from-center text-[10px]"></i>
            </button>
          </div>

          <!-- Product Details -->
          <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">
                <i class="fa-solid ${prod.thumbIcon}"></i>
                <span>${getCategoryName(prod.category)}</span>
              </div>
              
              <h3 class="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1" onclick="openProductQuickView('${prod.id}', this)">
                ${name}
              </h3>

              <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                ${summary}
              </p>

              <div class="mt-2.5 inline-flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-lg text-[10px] font-medium text-slate-600 border border-slate-100">
                <i class="fa-solid fa-box-open text-emerald-500"></i>
                <span>${packaging}</span>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="pt-3.5 mt-3 border-t border-slate-100 flex items-center gap-2">
              <button 
                type="button"
                onclick="toggleCartItem('${prod.id}')"
                class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 btn-lift ${isInCart
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }"
              >
                <i class="fa-solid ${isInCart ? 'fa-check' : 'fa-cart-plus'}"></i>
                <span>${isInCart ? (isMr ? 'यादीत आहे' : 'In List') : (isMr ? 'ऑर्डर यादीत जोडा' : 'Add to List')}</span>
              </button>

              <button 
                type="button"
                aria-label="Direct WhatsApp inquiry for ${name}"
                onclick="directWhatsAppEnquiry('${prod.id}')"
                class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/80 flex items-center justify-center transition-all hover:scale-105 shrink-0"
                title="Order on WhatsApp"
              >
                <i class="fa-brands fa-whatsapp text-base"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

window.resetSearchAndFilter = function () {
      appState.activeCategory = 'all';
      appState.searchQuery = '';
      const searchInput = document.getElementById('productSearchInput');
      if (searchInput) searchInput.value = '';
      renderCategories();
      renderProducts();
    };

  function getCategoryName(catId) {
    const isMr = appState.lang === 'mr';
    const c = CATEGORIES.find(item => item.id === catId);
    return c ? (isMr ? c.nameMr : c.name) : catId;
  }

    // 12. PRODUCT QUICK VIEW MODAL (with Focus Management)
    window.openProductQuickView = function (prodId, triggerEl) {
      const prod = PRODUCTS.find(p => p.id === prodId);
      if (!prod) return;

      appState.selectedProduct = prod;
      appState.lastFocusedElement = triggerEl || document.activeElement;

      const isMr = appState.lang === 'mr';
      const modal = document.getElementById('productQuickViewModal');
      const modalContent = document.getElementById('quickViewContent');
      if (!modal || !modalContent) return;

      const name = isMr ? prod.nameMr : prod.name;
      const summary = isMr ? prod.summaryMr : prod.summary;
      const isInCart = appState.cart.some(i => i.id === prod.id);
      const badge = isMr && prod.badgeMr ? prod.badgeMr : prod.badge;
      const packaging = isMr && prod.packagingMr ? prod.packagingMr : prod.packaging;
      const features = (isMr && prod.featuresMr) ? prod.featuresMr : prod.features;
      const deliveryText = isMr ? STORE_CONFIG.deliveryTextMr : STORE_CONFIG.deliveryText;

      modalContent.innerHTML = `
    <div class="grid md:grid-cols-12 gap-5 sm:gap-6 items-start">
      
      <!-- Left Visual Box -->
      <div class="md:col-span-5 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-2xl p-4 sm:p-6 flex items-center justify-center border border-slate-100 relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
        <img 
          src="${prod.image}" 
          alt="${name}" 
          width="360"
          height="260"
          onerror="this.onerror=null; this.src='images/products/placeholder.svg';"
          class="max-h-48 sm:max-h-60 md:max-h-72 max-w-full object-contain drop-shadow-md transition-transform duration-300" 
        />
        <span class="absolute top-3 left-3 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
          ${badge}
        </span>
      </div>

      <!-- Right Details & Actions -->
      <div class="md:col-span-7 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1.5">
            <i class="fa-solid ${prod.thumbIcon}"></i>
            <span>${getCategoryName(prod.category)}</span>
          </div>

          <h2 id="quickViewTitle" class="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-tight mb-2 sm:mb-3">
            ${name}
          </h2>

          <p class="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 leading-relaxed">
            ${summary}
          </p>

          <div class="space-y-1.5 mb-4">
            <div class="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wide">
              ${isMr ? 'उत्पादन वैशिष्ट्ये:' : 'Product Information:'}
            </div>
            <ul class="text-xs text-slate-600 space-y-1.5">
              ${features.map(f => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 text-xs shrink-0"></i><span>${f}</span></li>`).join('')}
            </ul>
          </div>

          <div class="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 sm:p-3.5 mb-5 text-xs text-slate-700 space-y-1">
            <div class="font-bold text-emerald-900 flex items-center gap-1.5">
              <i class="fa-solid fa-truck-fast text-emerald-600"></i>
              <span>${deliveryText}</span>
            </div>
            <div class="font-medium text-slate-600 flex items-center gap-1.5">
              <i class="fa-solid fa-box text-emerald-600"></i>
              <span>${isMr ? 'उपलब्ध साईझ / पॅक:' : 'Available Size / Packaging:'} ${packaging}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons: Responsive Equal Grid (1 col on mobile, 2 cols on tablet/desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
          <button 
            type="button" 
            onclick="toggleCartItem('${prod.id}'); updateQuickViewModalBtn('${prod.id}');"
            id="modalCartBtn"
            class="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 btn-premium ${isInCart ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-emerald-600 hover:bg-emerald-700'}"
          >
            <i class="fa-solid ${isInCart ? 'fa-check' : 'fa-cart-plus'} text-sm"></i>
            <span class="whitespace-nowrap">${isInCart ? (isMr ? 'यादीत जोडले गेले आहे' : 'Added to List') : (isMr ? 'ऑर्डर यादीत जोडा' : 'Add to Order List')}</span>
          </button>

          <button 
            type="button" 
            onclick="directWhatsAppEnquiry('${prod.id}')"
            class="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition flex items-center justify-center gap-2 shadow-sm btn-lift"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span class="whitespace-nowrap">${isMr ? 'थेट व्हॉट्सॲप चौकशी' : 'Inquire on WhatsApp'}</span>
          </button>
        </div>
      </div>

    </div>
  `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');

      // Focus the close button
      const closeBtn = modal.querySelector('button[onclick*="closeProductQuickView"]');
      if (closeBtn) closeBtn.focus();
    };

    window.closeProductQuickView = function () {
      const modal = document.getElementById('productQuickViewModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (appState.lastFocusedElement && typeof appState.lastFocusedElement.focus === 'function') {
        appState.lastFocusedElement.focus();
      }
    };

    function updateQuickViewModalBtn(prodId) {
      const btn = document.getElementById('modalCartBtn');
      if (!btn) return;
      const isMr = appState.lang === 'mr';
      const isInCart = appState.cart.some(i => i.id === prodId);
      btn.className = `w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 btn-premium ${
        isInCart ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-emerald-600 hover:bg-emerald-700'
      }`;
      btn.innerHTML = `<i class="fa-solid ${isInCart ? 'fa-check' : 'fa-cart-plus'} text-sm"></i> <span class="whitespace-nowrap">${
        isInCart ? (isMr ? 'यादीत जोडले गेले आहे' : 'Added to List') : (isMr ? 'ऑर्डर यादीत जोडा' : 'Add to Order List')
      }</span>`;
    }

    // 13. DIRECT WHATSAPP PRODUCT INQUIRY
    window.directWhatsAppEnquiry = function (prodId) {
      const prod = PRODUCTS.find(p => p.id === prodId);
      if (!prod) return;

      const isMr = appState.lang === 'mr';
      const name = isMr ? prod.nameMr : prod.name;

      const message = isMr
    ?`नमस्कार न्यू सेव्हन फार्मा (धुळे),\nमला खालील उत्पादनाची माहिती, दर व उपलब्धता हवी आहे:\n- उत्पादन: *${name}*\n- पॅकेजिंग: ${prod.packaging}\nकृपया मार्गदर्शन करावे.`
    : `Hello New Seven Pharma (Dhule),\nI would like details, current price and availability for:\n- Product: *${name}*\n- Packaging: ${prod.packaging}\nPlease guide me.`;

      const url = `https://wa.me/91${STORE_CONFIG.phones.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    };

    // 14. ORDER LIST / CART OPERATIONS & TOAST FEEDBACK
    window.toggleCartItem = function (prodId) {
      const prod = PRODUCTS.find(p => p.id === prodId);
      if (!prod) return;

      const index = appState.cart.findIndex(i => i.id === prodId);
      const isMr = appState.lang === 'mr';
      const name = isMr ? prod.nameMr : prod.name;

      if (index > -1) {
        appState.cart.splice(index, 1);
        showToast(`${name} ${isMr ? 'यादीतून काढले' : 'removed from list'}`, 'info', 'fa-trash-can');
      } else {
        appState.cart.push({
          id: prod.id,
          name: prod.name,
          nameMr: prod.nameMr,
          packaging: prod.packaging,
          quantity: 1
        });
        showToast(`${name} ${isMr ? 'यादीत जोडले गेले!' : 'added to your order list!'}`, 'success', 'fa-cart-plus');
      }

      saveCart();
      renderProducts();
      renderCart();
    };

    window.updateCartQuantity = function (prodId, delta) {
      const item = appState.cart.find(i => i.id === prodId);
      if (!item) return;

      item.quantity += delta;
      if (item.quantity <= 0) {
        appState.cart = appState.cart.filter(i => i.id !== prodId);
        showToast(appState.lang === 'mr' ? 'उत्पादन यादीतून काढले' : 'Item removed from list', 'info', 'fa-trash-can');
      }

      saveCart();
      renderProducts();
      renderCart();
    };

    window.clearCart = function () {
      if (appState.cart.length === 0) return;
      appState.cart = [];
      saveCart();
      renderProducts();
      renderCart();
      showToast(appState.lang === 'mr' ? 'ऑर्डर यादी रिकामी केली' : 'Order list cleared', 'info', 'fa-rotate-left');
    };

    function saveCart() {
      try {
        localStorage.setItem('nsp_cart', JSON.stringify(appState.cart));
      } catch (e) {
        console.warn('Error saving cart:', e);
      }
    }

    // 15. RENDER ORDER DRAWER
    function renderCart() {
      const countBadges = document.querySelectorAll('.cart-count-badge');
      const totalCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);

      countBadges.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      });

      const cartList = document.getElementById('cartItemsList');
      const cartSummary = document.getElementById('cartSummaryArea');
      const isMr = appState.lang === 'mr';

      if (!cartList) return;

      if (appState.cart.length === 0) {
        cartList.innerHTML = `
      <div class="py-16 text-center text-slate-500">
        <div class="w-16 h-16 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl">
          <i class="fa-solid fa-cart-arrow-down"></i>
        </div>
        <p class="text-sm font-bold text-slate-700">${isMr ? 'तुमची ऑर्डर यादी रिकामी आहे' : 'Your order list is empty'}</p>
        <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          ${isMr ? 'उत्पादने पाहून "ऑर्डर यादीत जोडा" वर क्लिक करा.' : 'Browse the catalog and tap "Add to Order List" to build your WhatsApp order.'}
        </p>
      </div>
    `;
        if (cartSummary) cartSummary.classList.add('hidden');
        return;
      }

      if (cartSummary) cartSummary.classList.remove('hidden');

      cartList.innerHTML = appState.cart.map(item => {
        const name = isMr ? item.nameMr : item.name;
        const packaging = isMr && item.packagingMr ? item.packagingMr : item.packaging;
        return `
      <div class="flex items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-slate-900 truncate">${name}</div>
          <div class="text-[11px] text-slate-500 font-medium">${packaging}</div>
        </div>

        <div class="flex items-center gap-2">
          <div class="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
            <button onclick="updateCartQuantity('${item.id}', -1)" aria-label="Decrease quantity" class="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold transition">-</button>
            <span class="w-8 text-center text-xs font-extrabold text-slate-800">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" aria-label="Increase quantity" class="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs font-bold transition">+</button>
          </div>
          <button onclick="updateCartQuantity('${item.id}', -${item.quantity})" aria-label="Remove item" class="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 text-xs transition">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
      }).join('');
    }

    // 16. SEND CART TO WHATSAPP
    window.sendCartToWhatsApp = function () {
      if (appState.cart.length === 0) return;

      const isMr = appState.lang === 'mr';
      const notesInput = document.getElementById('cartCustomerNotes');
      const userNotes = notesInput ? notesInput.value.trim() : '';

      let message = isMr
        ? `*नमस्कार न्यू सेव्हन फार्मा (धुळे)!*\nमला खालील औषधे / उत्पादने ऑर्डर करायची आहेत:\n\n`
        : `*Hello New Seven Pharma (Dhule)!*\nI would like to place an order for the following items:\n\n`;

      appState.cart.forEach((item, index) => {
        const name = isMr ? item.nameMr : item.name;
        const packaging = isMr && item.packagingMr ? item.packagingMr : item.packaging;
        message += `${index + 1}. *${name}*\n   - ${isMr ? 'नग/प्रमाण' : 'Quantity'}: ${item.quantity}\n   - ${isMr ? 'पॅक' : 'Packaging'}: ${packaging}\n`;
      });

      if (userNotes) {
        message += `\n*ग्राहक सूचना / पत्ता:*\n${userNotes}\n`;
      }

      message += `\nकृपया एकूण बिल, बँक/UPI तपशील आणि डिलिव्हरी वेळ कळवावी. धन्यवाद!`;

      const url = `https://wa.me/91${STORE_CONFIG.phones.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    };

    // 17. TOGGLE CART DRAWER
    window.toggleCartDrawer = function () {
      const drawer = document.getElementById('cartDrawer');
      const backdrop = document.getElementById('cartDrawerBackdrop');
      if (!drawer || !backdrop) return;

      const isOpen = !drawer.classList.contains('translate-x-full');

      if (isOpen) {
        drawer.classList.add('translate-x-full');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        backdrop.classList.remove('opacity-50', 'pointer-events-auto');
        drawer.setAttribute('aria-hidden', 'true');
        if (appState.lastFocusedElement && typeof appState.lastFocusedElement.focus === 'function') {
          appState.lastFocusedElement.focus();
        }
      } else {
        appState.lastFocusedElement = document.activeElement;
        drawer.classList.remove('translate-x-full');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-50', 'pointer-events-auto');
        drawer.setAttribute('aria-hidden', 'false');
        renderCart();

        const closeBtn = drawer.querySelector('button[onclick*="toggleCartDrawer"]');
        if (closeBtn) closeBtn.focus();
      }
    };

    // 18. PRESCRIPTION UPLOAD INTERFACE (Transparent & Accurate)
    function initPrescriptionFileInput() {
      const fileInput = document.getElementById('prescFile');
      const fileNotice = document.getElementById('prescFileNotice');
      const filePreviewArea = document.getElementById('prescPreviewArea');
      const fileImgPreview = document.getElementById('prescImgPreview');
      const fileNameText = document.getElementById('prescFileName');

      if (!fileInput) return;

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        const isMr = appState.lang === 'mr';

        if (file) {
          if (fileNameText) fileNameText.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
          if (fileNotice) {
            fileNotice.textContent = isMr
              ? 'फोटोची पडताळणी झाली आहे. कृपया लक्षात घ्या: व्हॉट्सॲप उघडल्यानंतर आपल्याला हा फोटो तेथून प्रत्यक्ष पाठवावा लागेल.'
              : 'Photo selected for preview. Please note: Web browsers cannot automatically upload files into WhatsApp. You will manually attach this image once WhatsApp opens.';
          }
          if (filePreviewArea) filePreviewArea.classList.remove('hidden');

          if (fileImgPreview && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
              fileImgPreview.src = loadEvent.target.result;
              fileImgPreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
          }
        } else {
          if (filePreviewArea) filePreviewArea.classList.add('hidden');
          if (fileNotice) {
            fileNotice.textContent = isMr
              ? 'फोटो निवडलेला नाही. आपण व्हॉट्सॲप चॅट उघडल्यानंतर तेथून थेट चिठ्ठीचा फोटो पाठवू शकता.'
              : 'No photo selected. You can attach your prescription photo directly in WhatsApp chat.';
          }
        }
      });
    }

    window.openPrescriptionModal = function () {
      const modal = document.getElementById('prescriptionModal');
      if (modal) {
        appState.lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.setAttribute('aria-hidden', 'false');
        const firstInput = document.getElementById('prescName');
        if (firstInput) firstInput.focus();
      }
    };

    window.closePrescriptionModal = function () {
      const modal = document.getElementById('prescriptionModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.setAttribute('aria-hidden', 'true');
      }
      if (appState.lastFocusedElement && typeof appState.lastFocusedElement.focus === 'function') {
        appState.lastFocusedElement.focus();
      }
    };

    window.submitPrescriptionViaWhatsApp = function (e) {
      if (e) e.preventDefault();
      const isMr = appState.lang === 'mr';
      const name = document.getElementById('prescName')?.value.trim() || 'Customer';
      const phone = document.getElementById('prescPhone')?.value.trim() || '';
      const village = document.getElementById('prescVillage')?.value.trim() || 'Dhule';
      const notes = document.getElementById('prescNotes')?.value.trim() || '';
      const fileInput = document.getElementById('prescFile');
      const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

      let fileStatus = hasFile
        ? (isMr ? '(माझ्याकडे चिठ्ठीचा फोटो तयार असून मी पुढील मेसेजमध्ये जोडत आहे)' : '(I have selected a prescription photo and will attach it in this WhatsApp chat)')
        : (isMr ? '(मी पुढील मेसेजमध्ये डॉक्टरांच्या चिठ्ठीचा फोटो पाठवत आहे)' : '(I will attach my prescription photo in this chat)');

      const message = isMr
    ?`*नमस्कार न्यू सेव्हन फार्मा,*\nमी डॉक्टरांचे प्रिस्क्रिप्शन / औषधांची यादी पाठवत आहे.\n\n*माझा संपर्क तपशील:*\n- नाव: ${name}\n- फोन: ${phone}\n- गाव / परिसर: ${village}\n- सूचना: ${notes || 'फोटोप्रमाणे औषधे तपासावीत.'}\n\n${fileStatus}`
    : `*Hello New Seven Pharma,*\nI am sharing a veterinary prescription / medicine requirement.\n\n*My Details:*\n- Name: ${name}\n- Phone: ${phone}\n- Location: ${village}\n- Notes: ${notes || 'Please verify medicines from prescription photo.'}\n\n${fileStatus}`;

      const url = `https://wa.me/91${STORE_CONFIG.phones.whatsapp}?text=${encodeURIComponent(message)}`;

      if (typeof window.trackEvent === 'function') {
        window.trackEvent('prescription_order_sent', {
          customer_name: name,
          village: village,
          has_attached_file: hasFile
        });
      }

      window.open(url, '_blank');
      closePrescriptionModal();
    };

    // 19. HERD SUPPLEMENT CONSUMPTION ESTIMATOR (Transparent & Non-Prescription)
    function initCalculator() {
      const cowsInput = document.getElementById('calcCows');
      const dailyLiquidInput = document.getElementById('calcDailyLiquid');
      const dailyMineralInput = document.getElementById('calcDailyMinerals');
      const calculateBtn = document.getElementById('calcBtn');
      const orderCalcBtn = document.getElementById('orderCalcBtn');

      if (!calculateBtn) return;

      function doCalculation() {
        const cows = Math.max(1, parseInt(cowsInput?.value, 10) || 1);
        const dailyLiquid = Math.max(10, parseFloat(dailyLiquidInput?.value) || 100);
        const dailyMinerals = Math.max(10, parseFloat(dailyMineralInput?.value) || 50);
        const isMr = appState.lang === 'mr';

        // Simple mathematical estimation for shed inventory planning
        const totalDailyLiquid = cows * dailyLiquid; // ml
        const monthlyCalciumLitres = (totalDailyLiquid * 30) / 1000; // Litres

        const totalDailyMinerals = cows * dailyMinerals; // grams
        const monthlyMineralsKg = (totalDailyMinerals * 30) / 1000; // kg

        const resDaily = document.getElementById('calcResultDaily');
        const resMonthly = document.getElementById('calcResultMonthly');
        const resMinerals = document.getElementById('calcResultMinerals');

        if (resDaily) resDaily.textContent = `${totalDailyLiquid} ml / ${isMr ? 'दिवस' : 'day'}`;
        if (resMonthly) resMonthly.textContent = `${monthlyCalciumLitres.toFixed(1)} ${isMr ? 'लिटर (अंदाजे)' : 'Litres (approx)'}`;
        if (resMinerals) resMinerals.textContent = `${monthlyMineralsKg.toFixed(1)} ${isMr ? 'किलो (अंदाजे)' : 'Kg (approx)'}`;

        if (orderCalcBtn) {
          orderCalcBtn.onclick = function () {
            const orderMsg = isMr
          ?`*नमस्कार न्यू सेव्हन फार्मा (धुळे),*\nमी वेबसाइटवरील अंदाज कॅल्क्युलेटरद्वारे माझ्या गोठ्यासाठी पूरक आहाराचे अंदाजे प्रमाण काढले आहे:\n- जनावरे संख्या: ${cows} गाई/म्हशी\n- अंदाजे दररोज प्रमाण: ${dailyLiquid} ml लिक्विड व ${dailyMinerals} g मिनरल मिक्श्चर प्रति जनावर\n- महिन्याला अंदाजे लागणारे लिक्विड कॅल्शियम: *${monthlyCalciumLitres.toFixed(1)} लिटर*\n- महिन्याला अंदाजे लागणारे मिनरल मिक्श्चर: *${monthlyMineralsKg.toFixed(1)} किलो*\nकृपया या प्रमाणासाठी योग्य पॅक व उपलब्धता सांगावी.`
          : `*Hello New Seven Pharma (Dhule),*\nI estimated my herd supplement requirements on your website:\n- Milking Animals: ${cows}\n- Estimated Daily Rate: ${dailyLiquid} ml liquid & ${dailyMinerals} g minerals per animal\n- Monthly Liquid Calcium: *${monthlyCalciumLitres.toFixed(1)} Litres*\n- Monthly Mineral Mixture: *${monthlyMineralsKg.toFixed(1)} Kg*\nPlease guide me on suitable packs and stock availability.`;

            const url = `https://wa.me/91${STORE_CONFIG.phones.whatsapp}?text=${encodeURIComponent(orderMsg)}`;

            if (typeof window.trackEvent === 'function') {
              window.trackEvent('herd_calculator_order', {
                cows_count: cows,
                monthly_calcium_litres: monthlyCalciumLitres.toFixed(1),
                monthly_minerals_kg: monthlyMineralsKg.toFixed(1)
              });
            }

            window.open(url, '_blank');
          };
        }
      }

      window.recalculateHerdSupply = doCalculation;
      calculateBtn.addEventListener('click', doCalculation);
      if (cowsInput) cowsInput.addEventListener('input', doCalculation);
      if (dailyLiquidInput) dailyLiquidInput.addEventListener('input', doCalculation);
      if (dailyMineralInput) dailyMineralInput.addEventListener('input', doCalculation);
      doCalculation();
    }

    // 20. GALLERY & FULL-SCREEN LIGHTBOX (with Keyboard & Touch Controls)
    function renderGallery() {
      const container = document.getElementById('galleryGrid');
      if (!container) return;

      const isMr = appState.lang === 'mr';

      container.innerHTML = GALLERY_IMAGES.map((img, idx) => {
        const title = isMr ? img.titleMr : img.title;
        const desc = isMr ? img.descMr : img.desc;

        return `
      <div 
        class="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-4/5 reveal-init fade-up"
        onclick="openLightbox(${idx}, this)"
      >
        <img 
          src="${img.src}" 
          alt="${title}" 
          loading="lazy"
          width="400"
          height="500"
          class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-95 group-hover:opacity-100"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity"></div>
        <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
          <span class="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white mb-2 backdrop-blur-sm">
            ${isMr ? (img.tagMr || 'दुकान माहिती') : (img.tag || 'Store Showcase')}
          </span>
          <h4 class="font-black text-base text-white group-hover:text-emerald-300 transition-colors leading-tight mb-1">
            ${title}
          </h4>
          <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            ${desc}
          </p>
          <div class="mt-3 flex items-center gap-1.5 text-xs text-emerald-300 font-semibold">
            <i class="fa-solid fa-expand text-xs"></i>
            <span>${isMr ? 'मोठे करून पहा (झूम)' : 'Click to View Full Size'}</span>
          </div>
        </div>
      </div>
    `;
      }).join('');
    }

      window.openLightbox = function (index, triggerEl) {
        appState.lightboxIndex = index;
        appState.lastFocusedElement = triggerEl || document.activeElement;

        const modal = document.getElementById('lightboxModal');
        const imgEl = document.getElementById('lightboxImage');
        const titleEl = document.getElementById('lightboxTitle');
        const descEl = document.getElementById('lightboxDesc');
        if (!modal || !imgEl) return;

        const item = GALLERY_IMAGES[index];
        const isMr = appState.lang === 'mr';

        imgEl.src = item.src;
        if (titleEl) titleEl.textContent = isMr ? item.titleMr : item.title;
        if (descEl) descEl.textContent = isMr ? item.descMr : item.desc;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.setAttribute('aria-hidden', 'false');

        const closeBtn = modal.querySelector('button[onclick*="closeLightbox"]');
        if (closeBtn) closeBtn.focus();
      };

      window.closeLightbox = function () {
        const modal = document.getElementById('lightboxModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          modal.setAttribute('aria-hidden', 'true');
        }
        if (appState.lastFocusedElement && typeof appState.lastFocusedElement.focus === 'function') {
          appState.lastFocusedElement.focus();
        }
      };

      window.stepLightbox = function (step) {
        let nextIdx = appState.lightboxIndex + step;
        if (nextIdx < 0) nextIdx = GALLERY_IMAGES.length - 1;
        if (nextIdx >= GALLERY_IMAGES.length) nextIdx = 0;
        openLightbox(nextIdx);
      };

        // 21. STORE SERVICES & ADVISORY GUIDELINES (Verified Information)
        function renderStoreServices() {
          const container = document.getElementById('servicesContainer');
          if (!container) return;

          const isMr = appState.lang === 'mr';

            container.innerHTML = STORE_SERVICES.map(srv => {
              const title = isMr ? srv.titleMr : srv.title;
              const desc = isMr ? srv.descMr : srv.desc;

              return `
      <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
        <div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl mb-4 border border-emerald-100">
            <i class="fa-solid ${srv.icon}"></i>
          </div>
          <h3 class="font-black text-slate-900 text-base mb-2">
            ${title}
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ${desc}
          </p>
        </div>

        <div class="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
          <i class="fa-solid fa-circle-check text-emerald-500"></i>
          <span>${isMr ? 'न्यू सेव्हन फार्मा, धुळे' : 'New Seven Pharma, Dhule'}</span>
        </div>
      </div>
    `;
            }).join('');
          }

// 22. FAQS ACCORDION
function renderFAQs() {
              const container = document.getElementById('faqsAccordion');
              if (!container) return;

              const isMr = appState.lang === 'mr';

              container.innerHTML = FAQS.map((faq, idx) => {
                const q = isMr ? faq.qMr : faq.q;
                const a = isMr ? faq.aMr : faq.a;

                return `
      <div class="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all duration-200 hover:border-emerald-300">
        <button 
          type="button" 
          onclick="toggleFaq(${idx})"
          class="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-emerald-700 transition"
          aria-expanded="false"
          id="faq-btn-${idx}"
        >
          <span class="text-xs sm:text-base leading-snug">${q}</span>
          <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200" id="faq-circle-${idx}">
            <i id="faq-icon-${idx}" class="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
          </div>
        </button>
        <div id="faq-ans-${idx}" class="hidden p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
          ${a}
        </div>
      </div>
    `;
              }).join('');
            }

window.toggleFaq = function (idx) {
              const ans = document.getElementById(`faq-ans-${idx}`);
              const icon = document.getElementById(`faq-icon-${idx}`);
              const circle = document.getElementById(`faq-circle-${idx}`);
              const btn = document.getElementById(`faq-btn-${idx}`);
              if (!ans) return;

              const isHidden = ans.classList.contains('hidden');
              if (isHidden) {
                ans.classList.remove('hidden');
                if (icon) icon.classList.add('rotate-180');
                if (circle) circle.classList.add('bg-emerald-100', 'text-emerald-700');
                if (btn) btn.setAttribute('aria-expanded', 'true');
              } else {
                ans.classList.add('hidden');
                if (icon) icon.classList.remove('rotate-180');
                if (circle) circle.classList.remove('bg-emerald-100', 'text-emerald-700');
                if (btn) btn.setAttribute('aria-expanded', 'false');
              }
            };

          // 23. MOBILE NAVIGATION WITH MORPHING HAMBURGER
          window.toggleMobileNav = function () {
            const nav = document.getElementById('mobileNavDrawer');
            const backdrop = document.getElementById('mobileNavBackdrop');
            const hamburger = document.getElementById('hamburgerBox');
            if (!nav || !backdrop) return;

            const isOpen = !nav.classList.contains('-translate-x-full');
            if (isOpen) {
              nav.classList.add('-translate-x-full');
              backdrop.classList.add('opacity-0', 'pointer-events-none');
              backdrop.classList.remove('opacity-50', 'pointer-events-auto');
              if (hamburger) hamburger.classList.remove('hamburger-open');
              nav.setAttribute('aria-hidden', 'true');
            } else {
              nav.classList.remove('-translate-x-full');
              backdrop.classList.remove('opacity-0', 'pointer-events-none');
              backdrop.classList.add('opacity-50', 'pointer-events-auto');
              if (hamburger) hamburger.classList.add('hamburger-open');
              nav.setAttribute('aria-hidden', 'false');
            }
          };

          // 24. GLOBAL KEYBOARD & ACCESSIBILITY HANDLERS
          function initEventListeners() {
            const searchInput = document.getElementById('productSearchInput');
            if (searchInput) {
              searchInput.addEventListener('input', (e) => {
                appState.searchQuery = e.target.value;
                renderProducts();
              });
            }

            // Smooth In-Page Anchor Scrolling with Sticky Header Offset
            document.querySelectorAll('a[href^="#"]').forEach(link => {
              link.addEventListener('click', function (e) {
                const hash = this.getAttribute('href');
                if (!hash || hash === '#' || hash.length <= 1) return;
                const target = document.querySelector(hash);
                if (target) {
                  e.preventDefault();
                  const header = document.getElementById('siteHeader');
                  const headerHeight = header ? header.offsetHeight : 100;
                  const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
                  // Extra 18px breathing room so section titles and badges are comfortably visible
                  const offsetPosition = targetTop - headerHeight - 18;

                  window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                  });

                  // Update address bar hash without instant jumping
                  if (history.pushState) {
                    history.pushState(null, null, hash);
                  }
                }
              });
            });

            window.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                closeProductQuickView();
                closeLightbox();
                closePrescriptionModal();
                const drawer = document.getElementById('cartDrawer');
                if (drawer && !drawer.classList.contains('translate-x-full')) {
                  toggleCartDrawer();
                }
                const nav = document.getElementById('mobileNavDrawer');
                if (nav && !nav.classList.contains('-translate-x-full')) {
                  toggleMobileNav();
                }
              }
              if (e.key === 'ArrowRight') {
                const lbox = document.getElementById('lightboxModal');
                if (lbox && !lbox.classList.contains('hidden')) stepLightbox(1);
              }
              if (e.key === 'ArrowLeft') {
                const lbox = document.getElementById('lightboxModal');
                if (lbox && !lbox.classList.contains('hidden')) stepLightbox(-1);
              }
            });

            // Lightbox Touch Swipe Gestures
            let touchStartX = 0;
            let touchEndX = 0;
            const lboxModal = document.getElementById('lightboxModal');
            if (lboxModal) {
              lboxModal.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
              }, { passive: true });
              lboxModal.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchEndX < touchStartX - 50) stepLightbox(1);
                if (touchEndX > touchStartX + 50) stepLightbox(-1);
              }, { passive: true });
            }
          }

/* ==========================================================
   25. HIDE / REMOVE INJECTED NETLIFY BADGE & DRAWER
   ========================================================== */
function removeNetlifyBadge() {
  const selectors = [
    '#nl-badge',
    '.nl-badge',
    '#nl-card',
    '.nl-card',
    '.nl-badge-label',
    '.nl-badge-brand',
    '[class*="nl-badge"]',
    '[id*="nl-badge"]',
    '[class*="nl-card"]',
    '[id*="nl-card"]',
    '[aria-controls="nl-card"]',
    '[aria-label*="Powered by Netlify"]',
    'iframe#netlify-drawer',
    'iframe[src*="netlify"]',
    '[data-netlify-drawer]',
    'div[class*="netlify-drawer"]',
    '#netlify-badge',
    '.netlify-badge',
    'netlify-badge',
    'netlify-drawer',
    'a[href*="www.netlify.com"]',
    'a[href*="app.netlify.com"]'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.setProperty('display', 'none', 'important');
      try { el.remove(); } catch (e) {}
    });
  });

  // Remove any Shadow DOM host or bottom-right injected container
  document.querySelectorAll('*').forEach(el => {
    if (el.shadowRoot) {
      const html = (el.shadowRoot.innerHTML || '').toLowerCase();
      if (html.includes('netlify')) {
        el.style.setProperty('display', 'none', 'important');
        try { el.remove(); } catch (e) {}
      }
    }
    const tag = el.tagName.toLowerCase();
    if (tag.includes('netlify')) {
      el.style.setProperty('display', 'none', 'important');
      try { el.remove(); } catch (e) {}
    }
  });

  // Check body children for floating badge
  if (document.body) {
    Array.from(document.body.children).forEach(child => {
      const tag = child.tagName.toLowerCase();
      if (['script', 'link', 'header', 'section', 'footer', 'aside', 'nav'].includes(tag)) {
        return;
      }
      if (
        child.id === 'lightboxModal' ||
        child.id === 'productQuickViewModal' ||
        child.id === 'prescriptionModal' ||
        child.id === 'cartDrawer' ||
        child.id === 'mobileNavDrawer' ||
        child.id === 'pagePreloader' ||
        child.id === 'scrollProgress' ||
        child.id === 'toastContainer' ||
        child.id === 'backToTopBtn'
      ) {
        return;
      }
      const text = (child.textContent || '').toLowerCase();
      if (text.includes('powered by netlify')) {
        child.style.setProperty('display', 'none', 'important');
        try { child.remove(); } catch (e) {}
      }
    });
  }
}

// Run immediately, on load, and observe dynamic DOM injections
removeNetlifyBadge();
window.addEventListener('load', removeNetlifyBadge);

if (typeof MutationObserver !== 'undefined') {
  const netlifyObserver = new MutationObserver(removeNetlifyBadge);
  if (document.body) {
    netlifyObserver.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      netlifyObserver.observe(document.body, { childList: true, subtree: true });
    });
  }
}
