# scratch/tag_index_html.py
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacements = [
    # Preloader
    (
        '<div class="text-emerald-300 text-xs font-semibold tracking-wider mt-1 uppercase">Veterinary &amp; Dairy Healthcare\n      • Dhule</div>',
        '<div class="text-emerald-300 text-xs font-semibold tracking-wider mt-1 uppercase" data-i18n="preloaderTagline">Veterinary &amp; Dairy Healthcare • Dhule</div>'
    ),
    # Top strip location & timings
    (
        '<span class="truncate">Parola Road, Lalbaug, Dhule</span>',
        '<span class="truncate" data-i18n="topLocation">Parola Road, Lalbaug, Dhule</span>'
    ),
    (
        '<span>9:30 AM – 9:30 PM (All 7 Days)</span>',
        '<span data-i18n="topTimings">9:30 AM – 9:30 PM (All 7 Days)</span>'
    ),
    # Header Cart text
    (
        '<span class="hidden sm:inline">Order List</span>',
        '<span class="hidden sm:inline" data-i18n="orderListBtn">Order List</span>'
    ),
    # Hero badge
    (
        '<span>धुळे शहर व परिसरातील अग्रगण्य पशुवैद्यकीय औषधालय</span>',
        '<span data-i18n="heroBadge">धुळे शहर व परिसरातील अग्रगण्य पशुवैद्यकीय औषधालय</span>'
    ),
    # Hero bullets
    (
        '<span>Cow &amp; Buffalo Medicine &amp; Bolus</span>',
        '<span data-i18n="heroBulletCow">Cow &amp; Buffalo Medicine &amp; Bolus</span>'
    ),
    (
        '<span>Ergonomic Cow Rubber Mats</span>',
        '<span data-i18n="heroBulletMats">Ergonomic Cow Rubber Mats</span>'
    ),
    (
        '<span>Portable Single &amp; Double Milking Machines</span>',
        '<span data-i18n="heroBulletMilkers">Portable Single &amp; Double Milking Machines</span>'
    ),
    (
        '<span>High Potency Liquid Calcium &amp; Minerals</span>',
        '<span data-i18n="heroBulletCalcium">High Potency Liquid Calcium &amp; Minerals</span>'
    ),
    (
        '<span>Dog &amp; Cat Medicine, Food &amp; Accessories</span>',
        '<span data-i18n="heroBulletPets">Dog &amp; Cat Medicine, Food &amp; Accessories</span>'
    ),
    (
        '<span class="font-bold text-emerald-700">Free Home &amp; Farm Delivery (T&amp;C)</span>',
        '<span class="font-bold text-emerald-700" data-i18n="heroBulletDelivery">Free Home &amp; Farm Delivery (T&amp;C)</span>'
    ),
    # Hero Trust Badges
    (
        '<span>Open 9:30 AM – 9:30 PM (All 7 Days)</span>',
        '<span data-i18n="heroTrustTimings">Open 9:30 AM – 9:30 PM (All 7 Days)</span>'
    ),
    (
        '<span>3 Specialized Wings: Cattle, Pets &amp; Poultry</span>',
        '<span data-i18n="heroTrustWings">3 Specialized Wings: Cattle, Pets &amp; Poultry</span>'
    ),
    (
        '<span>Dhule Farm Delivery (T&amp;C)</span>',
        '<span data-i18n="heroTrustDelivery">Dhule Farm Delivery (T&amp;C)</span>'
    ),
    (
        '<span>Prescription-Based Dispensing</span>',
        '<span data-i18n="heroTrustRx">Prescription-Based Dispensing</span>'
    ),
    # Right Hero Card
    (
        '<span\n                    class="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500 text-white mb-1.5 inline-block">\n                    Official Store Creative\n                  </span>',
        '<span class="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500 text-white mb-1.5 inline-block" data-i18n="heroCardBadge">Official Store Creative</span>'
    ),
    (
        '<h3 class="font-black text-lg text-white">\n                    New Seven Pharma • Dhule\n                  </h3>',
        '<h3 class="font-black text-lg text-white" data-i18n="heroCardTitle">New Seven Pharma • Dhule</h3>'
    ),
    (
        '<p class="text-xs text-slate-300 mt-0.5">\n                    Medicines • Cow Matt • Milking Machine • Dog &amp; Cat Accessories\n                  </p>',
        '<p class="text-xs text-slate-300 mt-0.5" data-i18n="heroCardDesc">Medicines • Cow Matt • Milking Machine • Dog &amp; Cat Accessories</p>'
    ),
    (
        '<i class="fa-solid fa-expand mr-1 text-emerald-600"></i> Zoom',
        '<i class="fa-solid fa-expand mr-1 text-emerald-600"></i> <span data-i18n="heroCardZoom">Zoom</span>'
    ),
    (
        '<div class="font-extrabold text-slate-900">Abhishek Relan &amp; Ranjan Relan</div>\n                  <div class="text-slate-500">Proprietors • New Seven Pharma</div>',
        '<div class="font-extrabold text-slate-900" data-i18n="heroCardProprietors">Abhishek Relan &amp; Ranjan Relan</div>\n                  <div class="text-slate-500" data-i18n="heroCardProprietorsLabel">Proprietors • New Seven Pharma</div>'
    ),
    (
        '<div class="font-extrabold text-emerald-600">9:30 AM – 9:30 PM</div>\n                  <div class="text-slate-500">Monday to Sunday</div>',
        '<div class="font-extrabold text-emerald-600" data-i18n="highlightTimingTitle">9:30 AM – 9:30 PM</div>\n                  <div class="text-slate-500" data-i18n="heroCardDays">Monday to Sunday</div>'
    ),
    (
        '<div class="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Store Service</div>\n                <div class="text-xs font-black">Farm Delivery (T&amp;C)</div>',
        '<div class="text-[10px] font-bold uppercase tracking-wider text-emerald-100" data-i18n="heroCardServiceTag">Store Service</div>\n                <div class="text-xs font-black" data-i18n="heroCardDelivery">Farm Delivery (T&amp;C)</div>'
    ),
    (
        '<div class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Veterinary Center</div>\n                <div class="text-xs font-black">Lalbaug, Dhule</div>',
        '<div class="text-[10px] font-bold uppercase tracking-wider text-slate-400" data-i18n="heroCardCenterTag">Veterinary Center</div>\n                <div class="text-xs font-black" data-i18n="heroCardLocation">Lalbaug, Dhule</div>'
    ),
    # 4 Highlights Cards
    (
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight">9:30 AM – 9:30 PM</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5">All 7 Days Open (365 Days)</div>',
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight" data-i18n="highlightTimingTitle">9:30 AM – 9:30 PM</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5" data-i18n="highlightTimingSub">All 7 Days Open (365 Days)</div>'
    ),
    (
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight">Free Farm Delivery</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5">Across Dhule Area (T&amp;C)</div>',
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight" data-i18n="highlightDeliveryTitle">Free Farm Delivery</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5" data-i18n="highlightDeliverySub">Across Dhule Area (T&amp;C)</div>'
    ),
    (
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight">100% Genuine Pharma</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5">Bolus, Injections, Tonics &amp; Feed</div>',
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight" data-i18n="highlightPharmaTitle">100% Genuine Pharma</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5" data-i18n="highlightPharmaSub">Bolus, Injections, Tonics &amp; Feed</div>'
    ),
    (
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight">Dairy &amp; Pet Range</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5">Mats, Milkers, Food &amp; Meds</div>',
        '<div class="font-black text-slate-900 text-sm sm:text-base leading-tight" data-i18n="highlightRangeTitle">Dairy &amp; Pet Range</div>\n            <div class="text-[11px] text-slate-500 font-medium mt-0.5" data-i18n="highlightRangeSub">Mats, Milkers, Food &amp; Meds</div>'
    ),
    # Chat on WhatsApp
    (
        '<i class="fa-brands fa-whatsapp text-emerald-400 text-base"></i>\n            <span>Chat on WhatsApp</span>',
        '<i class="fa-brands fa-whatsapp text-emerald-400 text-base"></i>\n            <span data-i18n="quickOrderChatWhatsapp">Chat on WhatsApp</span>'
    ),
    # Core Specializations Section
    (
        '<span\n          class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">\n          Our Core Specializations\n        </span>\n        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">\n          Specialized Healthcare &amp; Farm Equipment\n        </h2>\n        <p class="text-xs sm:text-sm text-slate-500 mt-2">\n          Tailored solutions for dairy entrepreneurs, progressive farmers, veterinary clinics, and pet parents.\n        </p>',
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200" data-i18n="specBadge">Our Core Specializations</span>\n        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2" data-i18n="specTitle">Specialized Healthcare &amp; Farm Equipment</h2>\n        <p class="text-xs sm:text-sm text-slate-500 mt-2" data-i18n="specDesc">Tailored solutions for dairy entrepreneurs, progressive farmers, veterinary clinics, and pet parents.</p>'
    ),
    # Dairy Wing
    (
        '<h3 class="text-xl font-black text-slate-900 mb-1.5">\n              Dairy Cattle &amp; Buffalo Care\n            </h3>\n            <p class="text-xs font-bold text-emerald-700 mb-3">\n              गाई-म्हशींचे औषधे, रबरी मॅट, मिल्किंग मशीन व कॅल्शियम\n            </p>\n            <p class="text-xs text-slate-600 leading-relaxed mb-6">\n              Complete range of therapeutic drugs for mastitis, fever, digestive bloat, and reproductive health.\n              High-traction ergonomic rubber mats and durable electric milking machines with full spare parts support.\n            </p>\n            <ul class="text-xs text-slate-700 space-y-2 mb-6">\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> 22mm\n                Diamond-Grip Cow Rubber Mats</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> Single &amp;\n                Double Bucket Milking Machines</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> Chelated\n                Mineral Mixture &amp; Liquid Calcium</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> Deworming\n                Bolus &amp; Milk Fever Gels</li>\n            </ul>\n          </div>\n          <button onclick="setCategory(\'equipment\')"\n            class="w-full py-2.5 rounded-xl bg-white border border-slate-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs btn-lift">\n            <span>Explore Dairy Products</span>\n            <i class="fa-solid fa-arrow-right text-xs"></i>\n          </button>',
        '<h3 class="text-xl font-black text-slate-900 mb-1.5" data-i18n="wingDairyTitle">Dairy Cattle &amp; Buffalo Care</h3>\n            <p class="text-xs font-bold text-emerald-700 mb-3" data-i18n="wingDairyTagline">गाई-म्हशींचे औषधे, रबरी मॅट, मिल्किंग मशीन व कॅल्शियम</p>\n            <p class="text-xs text-slate-600 leading-relaxed mb-6" data-i18n="wingDairyDesc">Complete range of therapeutic drugs for mastitis, fever, digestive bloat, and reproductive health. High-traction ergonomic rubber mats and durable electric milking machines with full spare parts support.</p>\n            <ul class="text-xs text-slate-700 space-y-2 mb-6">\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> <span data-i18n="wingDairyBullet1">22mm Diamond-Grip Cow Rubber Mats</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> <span data-i18n="wingDairyBullet2">Single &amp; Double Bucket Milking Machines</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> <span data-i18n="wingDairyBullet3">Chelated Mineral Mixture &amp; Liquid Calcium</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-600"></i> <span data-i18n="wingDairyBullet4">Deworming Bolus &amp; Milk Fever Gels</span></li>\n            </ul>\n          </div>\n          <button onclick="setCategory(\'equipment\')"\n            class="w-full py-2.5 rounded-xl bg-white border border-slate-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs btn-lift">\n            <span data-i18n="wingDairyBtn">Explore Dairy Products</span>\n            <i class="fa-solid fa-arrow-right text-xs"></i>\n          </button>'
    ),
    # Pets Wing
    (
        '<h3 class="text-xl font-black text-slate-900 mb-1.5">\n              Dog &amp; Cat Health &amp; Accessories\n            </h3>\n            <p class="text-xs font-bold text-sky-700 mb-3">\n              कुत्रे व मांजरांचे औषधे, आहार व सर्व प्रकारच्या ॲक्सेसरीज\n            </p>\n            <p class="text-xs text-slate-600 leading-relaxed mb-6">\n              Dhule\'s premier pet care pharmacy. From fast-acting anti-tick and flea spot-on drops, puppy vaccines, and\n              medicated shampoos to premium dog food brands (Drools, Pedigree, Royal Canin) and durable leashes,\n              collars, and harnesses.\n            </p>\n            <ul class="text-xs text-slate-700 space-y-2 mb-6">\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> Fipronil\n                Anti-Tick Sprays &amp; Soaps</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> Puppy &amp;\n                Adult Dog Food Bags</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> Padded\n                Harnesses, Collars &amp; Leashes</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> Cat Food, Syrups\n                &amp; Grooming Brushes</li>\n            </ul>\n          </div>\n          <button onclick="setCategory(\'pets\')"\n            class="w-full py-2.5 rounded-xl bg-white border border-slate-300 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs btn-lift">\n            <span>Explore Pet Care</span>\n            <i class="fa-solid fa-arrow-right text-xs"></i>\n          </button>',
        '<h3 class="text-xl font-black text-slate-900 mb-1.5" data-i18n="wingPetsTitle">Dog &amp; Cat Health &amp; Accessories</h3>\n            <p class="text-xs font-bold text-sky-700 mb-3" data-i18n="wingPetsTagline">कुत्रे व मांजरांचे औषधे, आहार व सर्व प्रकारच्या ॲक्सेसरीज</p>\n            <p class="text-xs text-slate-600 leading-relaxed mb-6" data-i18n="wingPetsDesc">Dhule\'s premier pet care pharmacy. From fast-acting anti-tick and flea spot-on drops, puppy vaccines, and medicated shampoos to premium dog food brands (Drools, Pedigree, Royal Canin) and durable leashes, collars, and harnesses.</p>\n            <ul class="text-xs text-slate-700 space-y-2 mb-6">\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> <span data-i18n="wingPetsBullet1">Fipronil Anti-Tick Sprays &amp; Soaps</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> <span data-i18n="wingPetsBullet2">Puppy &amp; Adult Dog Food Bags</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> <span data-i18n="wingPetsBullet3">Padded Harnesses, Collars &amp; Leashes</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-sky-600"></i> <span data-i18n="wingPetsBullet4">Cat Food, Syrups &amp; Grooming Brushes</span></li>\n            </ul>\n          </div>\n          <button onclick="setCategory(\'pets\')"\n            class="w-full py-2.5 rounded-xl bg-white border border-slate-300 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs btn-lift">\n            <span data-i18n="wingPetsBtn">Explore Pet Care</span>\n            <i class="fa-solid fa-arrow-right text-xs"></i>\n          </button>'
    ),
    # Poultry Wing
    (
        '<h3 class="text-xl font-black text-slate-900 mb-1.5">\n              Poultry Healthcare &amp; Growth\n            </h3>\n            <p class="text-xs font-bold text-amber-700 mb-3">\n              कुक्कुटपालन / पोल्ट्री औषधे, लिव्हर टॉनिक व व्हिटॅमिन्स\n            </p>\n            <p class="text-xs text-slate-600 leading-relaxed mb-6">\n              Targeted supplements for commercial broilers, layer flocks, and local desi poultry. Proven formulations\n              for rapid FCR weight gain, liver protection from toxins, heat stroke management, and strong egg shell\n              formation.\n            </p>\n            <ul class="text-xs text-slate-700 space-y-2 mb-6">\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> Broiler Liver\n                Tonics &amp; Amino Acids</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> Vitamin AD3E\n                &amp; Anti-Stress Electrolytes</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> Coccidiosis\n                &amp; Respiratory Tonics</li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> Water\n                Sanitizers &amp; Disinfectants</li>\n            </ul>\n          </div>\n          <button onclick="setCategory(\'poultry\')"\n            class="w-full py-2.5 rounded-xl bg-white border border-slate-300 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs btn-lift">\n            <span>Explore Poultry Items</span>\n            <i class="fa-solid fa-arrow-right text-xs"></i>\n          </button>',
        '<h3 class="text-xl font-black text-slate-900 mb-1.5" data-i18n="wingPoultryTitle">Poultry Healthcare &amp; Growth</h3>\n            <p class="text-xs font-bold text-amber-700 mb-3" data-i18n="wingPoultryTagline">कुक्कुटपालन / पोल्ट्री औषधे, लिव्हर टॉनिक व व्हिटॅमिन्स</p>\n            <p class="text-xs text-slate-600 leading-relaxed mb-6" data-i18n="wingPoultryDesc">Targeted supplements for commercial broilers, layer flocks, and local desi poultry. Proven formulations for rapid FCR weight gain, liver protection from toxins, heat stroke management, and strong egg shell formation.</p>\n            <ul class="text-xs text-slate-700 space-y-2 mb-6">\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> <span data-i18n="wingPoultryBullet1">Broiler Liver Tonics &amp; Amino Acids</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> <span data-i18n="wingPoultryBullet2">Vitamin AD3E &amp; Anti-Stress Electrolytes</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> <span data-i18n="wingPoultryBullet3">Coccidiosis &amp; Respiratory Tonics</span></li>\n              <li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-amber-600"></i> <span data-i18n="wingPoultryBullet4">Water Sanitizers &amp; Disinfectants</span></li>\n            </ul>\n          </div>\n          <button onclick="setCategory(\'poultry\')"\n            class="w-full py-2.5 rounded-xl bg-white border border-slate-300 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs btn-lift">\n            <span data-i18n="wingPoultryBtn">Explore Poultry Items</span>\n            <i class="fa-solid fa-arrow-right text-xs"></i>\n          </button>'
    ),
    # Catalog section header
    (
        '<span\n            class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">\n            Interactive Catalog &amp; WhatsApp Order\n          </span>\n          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2">\n            Featured Medicines, Equipment &amp; Supplies\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-500 mt-1">\n            Browse our ready stock or click any product to send an instant order to our WhatsApp.\n          </p>',
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200" data-i18n="catalogBadge">Interactive Catalog &amp; WhatsApp Order</span>\n          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2" data-i18n="catalogTitle">Featured Medicines, Equipment &amp; Supplies</h2>\n          <p class="text-xs sm:text-sm text-slate-500 mt-1" data-i18n="catalogSubtitle">Browse our ready stock or click any product to send an instant order to our WhatsApp.</p>'
    ),
    (
        '<span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">\n            16 Ready-Stock Items • 365 Days\n          </span>',
        '<span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200" data-i18n="catalogReadyStockBadge">16 Ready-Stock Items • 365 Days</span>'
    ),
    (
        '<button type="button" onclick="resetSearchAndFilter()"\n            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded"\n            title="Clear search">\n            Clear\n          </button>',
        '<button type="button" onclick="resetSearchAndFilter()"\n            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded"\n            title="Clear search" data-i18n="catalogClearSearch">Clear</button>'
    ),
    # Calculator section
    (
        '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold text-emerald-100 mb-2">\n            <i class="fa-solid fa-calculator"></i>\n            <span>Herd Supply Planning Aid</span>\n          </div>',
        '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold text-emerald-100 mb-2">\n            <i class="fa-solid fa-calculator"></i>\n            <span data-i18n="calcBadge">Herd Supply Planning Aid</span>\n          </div>'
    ),
    (
        '<p class="text-[10px] text-slate-500 mt-1">Adjust per manufacturer label or veterinary guideline (typical range: 50-100ml).</p>',
        '<p class="text-[10px] text-slate-500 mt-1" data-i18n="calcCalciumHelper">Adjust per manufacturer label or veterinary guideline (typical range: 50-100ml).</p>'
    ),
    (
        '<p class="text-[10px] text-slate-500 mt-1">Adjust per manufacturer label or feed regimen (typical range: 30-50g).</p>',
        '<p class="text-[10px] text-slate-500 mt-1" data-i18n="calcMineralsHelper">Adjust per manufacturer label or feed regimen (typical range: 30-50g).</p>'
    ),
    (
        '<div class="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">\n                  Estimated Monthly Farm Usage:\n                </div>',
        '<div class="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200" data-i18n="calcMonthlyUsageHeading">Estimated Monthly Farm Usage:</div>'
    ),
    (
        '<div class="pt-2 border-t border-amber-200/60 text-[10px] text-amber-800/80 italic">\n                  सूचना: हे कॅल्क्युलेटर केवळ गोठा व्यवस्थापन व साहित्याच्या अंदाजे मागणी नियोजनासाठी आहे. जनावरांच्या प्रत्यक्ष गरजेनुसार व डॉक्टरांच्या सल्ल्यानुसार डोस बदलू शकतो.\n                </div>',
        '<div class="pt-2 border-t border-amber-200/60 text-[10px] text-amber-800/80 italic" data-i18n="calcMarathiNotice">सूचना: हे कॅल्क्युलेटर केवळ गोठा व्यवस्थापन व साहित्याच्या अंदाजे मागणी नियोजनासाठी आहे. जनावरांच्या प्रत्यक्ष गरजेनुसार व डॉक्टरांच्या सल्ल्यानुसार डोस बदलू शकतो.</div>'
    ),
    # Gallery badge
    (
        '<span\n          class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">\n          Official Documents &amp; Notices\n        </span>',
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800" data-i18n="galleryBadge">Official Documents &amp; Notices</span>'
    ),
    # Services badge
    (
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">\n          Store Services &amp; Guidance\n        </span>',
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200" data-i18n="servicesBadge">Store Services &amp; Guidance</span>'
    ),
    # Contact section
    (
        '<span\n            class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">\n            Visit Us in Dhule\n          </span>\n          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2" data-i18n="contactHeading">\n            Store Location &amp; Timings\n          </h2>\n          <p class="text-xs sm:text-sm text-slate-500 mt-1">\n            Easily accessible on Parola Road, Lalbaug, Dhule with convenient parking and farm delivery dispatch.\n          </p>',
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200" data-i18n="contactBadge">Visit Us in Dhule</span>\n          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-2" data-i18n="contactHeading">Store Location &amp; Timings</h2>\n          <p class="text-xs sm:text-sm text-slate-500 mt-1" data-i18n="contactSubtitle">Easily accessible on Parola Road, Lalbaug, Dhule with convenient parking and farm delivery dispatch.</p>'
    ),
    (
        '<p class="text-xs text-slate-500 font-semibold">Seven Chemist Bhavan • Lalbaug, Dhule</p>',
        '<p class="text-xs text-slate-500 font-semibold" data-i18n="contactStoreBuilding">Seven Chemist Bhavan • Lalbaug, Dhule</p>'
    ),
    (
        '<p class="font-bold text-slate-900">First Floor, Seven Chemist Bhavan,</p>\n                <p>Near Modraj Hotel, Old Municipal Corporation (जुनी महानगरपालिका),</p>\n                <p>Parola Road, Lalbaug, Dhule, Maharashtra – 424001</p>\n                <p class="text-slate-500 italic mt-1 font-medium">Landmark: मोदराज हॉटेल जवळ, जुनी महानगरपालिका, धुळे</p>',
        '<p class="font-bold text-slate-900" data-i18n="contactAddrLine1">First Floor, Seven Chemist Bhavan,</p>\n                <p data-i18n="contactAddrLine2">Near Modraj Hotel, Old Municipal Corporation (जुनी महानगरपालिका),</p>\n                <p data-i18n="contactAddrLine3">Parola Road, Lalbaug, Dhule, Maharashtra – 424001</p>\n                <p class="text-slate-500 italic mt-1 font-medium" data-i18n="contactLandmark">Landmark: मोदराज हॉटेल जवळ, जुनी महानगरपालिका, धुळे</p>'
    ),
    (
        '<i class="fa-solid fa-location-arrow text-emerald-400"></i>\n                <span>Open in Google Maps (Get Directions)</span>',
        '<i class="fa-solid fa-location-arrow text-emerald-400"></i>\n                <span data-i18n="contactMapBtn">Open in Google Maps (Get Directions)</span>'
    ),
    (
        '<i class="fa-regular fa-clock text-emerald-600 text-base"></i>\n                  <span>Store Operating Timings</span>\n                </div>\n                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">\n                  No Weekly Off\n                </span>',
        '<i class="fa-regular fa-clock text-emerald-600 text-base"></i>\n                  <span data-i18n="contactTimingsTitle">Store Operating Timings</span>\n                </div>\n                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800" data-i18n="contactNoWeeklyOff">No Weekly Off</span>'
    ),
    (
        '<span class="text-slate-600 font-medium">Monday to Sunday:</span>',
        '<span class="text-slate-600 font-medium" data-i18n="contactDaysLabel">Monday to Sunday:</span>'
    ),
    (
        '<span>Total Hours:</span>\n                  <span>12 Hours Open Daily (365 Days)</span>',
        '<span data-i18n="contactTotalHoursLabel">Total Hours:</span>\n                  <span data-i18n="contactTotalHoursVal">12 Hours Open Daily (365 Days)</span>'
    ),
    (
        '<i class="fa-solid fa-id-card text-emerald-600 text-base"></i>\n                  <span>Official Store Visiting Card</span>\n                </div>\n                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">\n                  Verified Identity\n                </span>\n              </div>\n              <p class="text-xs text-slate-500">\n                New Seven Pharma (NSP Veterinary Supplier • Medicool) official business card with verified contacts and location.\n              </p>',
        '<i class="fa-solid fa-id-card text-emerald-600 text-base"></i>\n                  <span data-i18n="visitingCardTitle">Official Store Visiting Card</span>\n                </div>\n                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800" data-i18n="visitingCardBadge">Verified Identity</span>\n              </div>\n              <p class="text-xs text-slate-500" data-i18n="visitingCardDesc">New Seven Pharma (NSP Veterinary Supplier • Medicool) official business card with verified contacts and location.</p>'
    ),
    (
        '<i class="fa-solid fa-up-right-and-down-left-from-center text-emerald-400"></i>\n                  <span>Click to Enlarge Full Card</span>',
        '<i class="fa-solid fa-up-right-and-down-left-from-center text-emerald-400"></i>\n                  <span data-i18n="visitingCardEnlarge">Click to Enlarge Full Card</span>'
    ),
    (
        '<span>Proprietors: <strong>Abhishek Relan &amp; Ranjan Relan</strong></span>\n                <span class="text-emerald-700 font-semibold">Dhule, Maharashtra</span>',
        '<span><span data-i18n="visitingCardProprietors">Proprietors:</span> <strong data-i18n="heroCardProprietors">Abhishek Relan &amp; Ranjan Relan</strong></span>\n                <span class="text-emerald-700 font-semibold" data-i18n="visitingCardCity">Dhule, Maharashtra</span>'
    ),
    (
        '<h4 class="font-extrabold text-slate-900 text-xs">Verified Justdial Listing</h4>\n                  <p class="text-[11px] text-slate-500">New Seven Pharma on Justdial Dhule</p>\n                </div>\n              </div>\n              <a href="https://jsdl.in/DT-99LS9XKHNWV" target="_blank" rel="noopener"\n                class="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition shadow-xs shrink-0 btn-lift">\n                View Listing <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[10px]"></i>\n              </a>',
        '<h4 class="font-extrabold text-slate-900 text-xs" data-i18n="justdialTitle">Verified Justdial Listing</h4>\n                  <p class="text-[11px] text-slate-500" data-i18n="justdialDesc">New Seven Pharma on Justdial Dhule</p>\n                </div>\n              </div>\n              <a href="https://jsdl.in/DT-99LS9XKHNWV" target="_blank" rel="noopener"\n                class="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition shadow-xs shrink-0 btn-lift">\n                <span data-i18n="justdialBtn">View Listing</span> <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[10px]"></i>\n              </a>'
    ),
    (
        '<span class="font-bold">Google Map Location: New Seven Pharma, Lalbaug, Dhule</span>',
        '<span class="font-bold" data-i18n="mapCardTitle">Google Map Location: New Seven Pharma, Lalbaug, Dhule</span>'
    ),
    (
        '<span>Full Screen</span>\n                <i class="fa-solid fa-external-link text-[10px]"></i>',
        '<span data-i18n="mapFullScreen">Full Screen</span>\n                <i class="fa-solid fa-external-link text-[10px]"></i>'
    ),
    # FAQs
    (
        '<span\n            class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">\n            Got Questions?\n          </span>',
        '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200" data-i18n="faqBadge">Got Questions?</span>'
    ),
    # Footer
    (
        '<div class="text-[11px] text-emerald-400 font-semibold">न्यू सेव्हन फार्मा • धुळे</div>',
        '<div class="text-[11px] text-emerald-400 font-semibold" data-i18n="footerBrandTagline">न्यू सेव्हन फार्मा • धुळे</div>'
    ),
    (
        '<li><a href="#hero" class="hover:text-emerald-400 transition">Home</a></li>',
        '<li><a href="#hero" class="hover:text-emerald-400 transition" data-i18n="navHome">Home</a></li>'
    ),
    (
        '<li><a href="#products" class="hover:text-emerald-400 transition">Products &amp; Equipment</a></li>',
        '<li><a href="#products" class="hover:text-emerald-400 transition" data-i18n="navProducts">Products &amp; Equipment</a></li>'
    ),
    (
        '<li><a href="#dairy-focus" class="hover:text-emerald-400 transition">Cow &amp; Buffalo Solutions</a></li>',
        '<li><a href="#dairy-focus" class="hover:text-emerald-400 transition" data-i18n="wingDairyTitle">Cow &amp; Buffalo Solutions</a></li>'
    ),
    (
        '<li><a href="#pets-focus" class="hover:text-emerald-400 transition">Dog &amp; Cat Care</a></li>',
        '<li><a href="#pets-focus" class="hover:text-emerald-400 transition" data-i18n="wingPetsTitle">Dog &amp; Cat Care</a></li>'
    ),
    (
        '<li><a href="#poultry-focus" class="hover:text-emerald-400 transition">Poultry Medicine</a></li>',
        '<li><a href="#poultry-focus" class="hover:text-emerald-400 transition" data-i18n="wingPoultryTitle">Poultry Medicine</a></li>'
    ),
    (
        '<li><a href="#calculator" class="hover:text-emerald-400 transition">Milk Yield Calculator</a></li>',
        '<li><a href="#calculator" class="hover:text-emerald-400 transition" data-i18n="navCalculator">Supplement Estimator</a></li>'
    ),
    (
        '<h4 class="text-white font-black text-sm">Offerings</h4>',
        '<h4 class="text-white font-black text-sm" data-i18n="footerOfferingsHeading">Offerings</h4>'
    ),
    (
        '<li><a href="#products" onclick="setCategory(\'equipment\')" class="hover:text-emerald-400 transition">Cow\n                  Rubber Mats</a></li>',
        '<li><a href="#products" onclick="setCategory(\'equipment\')" class="hover:text-emerald-400 transition" data-i18n="footerLinkMats">Cow Rubber Mats</a></li>'
    ),
    (
        '<li><a href="#products" onclick="setCategory(\'equipment\')"\n                  class="hover:text-emerald-400 transition">Milking Machines</a></li>',
        '<li><a href="#products" onclick="setCategory(\'equipment\')" class="hover:text-emerald-400 transition" data-i18n="footerLinkMilkers">Milking Machines</a></li>'
    ),
    (
        '<li><a href="#products" onclick="setCategory(\'nutrition\')"\n                  class="hover:text-emerald-400 transition">Chelated Mineral Mixture</a></li>',
        '<li><a href="#products" onclick="setCategory(\'nutrition\')" class="hover:text-emerald-400 transition" data-i18n="footerLinkMinerals">Chelated Mineral Mixture</a></li>'
    ),
    (
        '<li><a href="#products" onclick="setCategory(\'nutrition\')"\n                  class="hover:text-emerald-400 transition">Liquid Calcium Cans</a></li>',
        '<li><a href="#products" onclick="setCategory(\'nutrition\')" class="hover:text-emerald-400 transition" data-i18n="footerLinkCalcium">Liquid Calcium Cans</a></li>'
    ),
    (
        '<li><a href="#products" onclick="setCategory(\'pets\')" class="hover:text-emerald-400 transition">Anti-Tick\n                  Sprays &amp; Collars</a></li>',
        '<li><a href="#products" onclick="setCategory(\'pets\')" class="hover:text-emerald-400 transition" data-i18n="footerLinkTicks">Anti-Tick Sprays &amp; Collars</a></li>'
    ),
    (
        '<li><a href="#products" onclick="setCategory(\'poultry\')" class="hover:text-emerald-400 transition">Poultry\n                  Liver Tonics</a></li>',
        '<li><a href="#products" onclick="setCategory(\'poultry\')" class="hover:text-emerald-400 transition" data-i18n="footerLinkPoultry">Poultry Liver Tonics</a></li>'
    ),
    (
        '<h4 class="text-white font-black text-sm">Store Contact</h4>',
        '<h4 class="text-white font-black text-sm" data-i18n="footerContactHeading">Store Contact</h4>'
    ),
    (
        '<p class="text-white font-bold">Abhishek Relan &amp; Ranjan Relan</p>',
        '<p class="text-white font-bold" data-i18n="heroCardProprietors">Abhishek Relan &amp; Ranjan Relan</p>'
    ),
    (
        '<p>First Floor, Seven Chemist Bhavan, Near Modraj Hotel, Old Municipal Corporation (जुनी महानगरपालिका), Parola Road, Lalbaug, Dhule - 424001</p>',
        '<p data-i18n="contactAddrLine1">First Floor, Seven Chemist Bhavan,</p>\n              <p data-i18n="contactAddrLine2">Near Modraj Hotel, Old Municipal Corporation (जुनी महानगरपालिका),</p>\n              <p data-i18n="contactAddrLine3">Parola Road, Lalbaug, Dhule - 424001</p>'
    ),
    (
        '<p class="text-yellow-300 font-semibold">9:30 AM to 9:30 PM (All 7 Days)</p>',
        '<p class="text-yellow-300 font-semibold" data-i18n="footerTimingText">9:30 AM to 9:30 PM (All 7 Days)</p>'
    ),
    (
        '&copy; 2026 New Seven Pharma (Dhule). All rights reserved.',
        '<span data-i18n="footerCopyright">&copy; 2026 New Seven Pharma (Dhule). All rights reserved.</span>'
    ),
    (
        '<span>Serving Animal Health &amp; Dairy Prosperity</span>',
        '<span data-i18n="footerServingNotice">Serving Animal Health &amp; Dairy Prosperity</span>'
    ),
    (
        '<a href="#hero" class="hover:text-emerald-400 transition">Back to Top ↑</a>',
        '<a href="#hero" class="hover:text-emerald-400 transition" data-i18n="footerBackToTop">Back to Top ↑</a>'
    ),
    # Mobile sticky bottom bar
    (
        '<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 text-sm">\n          <i class="fa-solid fa-phone"></i>\n        </div>\n        <span>Call Now</span>',
        '<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 text-sm">\n          <i class="fa-solid fa-phone"></i>\n        </div>\n        <span data-i18n="mobileBarCall">Call Now</span>'
    ),
    (
        '<div\n          class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm shadow-md shadow-emerald-500/30">\n          <i class="fa-brands fa-whatsapp text-base"></i>\n        </div>\n        <span>WhatsApp</span>',
        '<div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm shadow-md shadow-emerald-500/30">\n          <i class="fa-brands fa-whatsapp text-base"></i>\n        </div>\n        <span data-i18n="mobileBarWhatsapp">WhatsApp</span>'
    ),
    (
        '<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 text-sm">\n          <i class="fa-solid fa-cart-shopping"></i>\n        </div>\n        <span>Order List</span>',
        '<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 text-sm">\n          <i class="fa-solid fa-cart-shopping"></i>\n        </div>\n        <span data-i18n="mobileBarOrderList">Order List</span>'
    ),
    (
        '<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-rose-500 text-sm">\n          <i class="fa-solid fa-location-dot"></i>\n        </div>\n        <span>Directions</span>',
        '<div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-rose-500 text-sm">\n          <i class="fa-solid fa-location-dot"></i>\n        </div>\n        <span data-i18n="mobileBarDirections">Directions</span>'
    ),
    # Cart Drawer
    (
        '<p class="text-[11px] text-emerald-400 font-semibold">New Seven Pharma • Direct Dispatch</p>',
        '<p class="text-[11px] text-emerald-400 font-semibold" data-i18n="cartDrawerSubtitle">New Seven Pharma • Direct Dispatch</p>'
    ),
    (
        '<label for="cartCustomerNotes" class="block text-[11px] font-bold text-slate-600 uppercase mb-1">\n            Special Notes / Farm Delivery Address:\n          </label>\n          <textarea id="cartCustomerNotes" rows="2"\n            placeholder="e.g. Please deliver to farm near Deopur, Dhule. Need urgent delivery."',
        '<label for="cartCustomerNotes" class="block text-[11px] font-bold text-slate-600 uppercase mb-1" data-i18n="cartNotesLabel">Special Notes / Farm Delivery Address:</label>\n          <textarea id="cartCustomerNotes" rows="2"\n            placeholder="e.g. Please deliver to farm near Deopur, Dhule. Need urgent delivery." data-i18n-placeholder="cartNotesPlaceholder"'
    ),
    (
        '<p class="text-[10px] text-center text-slate-500">\n          Free home/farm delivery available across Dhule city area (T&amp;C apply).\n        </p>',
        '<p class="text-[10px] text-center text-slate-500" data-i18n="cartDeliveryNotice">Free home/farm delivery available across Dhule city area (T&amp;C apply).</p>'
    ),
    # Prescription Modal
    (
        '<h3 id="prescModalTitle" class="font-black text-base text-slate-900 leading-tight">Send Prescription Photo</h3>\n          <p class="text-xs text-slate-500">Order medicines directly on WhatsApp</p>',
        '<h3 id="prescModalTitle" class="font-black text-base text-slate-900 leading-tight" data-i18n="prescModalHeading">Send Prescription Photo</h3>\n          <p class="text-xs text-slate-500" data-i18n="prescModalSubtitle">Order medicines directly on WhatsApp</p>'
    ),
    (
        '<label for="prescName" class="block font-bold text-slate-700 mb-1">Your Name (नाव):</label>\n          <input type="text" id="prescName" required placeholder="e.g. Ramesh Patil"',
        '<label for="prescName" class="block font-bold text-slate-700 mb-1" data-i18n="prescNameLabel">Your Full Name:</label>\n          <input type="text" id="prescName" required placeholder="e.g. Ramesh Patil" data-i18n-placeholder="prescNamePlaceholder"'
    ),
    (
        '<label for="prescPhone" class="block font-bold text-slate-700 mb-1">Mobile Number (फोन नंबर):</label>\n          <input type="tel" id="prescPhone" required placeholder="e.g. 9876543210"',
        '<label for="prescPhone" class="block font-bold text-slate-700 mb-1" data-i18n="prescPhoneLabel">Mobile Number:</label>\n          <input type="tel" id="prescPhone" required placeholder="e.g. 9876543210" data-i18n-placeholder="prescPhonePlaceholder"'
    ),
    (
        '<label for="prescVillage" class="block font-bold text-slate-700 mb-1">Village / Address (गाव किंवा पत्ता):</label>\n          <input type="text" id="prescVillage" placeholder="e.g. Lalbaug / Deopur, Dhule"',
        '<label for="prescVillage" class="block font-bold text-slate-700 mb-1" data-i18n="prescVillageLabel">Village / Town / Address:</label>\n          <input type="text" id="prescVillage" placeholder="e.g. Lalbaug / Deopur, Dhule" data-i18n-placeholder="prescVillagePlaceholder"'
    ),
    (
        '<label for="prescNotes" class="block font-bold text-slate-700 mb-1">Medicine Notes / Animal Type:</label>\n          <textarea id="prescNotes" rows="2" placeholder="e.g. Need mastitis treatment and calcium for 2 cows"',
        '<label for="prescNotes" class="block font-bold text-slate-700 mb-1" data-i18n="prescNotesLabel">Medicine Notes / Animal Type:</label>\n          <textarea id="prescNotes" rows="2" placeholder="e.g. Need mastitis treatment and calcium for 2 cows" data-i18n-placeholder="prescNotesPlaceholder"'
    ),
    (
        '<label class="block font-bold text-slate-700 mb-1">Select Prescription Photo (ऐच्छिक):</label>\n          <input type="file" id="prescFile" accept="image/*,.pdf" class="hidden" />\n          <button type="button" onclick="document.getElementById(\'prescFile\').click()" class="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition">\n            <i class="fa-solid fa-camera text-emerald-600"></i>\n            <span>Choose / Capture Photo</span>\n          </button>',
        '<label class="block font-bold text-slate-700 mb-1" data-i18n="prescFileLabel">Select Prescription Photo (Optional):</label>\n          <input type="file" id="prescFile" accept="image/*,.pdf" class="hidden" />\n          <button type="button" onclick="document.getElementById(\'prescFile\').click()" class="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition">\n            <i class="fa-solid fa-camera text-emerald-600"></i>\n            <span data-i18n="prescFileBtn">Choose / Capture Photo</span>\n          </button>'
    ),
    (
        '<p class="text-[10px] text-emerald-600 font-semibold">Ready for WhatsApp chat</p>',
        '<p class="text-[10px] text-emerald-600 font-semibold" data-i18n="prescFileReady">Ready for WhatsApp chat</p>'
    ),
    (
        '<span>Submitting opens WhatsApp with your patient details. If you have selected a photo, simply attach it in the chat window via WhatsApp\'s paperclip or camera icon!</span>',
        '<span data-i18n="prescHandoffNotice">Submitting opens WhatsApp with your patient details. If you have selected a photo, simply attach it in the chat window via WhatsApp\'s paperclip or camera icon!</span>'
    ),
    (
        '<i class="fa-brands fa-whatsapp text-lg"></i>\n          <span>Continue to WhatsApp Chat</span>',
        '<i class="fa-brands fa-whatsapp text-lg"></i>\n          <span data-i18n="prescSubmitBtn">Continue to WhatsApp Chat</span>'
    ),
    # Mobile nav drawer buttons
    (
        '<i class="fa-solid fa-file-prescription text-emerald-600"></i> Upload Prescription',
        '<i class="fa-solid fa-file-prescription text-emerald-600"></i> <span data-i18n="btnPrescription">Upload Prescription</span>'
    ),
    (
        '<i class="fa-solid fa-phone text-emerald-400"></i> Call: 8888056560',
        '<i class="fa-solid fa-phone text-emerald-400"></i> <span data-i18n="btnCall">Call: 8888056560</span>'
    ),
    (
        '<i class="fa-brands fa-whatsapp"></i> WhatsApp Order',
        '<i class="fa-brands fa-whatsapp"></i> <span data-i18n="btnWhatsapp">WhatsApp Order</span>'
    ),
]

applied = 0
for orig, repl in replacements:
    if orig in html:
        html = html.replace(orig, repl)
        applied += 1
    else:
        print("WARNING: Could not find exact string:")
        print(repr(orig[:60]))

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Applied {applied}/{len(replacements)} replacements in index.html.")

