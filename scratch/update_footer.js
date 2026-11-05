const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const oldBottom = `        <!-- Bottom Disclaimer & Copyright -->
        <div
          class="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-200/50 text-[11px]">
          <div>
            <span data-i18n="footerCopyright">&copy; 2026 New Seven Pharma (Dhule). All rights reserved.</span>
          </div>
          <div class="flex items-center gap-4">
            <span data-i18n="footerServingNotice">Serving Animal Health &amp; Dairy Prosperity</span>
            <span>•</span>
            <a href="#hero" class="hover:text-emerald-400 transition" data-i18n="footerBackToTop">Back to Top ↑</a>
          </div>
        </div>`;

const newBottom = `        <!-- Bottom Disclaimer, Copyright & Developer Credit -->
        <div
          class="pt-8 border-t border-emerald-900/60 flex flex-col lg:flex-row items-center justify-between gap-4 text-emerald-200/60 text-[11px] text-center lg:text-left">
          <div>
            <span data-i18n="footerCopyright">&copy; 2026 New Seven Pharma (Dhule). All rights reserved.</span>
          </div>
          <div class="text-[11px] sm:text-xs font-medium tracking-wide text-emerald-200/80">
            DESIGN AND DEVELOP BY <a href="https://jpdigitechsolutions.netlify.app/" target="_blank" rel="noopener noreferrer" class="font-bold text-emerald-400 hover:text-white underline decoration-emerald-500/60 underline-offset-4 transition-colors ml-0.5 inline-flex items-center gap-1">JPDIGITECHSOLUTION <i class="fa-solid fa-arrow-up-right-from-square text-[9px] no-underline"></i></a>
          </div>
          <div class="flex items-center gap-4">
            <span data-i18n="footerServingNotice">Serving Animal Health &amp; Dairy Prosperity</span>
            <span>•</span>
            <a href="#hero" class="hover:text-emerald-400 transition" data-i18n="footerBackToTop">Back to Top ↑</a>
          </div>
        </div>`;

const normalizedHtml = html.replace(/\r\n/g, '\n');
const normalizedOld = oldBottom.replace(/\r\n/g, '\n');

if (normalizedHtml.includes(normalizedOld)) {
  const updated = normalizedHtml.replace(normalizedOld, newBottom.replace(/\r\n/g, '\n'));
  fs.writeFileSync(indexPath, updated, 'utf8');
  console.log('Successfully updated footer in index.html with developer credit');
} else {
  console.error('Could not find oldBottom in index.html');
}

