const fs = require('fs');
const path = require('path');

// 1. Update css/styles.css
const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Update .top-marquee-wrapper to include min-width: 0;
css = css.replace(
  /\.top-marquee-wrapper\s*\{[\s\S]*?\}/,
  `.top-marquee-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
}`
);

// Update hamburger animation styles
css = css.replace(
  /\.hamburger-box\s*\{[\s\S]*?\.hamburger-open\s*\.hamburger-line:nth-child\(3\)\s*\{[\s\S]*?\}/,
  `.hamburger-box {
  width: 20px;
  height: 14px;
  position: relative;
  display: inline-block;
  pointer-events: none;
}

.hamburger-line {
  position: absolute;
  height: 2px;
  width: 100%;
  background: currentColor;
  border-radius: 9999px;
  transition: transform 0.3s var(--ease-smooth), opacity 0.2s ease, top 0.3s var(--ease-smooth);
}

.hamburger-line:nth-child(1) { top: 0; }
.hamburger-line:nth-child(2) { top: 6px; }
.hamburger-line:nth-child(3) { top: 12px; }

.hamburger-open .hamburger-line:nth-child(1) {
  top: 6px;
  transform: rotate(45deg);
}

.hamburger-open .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-open .hamburger-line:nth-child(3) {
  top: 6px;
  transform: rotate(-45deg);
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/styles.css');

// 2. Update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Ensure min-w-0 in top-marquee-wrapper
html = html.replace(
  'class="top-marquee-wrapper relative flex-1 overflow-hidden h-full flex items-center"',
  'class="top-marquee-wrapper relative flex-1 min-w-0 overflow-hidden h-full flex items-center"'
);

// Replace nav section
const oldNavRegex = /<!-- MAIN NAVIGATION BAR -->[\s\S]*?<\/nav>/;
const newNav = `<!-- MAIN NAVIGATION BAR -->
    <nav class="glass-nav border-b border-slate-200/80 shadow-xs transition-all duration-300">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-3">

          <!-- Logo / Brand (shrink-0 prevents compression) -->
          <a href="#hero" class="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0" title="New Seven Pharma - Home">
            <div
              class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <span class="font-black text-lg sm:text-2xl tracking-tighter">7</span>
            </div>
            <div class="shrink min-w-0">
              <div class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <span
                  class="font-black text-sm sm:text-lg lg:text-xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition">NEW SEVEN</span>
                <span class="font-black text-sm sm:text-lg lg:text-xl text-emerald-600 tracking-tight leading-none">PHARMA</span>
              </div>
              <p class="hidden xl:block text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5" data-i18n="tagline">
                Veterinary &amp; Pet Care Specialist • Dhule
              </p>
            </div>
          </a>

          <!-- Desktop Menu Links (Streamlined Essential Links, No Crowding) -->
          <div class="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-sm font-semibold text-slate-700 whitespace-nowrap">
            <a href="#products" class="desktop-nav-link hover:text-emerald-600 transition duration-150 py-1"
              data-i18n="navProducts">Products &amp; Equipment</a>
            <a href="#dairy-focus" class="desktop-nav-link hover:text-emerald-600 transition duration-150 py-1"
              data-i18n="navDairy">Dairy &amp; Cattle</a>
            <a href="#pets-focus" class="desktop-nav-link hover:text-emerald-600 transition duration-150 py-1"
              data-i18n="navPets">Pet Care</a>
            <a href="#calculator" class="desktop-nav-link hover:text-emerald-600 transition duration-150 py-1"
              data-i18n="navCalculator">Feed Estimator</a>
            <a href="#contact" class="desktop-nav-link hover:text-emerald-600 transition duration-150 py-1"
              data-i18n="navContact">Location &amp; Timings</a>
          </div>

          <!-- Action CTAs: Prescription & Cart Drawer Trigger -->
          <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">

            <!-- Prescription Upload Button (Concise & Polished) -->
            <button type="button" onclick="openPrescriptionModal()"
              class="hidden md:inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition btn-lift shrink-0">
              <i class="fa-solid fa-file-prescription text-emerald-600 text-sm"></i>
              <span data-i18n="btnPrescription">Prescription</span>
            </button>

            <!-- WhatsApp Order Cart Trigger -->
            <button type="button" onclick="toggleCartDrawer()"
              class="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 w-9 h-9 sm:w-auto px-0 sm:px-3.5 py-0 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition btn-premium shadow-sm shrink-0"
              title="View WhatsApp Order List">
              <i class="fa-solid fa-cart-shopping text-emerald-400 text-sm"></i>
              <span class="hidden sm:inline" data-i18n="orderListBtn">Order List</span>
              <span
                class="cart-count-badge hidden absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-extrabold flex items-center justify-center shadow-md animate-bounce">
                0
              </span>
            </button>

            <!-- Animated Hamburger Trigger (Opens drawer with all menu links) -->
            <button type="button" onclick="toggleMobileNav()"
              class="lg:hidden w-9 h-9 sm:w-10 sm:h-10 p-0 sm:p-2.5 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
              aria-label="Open mobile menu">
              <span id="hamburgerBox" class="hamburger-box">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>`;

if (oldNavRegex.test(html)) {
  html = html.replace(oldNavRegex, newNav);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully updated index.html navigation bar');
} else {
  console.error('Regex did not match old navigation bar in index.html');
}

