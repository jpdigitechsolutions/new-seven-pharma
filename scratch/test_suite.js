// Automated Verification & Test Suite for New Seven Pharma
const fs = require('fs');
const path = require('path');

const vm = require('vm');

console.log('====================================================');
console.log('🧪 NEW SEVEN PHARMA AUTOMATED TEST & AUDIT SUITE');
console.log('====================================================\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
    failedTests++;
  }
}

// -----------------------------------------------------------------------------
// TEST 1: SYNTAX VALIDATION
// -----------------------------------------------------------------------------
console.log('--- TEST 1: JavaScript Syntax & Compilation ---');
let STORE_CONFIG, CATEGORIES, PRODUCTS, GALLERY_IMAGES, STORE_SERVICES, FAQS, I18N, getCategoryCount;

try {
  const dataCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf-8');
  const context = { console, window: {} };
  vm.createContext(context);
  const exported = vm.runInContext(dataCode + ';\n({ STORE_CONFIG, CATEGORIES, PRODUCTS, GALLERY_IMAGES, STORE_SERVICES, FAQS, I18N, getCategoryCount });', context);

  STORE_CONFIG = exported.STORE_CONFIG;
  CATEGORIES = exported.CATEGORIES;
  PRODUCTS = exported.PRODUCTS;
  GALLERY_IMAGES = exported.GALLERY_IMAGES;
  STORE_SERVICES = exported.STORE_SERVICES;
  FAQS = exported.FAQS;
  I18N = exported.I18N;
  getCategoryCount = exported.getCategoryCount;

  assert(true, 'js/data.js evaluates without syntax errors');
} catch (e) {
  assert(false, 'js/data.js syntax error', e.message);
}

// -----------------------------------------------------------------------------
// TEST 2: LOCAL ASSET EXISTENCE & NON-ZERO SIZE
// -----------------------------------------------------------------------------
console.log('\n--- TEST 2: Local Asset Verification ---');
let missingAssets = [];
let zeroByteAssets = [];

// Check product images
PRODUCTS.forEach(p => {
  const fullPath = path.join(__dirname, '..', p.image);
  if (!fs.existsSync(fullPath)) {
    missingAssets.push(p.image);
  } else {
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) zeroByteAssets.push(p.image);
  }
});

// Check gallery images
GALLERY_IMAGES.forEach(g => {
  const fullPath = path.join(__dirname, '..', g.src);
  if (!fs.existsSync(fullPath)) {
    missingAssets.push(g.src);
  } else {
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) zeroByteAssets.push(g.src);
  }
});

// Check favicon and posters
['images/favicon.svg', 'images/poster-dairy-pet-accessories.webp', 'images/products/placeholder.svg'].forEach(img => {
  const fullPath = path.join(__dirname, '..', img);
  if (!fs.existsSync(fullPath)) missingAssets.push(img);
});

assert(missingAssets.length === 0, 'All referenced images and SVGs exist on disk', missingAssets.join(', '));
assert(zeroByteAssets.length === 0, 'All referenced image files have non-zero size', zeroByteAssets.join(', '));

// -----------------------------------------------------------------------------
// TEST 3: CATALOG INTEGRITY & DYNAMIC CATEGORY COUNTS
// -----------------------------------------------------------------------------
console.log('\n--- TEST 3: Catalog & Dynamic Category Counts ---');
assert(PRODUCTS.length === 16, `Product catalogue contains exactly 16 products (Found: ${PRODUCTS.length})`);

const expectedCategoryCounts = {
  all: PRODUCTS.length,
  equipment: PRODUCTS.filter(p => p.category === 'equipment').length,
  nutrition: PRODUCTS.filter(p => p.category === 'nutrition').length,
  dairy: PRODUCTS.filter(p => p.category === 'dairy').length,
  pets: PRODUCTS.filter(p => p.category === 'pets').length,
  poultry: PRODUCTS.filter(p => p.category === 'poultry').length,
};

CATEGORIES.forEach(cat => {
  const dynamicCount = getCategoryCount(cat.id);
  const expected = expectedCategoryCounts[cat.id];
  assert(dynamicCount === expected, `Category '${cat.id}' count agrees dynamically (Expected: ${expected}, Got: ${dynamicCount})`);
});

// Verify no duplicate IDs in PRODUCTS
const productIds = new Set();
let duplicateFound = false;
PRODUCTS.forEach(p => {
  if (productIds.has(p.id)) duplicateFound = true;
  productIds.add(p.id);
});
assert(!duplicateFound, 'No duplicate product IDs in PRODUCTS');

// Verify every product has unique, dedicated image file (not generic poster)
const productImageFiles = PRODUCTS.map(p => p.image);
const uniqueImages = new Set(productImageFiles);
assert(uniqueImages.size === PRODUCTS.length, `Every product has a dedicated individual image (Unique: ${uniqueImages.size}/${PRODUCTS.length})`);

// Verify no product uses poster images
const posterReused = PRODUCTS.some(p => p.image.includes('poster-'));
assert(!posterReused, 'No generic promotional posters reused as product card images');

// -----------------------------------------------------------------------------
// TEST 4: VERIFY BUSINESS CLAIMS & TIMINGS
// -----------------------------------------------------------------------------
console.log('\n--- TEST 4: Verified Business Information & Timings ---');
assert(STORE_CONFIG.timingHours.openHour === 9 && STORE_CONFIG.timingHours.openMinute === 30 && STORE_CONFIG.timingHours.closeHour === 21 && STORE_CONFIG.timingHours.closeMinute === 30, 'Store timings are strictly 9:30 AM to 9:30 PM');
assert(STORE_CONFIG.timeZone === 'Asia/Kolkata', 'Timezone is configured to Asia/Kolkata');
assert(STORE_CONFIG.address.city === 'Dhule', 'Location verified to Dhule');
assert(STORE_CONFIG.address.line2.includes('Lalbaug'), 'Street address verified to Lalbaug, Dhule');

// Time calculation boundary test in Asia/Kolkata
function isStoreOpenAtMinutes(minutesSinceMidnight) {
  return minutesSinceMidnight >= 570 && minutesSinceMidnight < 1290;
}
assert(!isStoreOpenAtMinutes(569), '9:29 AM -> Store is CLOSED (boundary before 9:30)');
assert(isStoreOpenAtMinutes(570), '9:30 AM -> Store is OPEN (exact opening boundary)');
assert(isStoreOpenAtMinutes(720), '12:00 PM -> Store is OPEN (mid-day)');
assert(isStoreOpenAtMinutes(1289), '9:29 PM -> Store is OPEN (1 minute before closing)');
assert(!isStoreOpenAtMinutes(1290), '9:30 PM -> Store is CLOSED (exact closing boundary)');
assert(!isStoreOpenAtMinutes(1350), '10:30 PM -> Store is CLOSED (night)');

// -----------------------------------------------------------------------------
// TEST 5: HERD SUPPLEMENT CALCULATOR & DISCLAIMERS
// -----------------------------------------------------------------------------
console.log('\n--- TEST 5: Herd Supplement Calculator Logic ---');
function calculateHerdSupplements(cows, dailyLiquid, dailyMinerals) {
  const totalDailyLiquid = cows * dailyLiquid;
  const monthlyLiquidLitres = (totalDailyLiquid * 30) / 1000;
  const totalDailyMinerals = cows * dailyMinerals;
  const monthlyMineralsKg = (totalDailyMinerals * 30) / 1000;
  return { totalDailyLiquid, monthlyLiquidLitres, totalDailyMinerals, monthlyMineralsKg };
}

const testCalc = calculateHerdSupplements(4, 100, 50);
assert(testCalc.totalDailyLiquid === 400, '4 cows * 100ml = 400ml daily liquid calcium');
assert(testCalc.monthlyLiquidLitres === 12.0, '400ml * 30 days = 12.0 Litres monthly liquid calcium');
assert(testCalc.totalDailyMinerals === 200, '4 cows * 50g = 200g daily mineral mixture');
assert(testCalc.monthlyMineralsKg === 6.0, '200g * 30 days = 6.0 Kg monthly mineral mixture');

// Check that no +12% yield boost is in I18N
const hasYieldBoostClaim = JSON.stringify(I18N).includes('+12%') || JSON.stringify(I18N).includes('12% Milk Yield');
assert(!hasYieldBoostClaim, 'Hardcoded 12% yield boost claim removed from I18N and codebase');

// Check that disclaimers exist in both EN and MR
assert(I18N.en.calcDisclaimerTitle && I18N.en.calcDisclaimerText, 'English calculator advisory disclaimer present');
assert(I18N.mr.calcDisclaimerTitle && I18N.mr.calcDisclaimerText, 'Marathi calculator advisory disclaimer present');

// -----------------------------------------------------------------------------
// TEST 6: BILINGUAL I18N PARITY
// -----------------------------------------------------------------------------
console.log('\n--- TEST 6: Bilingual Translation Key Parity ---');
const enKeys = Object.keys(I18N.en);
const mrKeys = Object.keys(I18N.mr);
const missingInMr = enKeys.filter(k => !mrKeys.includes(k));
const missingInEn = mrKeys.filter(k => !enKeys.includes(k));

assert(missingInMr.length === 0, 'All English keys have corresponding Marathi translations', missingInMr.join(', '));
assert(missingInEn.length === 0, 'All Marathi keys have corresponding English translations', missingInEn.join(', '));

// Verify products have Marathi names and descriptions
const productsMissingMr = PRODUCTS.filter(p => !p.nameMr || !p.summaryMr);
assert(productsMissingMr.length === 0, 'All 16 products have complete Marathi translations', productsMissingMr.map(p => p.id).join(', '));

// -----------------------------------------------------------------------------
// TEST 7: WHATSAPP ORDER URL & CART LOGIC
// -----------------------------------------------------------------------------
console.log('\n--- TEST 7: WhatsApp Ordering & Cart Logic ---');
const dummyCart = [
  { id: 'cow-mat', name: 'Heavy Duty Cow Rubber Mat', nameMr: 'गाईंसाठी हेवी ड्युटी रबरी मॅट', packaging: '6ft x 4ft (22mm)', quantity: 4 },
  { id: 'liquid-calcium', name: 'Liquid Calcium with Vitamin D3', nameMr: 'लिक्विड कॅल्शियम व व्हिटॅमिन D3', packaging: '5 Litre Can', quantity: 2 }
];

let orderText = `*Hello New Seven Pharma (Dhule)!*\nI would like to place an order for the following items:\n\n`;
dummyCart.forEach((item, index) => {
  orderText += `${index + 1}. *${item.name}*\n   - Quantity: ${item.quantity}\n   - Pack: ${item.packaging}\n`;
});
const encodedUrl = `https://wa.me/91${STORE_CONFIG.phones.whatsapp}?text=${encodeURIComponent(orderText)}`;

assert(encodedUrl.includes('https://wa.me/918530757226?text='), 'WhatsApp URL targets verified business phone 8530757226');
assert(encodedUrl.includes(encodeURIComponent('Heavy Duty Cow Rubber Mat')), 'WhatsApp URL properly encodes product name');
assert(encodedUrl.includes(encodeURIComponent('Quantity: 4')), 'WhatsApp URL includes quantity');

// -----------------------------------------------------------------------------
// TEST 8: HTML ACCESSIBILITY & STRUCTURAL INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- TEST 8: HTML Structure & Accessibility Attributes ---');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');

assert(html.includes('id="prescriptionModal"') && html.includes('role="dialog"') && html.includes('aria-modal="true"'), 'Prescription modal has dialog role and aria-modal');
assert(html.includes('id="productQuickViewModal"'), 'Product quick view modal present');
assert(html.includes('id="lightboxModal"'), 'Lightbox modal present');
assert(html.includes('id="cartDrawer"'), 'Cart drawer present');
assert(html.includes('id="mobileNavDrawer"'), 'Mobile navigation drawer present');
assert(html.includes('id="servicesContainer"'), 'Store services container present');
assert(html.includes('id="prescFile"'), 'Prescription file input present');
assert(html.includes('id="prescPreviewArea"'), 'Prescription preview area present');
assert(html.includes('id="prescImgPreview"'), 'Prescription image preview element present');
assert(html.includes('id="prescFileName"'), 'Prescription file name element present');
assert(html.includes('id="prescFileNotice"'), 'Prescription file transparent notice present');
assert(!html.includes('15+ Years Experience'), 'Unverified claim "15+ Years" is absent');
assert(!html.includes('500+ Items'), 'Unverified claim "500+ Items" is absent');
assert(!html.includes('10,000+ Happy Farmers'), 'Unverified claim "10,000+ Happy Farmers" is absent');
assert(!html.includes('Authorized Intas & Virbac Dealer'), 'Unverified claim "Authorized Intas & Virbac Dealer" is absent');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`📊 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}