const fs = require('fs');
const path = require('path');

// 1. Update css/styles.css
const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const oldHamburgerCss = /\.hamburger-box\s*\{[\s\S]*?\.hamburger-open\s*\.hamburger-line:nth-child\(3\)\s*\{[\s\S]*?\}/;

const newHamburgerCss = `.hamburger-box {
  width: 20px;
  height: 14px;
  position: relative;
  display: block;
  pointer-events: none;
}

.hamburger-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  width: 100%;
  background-color: currentColor;
  border-radius: 9999px;
  transform-origin: center;
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
}`;

if (oldHamburgerCss.test(css)) {
  css = css.replace(oldHamburgerCss, newHamburgerCss);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully updated hamburger styles in css/styles.css with explicit left: 0;');
} else {
  console.error('Could not find old hamburger css pattern');
}

// 2. Update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const oldBtnRegex = /<!-- Animated Hamburger Trigger[\s\S]*?<\/button>/;
const newBtn = `<!-- Animated Hamburger Trigger (Opens drawer with all menu links) -->
            <button type="button" onclick="toggleMobileNav()"
              class="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
              aria-label="Open mobile menu">
              <span id="hamburgerBox" class="hamburger-box"><span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span></span>
            </button>`;

if (oldBtnRegex.test(html)) {
  html = html.replace(oldBtnRegex, newBtn);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully updated index.html hamburger button markup');
} else {
  console.error('Could not find old button regex in index.html');
}

