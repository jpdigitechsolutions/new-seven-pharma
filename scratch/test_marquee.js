const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf-8');
const htmlCode = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const cssCode = fs.readFileSync(path.join(__dirname, '..', 'css', 'styles.css'), 'utf-8');

const ctx = { console, window: {} };
vm.createContext(ctx);
const exp = vm.runInContext(dataCode + '; ({ I18N });', ctx);
const { I18N } = exp;

console.log('Testing Top Marquee Structure & Features:');

// 1. Check CSS classes
console.log('1. Checking CSS rules:');
const hasWrapper = cssCode.includes('.top-marquee-wrapper');
const hasTrack = cssCode.includes('.top-marquee-track');
const hasKeyframe = cssCode.includes('@keyframes topMarqueeSlide');
const hasPauseOnHover = cssCode.includes('animation-play-state: paused');
const hasReducedMotion = cssCode.includes('@media (prefers-reduced-motion: reduce)');

console.log('  .top-marquee-wrapper present:', hasWrapper);
console.log('  .top-marquee-track present:', hasTrack);
console.log('  @keyframes topMarqueeSlide present:', hasKeyframe);
console.log('  pause-on-hover present:', hasPauseOnHover);
console.log('  prefers-reduced-motion handled:', hasReducedMotion);

// 2. Check HTML structure
console.log('\n2. Checking HTML structure:');
const hasLangToggle = htmlCode.includes('id="langToggle"');
const hasStoreLiveStatus = htmlCode.includes('id="storeLiveStatus"');
const liveStatusBadgesCount = (htmlCode.match(/class="[^"]*store-live-status-badge[^"]*"/g) || []).length;
console.log('  #langToggle button present:', hasLangToggle);
console.log('  #storeLiveStatus present:', hasStoreLiveStatus);
console.log('  .store-live-status-badge count:', liveStatusBadgesCount);

// 3. Test keys in marquee
const marqueeKeys = ['topLocation', 'topTimings', 'topDelivery', 'topCattle', 'topEquip', 'topFeed', 'topPets', 'topPoultry', 'topCall', 'topWhatsApp'];
console.log('\n3. Marquee Bilingual Keys Preview:');
marqueeKeys.forEach(key => {
  console.log(`  [${key}]`);
  console.log(`    EN: ${I18N.en[key]}`);
  console.log(`    MR: ${I18N.mr[key]}`);
});

console.log('\n Marquee verification complete!');

