const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const marqueeCss = `
/* ==========================================================================
   TOP UTILITY TICKER MARQUEE
   ========================================================================== */
.top-marquee-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
}

.top-marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  animation: topMarqueeSlide 45s linear infinite;
  will-change: transform;
}

.top-marquee-track:hover,
.top-marquee-track:focus-within,
.top-marquee-track:active {
  animation-play-state: paused;
}

@keyframes topMarqueeSlide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .top-marquee-track {
    animation-duration: 32s;
  }
}

@media (prefers-reduced-motion: reduce) {
  .top-marquee-track {
    animation: none !important;
    overflow-x: auto;
  }
}
`;

if (!css.includes('.top-marquee-wrapper')) {
  css = css.replace('/* ==========================================================================\r\n   PRODUCT CARDS & ZOOM EFFECTS', marqueeCss + '\r\n/* ==========================================================================\r\n   PRODUCT CARDS & ZOOM EFFECTS');
  if (!css.includes('.top-marquee-wrapper')) {
    // fallback if LF only
    css = css.replace('/* ==========================================================================\n   PRODUCT CARDS & ZOOM EFFECTS', marqueeCss + '\n/* ==========================================================================\n   PRODUCT CARDS & ZOOM EFFECTS');
  }
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully appended top marquee styles to css/styles.css');
} else {
  console.log('Styles already present in css/styles.css');
}

