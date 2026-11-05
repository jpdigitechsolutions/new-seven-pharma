// scratch/test_bilingual_simulation.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('Testing full bilingual simulation...');

const dataCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf-8');
const htmlCode = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');

// Check that all data-i18n attributes in index.html exist in I18N.en and I18N.mr
const i18nMatches = [...htmlCode.matchAll(/data-i18n=["']([^"']+)["']/g)].map(m => m[1]);
console.log(`Found ${i18nMatches.length} data-i18n tags in index.html`);

const ctx = { console, window: {} };
vm.createContext(ctx);
const exp = vm.runInContext(dataCode + '; ({ I18N, PRODUCTS, CATEGORIES, STORE_SERVICES, FAQS });', ctx);
const { I18N, PRODUCTS, CATEGORIES, STORE_SERVICES, FAQS } = exp;

let missingEn = 0;
let missingMr = 0;

i18nMatches.forEach(key => {
    if (!I18N.en[key]) {
        console.error(`Missing EN for tag key: ${key}`);
        missingEn++;
    }
    if (!I18N.mr[key]) {
        console.error(`Missing MR for tag key: ${key}`);
        missingMr++;
    }
});

// Check placeholders
const placeholderMatches = [...htmlCode.matchAll(/data-i18n-placeholder=["']([^"']+)["']/g)].map(m => m[1]);
console.log(`Found ${placeholderMatches.length} data-i18n-placeholder tags in index.html`);

placeholderMatches.forEach(key => {
    if (!I18N.en[key]) {
        console.error(`Missing EN for placeholder key: ${key}`);
        missingEn++;
    }
    if (!I18N.mr[key]) {
        console.error(`Missing MR for placeholder key: ${key}`);
        missingMr++;
    }
});

// Check product Marathi translations
let missingProdMr = 0;
PRODUCTS.forEach(p => {
    if (!p.nameMr) { console.error(`Product ${p.id} missing nameMr`); missingProdMr++; }
    if (!p.summaryMr) { console.error(`Product ${p.id} missing summaryMr`); missingProdMr++; }
    if (!p.badgeMr) { console.error(`Product ${p.id} missing badgeMr`); missingProdMr++; }
    if (!p.packagingMr) { console.error(`Product ${p.id} missing packagingMr`); missingProdMr++; }
    if (!p.featuresMr || p.featuresMr.length === 0) { console.error(`Product ${p.id} missing featuresMr`); missingProdMr++; }
});

// Check Category Marathi translations
let missingCatMr = 0;
CATEGORIES.forEach(c => {
    if (!c.nameMr) { console.error(`Category ${c.id} missing nameMr`); missingCatMr++; }
});

// Check Services Marathi translations
let missingServMr = 0;
STORE_SERVICES.forEach(s => {
    if (!s.titleMr || !s.descMr) { console.error(`Service missing MR: ${s.title}`); missingServMr++; }
});

// Check FAQ Marathi translations
let missingFaqMr = 0;
FAQS.forEach(f => {
    if (!f.qMr || !f.aMr) { console.error(`FAQ missing MR: ${f.q}`); missingFaqMr++; }
});

console.log('--- AUDIT SUMMARY ---');
console.log(`Missing EN tag keys: ${missingEn}`);
console.log(`Missing MR tag keys: ${missingMr}`);
console.log(`Missing Product MR fields: ${missingProdMr}`);
console.log(`Missing Category MR fields: ${missingCatMr}`);
console.log(`Missing Service MR fields: ${missingServMr}`);
console.log(`Missing FAQ MR fields: ${missingFaqMr}`);

if (missingEn === 0 && missingMr === 0 && missingProdMr === 0 && missingCatMr === 0 && missingServMr === 0 && missingFaqMr === 0) {
    console.log('🌟 100% PERFECT BILINGUAL COVERAGE ACHIEVED!');
    process.exit(0);
} else {
    console.error('❌ SOME TRANSLATIONS ARE MISSING!');
    process.exit(1);
}

