# scratch/update_main_js.py
with open('js/main.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update updateLangUI
old_update_lang = """  function updateLangUI() {
    const isMr = appState.lang === 'mr';
    document.documentElement.lang = isMr ? 'mr' : 'en';

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

    renderCategories();
    renderProducts();
    renderGallery();
    renderStoreServices();
    renderFAQs();
    renderCart();
    initLiveStoreStatus();
  }"""

new_update_lang = """  function updateLangUI() {
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
  }"""

if old_update_lang in code:
    code = code.replace(old_update_lang, new_update_lang)
    print("Replaced updateLangUI successfully.")
else:
    print("WARNING: Could not find old_update_lang exact string.")

# 2. Update renderProducts
old_render_prod_vars = """    container.innerHTML = filtered.map(prod => {
      const name = isMr ? prod.nameMr : prod.name;
      const summary = isMr ? prod.summaryMr : prod.summary;
      const isInCart = appState.cart.some(item => item.id === prod.id);

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
              ${prod.badge}
            </span>
          </div>"""

new_render_prod_vars = """    container.innerHTML = filtered.map(prod => {
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
          </div>"""

if old_render_prod_vars in code:
    code = code.replace(old_render_prod_vars, new_render_prod_vars)
    print("Replaced renderProducts badge successfully.")
else:
    print("WARNING: Could not find old_render_prod_vars.")

# Replace packaging in renderProducts
old_prod_pack = """            <div class="mt-3.5 inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 border border-slate-100">
              <i class="fa-solid fa-box-open text-emerald-500"></i>
              <span>${prod.packaging}</span>
            </div>"""

new_prod_pack = """            <div class="mt-3.5 inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 border border-slate-100">
              <i class="fa-solid fa-box-open text-emerald-500"></i>
              <span>${packaging}</span>
            </div>"""

if old_prod_pack in code:
    code = code.replace(old_prod_pack, new_prod_pack)
    print("Replaced renderProducts packaging successfully.")
else:
    print("WARNING: Could not find old_prod_pack.")

# 3. Update continuous slider
old_slider_vars = """    track.innerHTML = loopedItems.map(prod => {
      const name = isMr ? prod.nameMr : prod.name;
      const summary = isMr ? prod.summaryMr : prod.summary;
      const isInCart = appState.cart.some(item => item.id === prod.id);

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
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}">
                ${prod.badge}
              </span>
            </div>"""

new_slider_vars = """    track.innerHTML = loopedItems.map(prod => {
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
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}">
                ${badge}
              </span>
            </div>"""

if old_slider_vars in code:
    code = code.replace(old_slider_vars, new_slider_vars)
    print("Replaced slider badge successfully.")
else:
    print("WARNING: Could not find old_slider_vars.")

# 4. Update openProductQuickView
old_quick_view = """      const name = isMr ? prod.nameMr : prod.name;
      const summary = isMr ? prod.summaryMr : prod.summary;
      const isInCart = appState.cart.some(i => i.id === prod.id);

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
          ${prod.badge}
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
              ${prod.features.map(f => `<li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 text-xs shrink-0"></i><span>${f}</span></li>`).join('')}
            </ul>
          </div>

          <div class="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 sm:p-3.5 mb-5 text-xs text-slate-700 space-y-1">
            <div class="font-bold text-emerald-900 flex items-center gap-1.5">
              <i class="fa-solid fa-truck-fast text-emerald-600"></i>
              <span>${STORE_CONFIG.deliveryText}</span>
            </div>
            <div class="font-medium text-slate-600 flex items-center gap-1.5">
              <i class="fa-solid fa-box text-emerald-600"></i>
              <span>${isMr ? 'उपलब्ध साईझ / पॅक:' : 'Available Size / Packaging:'} ${prod.packaging}</span>
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
            class="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2 btn-premium"
          >
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span class="whitespace-nowrap">Inquire on WhatsApp</span>
          </button>
        </div>
      </div>

    </div>
  `;"""

new_quick_view = """      const name = isMr ? prod.nameMr : prod.name;
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
            class="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2 btn-premium"
          >
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span class="whitespace-nowrap">${isMr ? 'व्हॉट्सॲपवर चौकशी करा' : 'Inquire on WhatsApp'}</span>
          </button>
        </div>
      </div>

    </div>
  `;"""

if old_quick_view in code:
    code = code.replace(old_quick_view, new_quick_view)
    print("Replaced openProductQuickView successfully.")
else:
    print("WARNING: Could not find old_quick_view.")

# 5. Update renderCart packaging
old_cart_item = """      cartList.innerHTML = appState.cart.map(item => {
        const name = isMr ? item.nameMr : item.name;
        return `
      <div class="flex items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-slate-900 truncate">${name}</div>
          <div class="text-[11px] text-slate-500 font-medium">${item.packaging}</div>
        </div>"""

new_cart_item = """      cartList.innerHTML = appState.cart.map(item => {
        const name = isMr ? item.nameMr : item.name;
        const packaging = isMr && item.packagingMr ? item.packagingMr : item.packaging;
        return `
      <div class="flex items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-slate-900 truncate">${name}</div>
          <div class="text-[11px] text-slate-500 font-medium">${packaging}</div>
        </div>"""

if old_cart_item in code:
    code = code.replace(old_cart_item, new_cart_item)
    print("Replaced renderCart packaging successfully.")
else:
    print("WARNING: Could not find old_cart_item.")

# 6. Update sendCartToWhatsApp
old_send_cart = """      appState.cart.forEach((item, index) => {
        const name = isMr ? item.nameMr : item.name;
        message += `${index + 1}. *${name}*\\n   - नग/प्रमाण: ${item.quantity}\\n   - पॅक: ${item.packaging}\\n`;
      });"""

new_send_cart = """      appState.cart.forEach((item, index) => {
        const name = isMr ? item.nameMr : item.name;
        const packaging = isMr && item.packagingMr ? item.packagingMr : item.packaging;
        message += `${index + 1}. *${name}*\\n   - ${isMr ? 'नग/प्रमाण' : 'Quantity'}: ${item.quantity}\\n   - ${isMr ? 'पॅक' : 'Packaging'}: ${packaging}\\n`;
      });"""

if old_send_cart in code:
    code = code.replace(old_send_cart, new_send_cart)
    print("Replaced sendCartToWhatsApp packaging successfully.")
else:
    print("WARNING: Could not find old_send_cart.")

# 7. Expose window.recalculateHerdSupply in initCalculator
old_calc_init = """      calculateBtn.addEventListener('click', doCalculation);
      if (cowsInput) cowsInput.addEventListener('input', doCalculation);
      if (dailyLiquidInput) dailyLiquidInput.addEventListener('input', doCalculation);
      if (dailyMineralInput) dailyMineralInput.addEventListener('input', doCalculation);
      doCalculation();
    }"""

new_calc_init = """      window.recalculateHerdSupply = doCalculation;
      calculateBtn.addEventListener('click', doCalculation);
      if (cowsInput) cowsInput.addEventListener('input', doCalculation);
      if (dailyLiquidInput) dailyLiquidInput.addEventListener('input', doCalculation);
      if (dailyMineralInput) dailyMineralInput.addEventListener('input', doCalculation);
      doCalculation();
    }"""

if old_calc_init in code:
    code = code.replace(old_calc_init, new_calc_init)
    print("Exposed recalculateHerdSupply successfully.")
else:
    print("WARNING: Could not find old_calc_init.")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved js/main.js successfully!")

