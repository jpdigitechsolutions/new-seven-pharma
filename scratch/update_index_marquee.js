const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const oldStripRegex = /<!-- TOP UTILITY STRIP -->[\s\S]*?<!-- MAIN NAVIGATION BAR -->/;

const newStrip = `<!-- TOP UTILITY STRIP MARQUEE TICKER -->
    <div class="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 relative z-30 select-none overflow-hidden h-9 sm:h-10 flex items-center">
      <div class="top-marquee-wrapper relative flex-1 overflow-hidden h-full flex items-center">
        <div class="top-marquee-track flex items-center whitespace-nowrap">
          <!-- LOOP TRACK 1 -->
          <div class="flex items-center gap-5 sm:gap-7 px-3 sm:px-4 shrink-0">
            <!-- 1. Live Store Status -->
            <div id="storeLiveStatus" class="store-live-status-badge shrink-0">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3"></span>
                <span>Open Now (9:30 AM – 9:30 PM)</span>
              </span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 2. Location -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-location-dot text-emerald-400"></i>
              <span data-i18n="topLocation">Parola Road, Lalbaug, Dhule</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 3. Store Timings -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-regular fa-clock text-emerald-400"></i>
              <span data-i18n="topTimings">9:30 AM – 9:30 PM (All 7 Days)</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 4. Free Delivery -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-truck-fast text-emerald-400"></i>
              <span data-i18n="topDelivery">Free Farm Delivery Across Dhule Area (T&C Apply)</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 5. Cattle & Buffalo Healthcare -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-shield-halved text-emerald-400"></i>
              <span data-i18n="topCattle">Veterinary Medicines, Injections & Deworming Bolus</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 6. Milkers & Rubber Mats -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-gears text-emerald-400"></i>
              <span data-i18n="topEquip">Milking Machines & Cow Comfort Rubber Shed Mats</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 7. Feed & Calcium Supplements -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-bottle-droplet text-emerald-400"></i>
              <span data-i18n="topFeed">Calcium, Mineral Mixture & Feed Supplements</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 8. Pet Healthcare Range -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-paw text-emerald-400"></i>
              <span data-i18n="topPets">Pet Nutrition, Shampoos & Healthcare Range</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 9. Poultry Care -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-feather-pointed text-emerald-400"></i>
              <span data-i18n="topPoultry">Poultry Growth Tonics & Health Products</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 10. Direct Call -->
            <a href="tel:8888056560" class="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition font-medium shrink-0">
              <i class="fa-solid fa-phone text-emerald-400"></i>
              <span data-i18n="topCall">Call: 8888056560 / 9422750999</span>
            </a>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 11. WhatsApp Order -->
            <a href="https://wa.me/918530757226" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-medium shrink-0">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span data-i18n="topWhatsApp">WhatsApp: 8530757226</span>
            </a>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>
          </div>

          <!-- LOOP TRACK 2 (Identical duplicate for seamless continuous infinite slide) -->
          <div class="flex items-center gap-5 sm:gap-7 px-3 sm:px-4 shrink-0" aria-hidden="true">
            <!-- 1. Live Store Status Duplicate -->
            <div class="store-live-status-badge shrink-0">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3"></span>
                <span>Open Now (9:30 AM – 9:30 PM)</span>
              </span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 2. Location -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-location-dot text-emerald-400"></i>
              <span data-i18n="topLocation">Parola Road, Lalbaug, Dhule</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 3. Store Timings -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-regular fa-clock text-emerald-400"></i>
              <span data-i18n="topTimings">9:30 AM – 9:30 PM (All 7 Days)</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 4. Free Delivery -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-truck-fast text-emerald-400"></i>
              <span data-i18n="topDelivery">Free Farm Delivery Across Dhule Area (T&C Apply)</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 5. Cattle & Buffalo Healthcare -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-shield-halved text-emerald-400"></i>
              <span data-i18n="topCattle">Veterinary Medicines, Injections & Deworming Bolus</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 6. Milkers & Rubber Mats -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-gears text-emerald-400"></i>
              <span data-i18n="topEquip">Milking Machines & Cow Comfort Rubber Shed Mats</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 7. Feed & Calcium Supplements -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-bottle-droplet text-emerald-400"></i>
              <span data-i18n="topFeed">Calcium, Mineral Mixture & Feed Supplements</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 8. Pet Healthcare Range -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-paw text-emerald-400"></i>
              <span data-i18n="topPets">Pet Nutrition, Shampoos & Healthcare Range</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 9. Poultry Care -->
            <div class="flex items-center gap-1.5 text-slate-300 shrink-0">
              <i class="fa-solid fa-feather-pointed text-emerald-400"></i>
              <span data-i18n="topPoultry">Poultry Growth Tonics & Health Products</span>
            </div>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 10. Direct Call -->
            <a href="tel:8888056560" class="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition font-medium shrink-0">
              <i class="fa-solid fa-phone text-emerald-400"></i>
              <span data-i18n="topCall">Call: 8888056560 / 9422750999</span>
            </a>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>

            <!-- 11. WhatsApp Order -->
            <a href="https://wa.me/918530757226" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-medium shrink-0">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span data-i18n="topWhatsApp">WhatsApp: 8530757226</span>
            </a>

            <span class="text-emerald-500/50 text-[11px] select-none">✦</span>
          </div>
        </div>
      </div>

      <!-- Right Pinned: Language Switcher Button with Gradient Edge Mask -->
      <div class="shrink-0 relative z-20 flex items-center pr-3 sm:pr-4 pl-3 sm:pl-5 h-full bg-gradient-to-l from-slate-900 via-slate-900/95 to-transparent">
        <button id="langToggle" type="button" title="Switch Language / भाषा बदला"
          class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-400 font-medium text-[11px] sm:text-xs transition border border-slate-700 shadow-xs btn-lift flex items-center gap-1.5 cursor-pointer">
          <i class="fa-solid fa-language text-emerald-400 text-xs"></i>
          <span class="font-semibold tracking-wide">EN / मराठी</span>
        </button>
      </div>
    </div>

    <!-- MAIN NAVIGATION BAR -->`;

if (oldStripRegex.test(html)) {
  html = html.replace(oldStripRegex, newStrip);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully updated index.html with top utility marquee ticker');
} else {
  console.error('Regex did not match old top strip in index.html');
}

