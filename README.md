# New Seven Pharma (न्यू सेव्हन फार्मा) - Official Website

A premium, modern, highly interactive, mobile-first website for **New Seven Pharma**, Lalbaug, Dhule, Maharashtra.

---

## 🌟 Business Identity & Verified Credentials
* **Business Name:** New Seven Pharma / NSP Veterinary Supplier (न्यू सेव्हन फार्मा / न्यू सेव्हन फार्म)
* **Tagline:** The Premier Destination for All Types of Animal Medicines (जनावरांचे सर्व प्रकारचे औषधे मिळण्याचे एकमेव ठिकाण)
* **Proprietors:** Abhishek Relan &amp; Ranjan Relan (अभिषेक रेलन व रंजन रेलन)
* **Operating Timings:** **9:30 AM to 9:30 PM** (All 7 Days Open, 365 Days, Asia/Kolkata Timezone)
* **Phone Numbers:** `+91 8888056560` (Abhishek) | `+91 9422750888` (Abhishek) | `+91 9422750999` (Ranjan)
* **WhatsApp Order Hotline:** `+91 8530757226`
* **Shop Landline:** `02562-355033` / `283999`
* **Store Address:** First Floor, Seven Chemist Bhavan, Near Modraj Hotel, Old Municipal Corporation (जुनी महानगरपालिका), Parola Road, Lalbaug, Dhule, Maharashtra – 424001
* **Justdial Link:** [https://jsdl.in/DT-99LS9XKHNWV](https://jsdl.in/DT-99LS9XKHNWV)
* **Google Maps Route:** [https://share.google/9TMCEGVG4cLgkoUgT](https://share.google/9TMCEGVG4cLgkoUgT)

---

## 🛡️ Second-Level Audit & Refinement Summary

1. **Individual Product Catalogue:**
   - 16 dedicated individual product illustrations (`images/products/*.svg`) with consistent 4:3 neutral studio backgrounds, eliminate poster reuse on product cards.
   - Hover zoom and image view animations preserved.

2. **Verified Business Facts (Zero Fictional Claims) & Official Visiting Card:**
   - Updated authentic business details directly from the store's official visiting card (`images/visiting-card.webp`).
   - Proprietors: Abhishek Relan (`8888056560` / `9422750888`) and Ranjan Relan (`9422750999`).
   - Landlines: `02562-355033` / `283999`.
   - Address: First Floor, Seven Chemist Bhavan, Near Modraj Hotel, Old Municipal Corporation (जुनी महानगरपालिका), Parola Road, Lalbaug, Dhule.
   - Tagline: "जनावरांचे सर्व प्रकारचे औषधे मिळण्याचे एकमेव ठिकाण" (NSP Veterinary Supplier • Medicool).
   - Removed all unverified claims (e.g. "15+ Years", "500+ Items", "10,000+ Happy Farmers", "Authorized Dealership Guarantees", fictional reviews).
   - Replaced fictional testimonials with a responsive **Store Services & Customer Advisory** section (`#services`) linking to verified Justdial and Google Maps listings.
   - Featured the official visiting card at `#1` in the Store Gallery and as a high-resolution interactive card in the Contact Section (`#contact`).

3. **Dairy Herd Supplement Consumption Estimator & Feed Tool:**
   - Removed hardcoded "+12% milk yield" claims and cleaned up duplicated nested headers.
   - User-adjustable daily dosage (default 100ml liquid calcium, 50g mineral mixture) clarifying that dosages depend on veterinary prescriptions and manufacturer labels.
   - Prominent bilingual advisory disclaimers (English & Marathi) emphasizing that the calculator is an inventory planning aid, not medical advice.
   - Clean 2-column responsive layout (`grid md:grid-cols-2`).

4. **Responsive Sticky Header & Navigation:**
   - De-cluttered desktop navigation from 9 crowded links down to 5 core purchasing links.
   - Protected brand logo from flex squeezing using `shrink-0` to eliminate text collision (`Home` overlapping `PHARMA`).
   - Unified sticky `<header id="siteHeader">` pinned to top with modern `overflow-x: clip` on `body` (fixing browser sticky suppression).
   - Integrated full mobile drawer menu with accessible ESC and touch-close handlers.

5. **Continuous Live Product Slider (Infinite Marquee):**
   - Seamless, infinite auto-scrolling marquee across the `#products` section showcasing all 16 ready-stock products.
   - Pause on hover/touch so customers can inspect cards, open Quick View, or add items to their WhatsApp list.
   - Built-in interactive Pause/Resume control button (`#sliderPlayPauseBtn`).
   - Hardware-accelerated CSS translation with dual edge gradient masks and `@media (prefers-reduced-motion: reduce)` support.

4. **Transparent Prescription Workflow:**
   - Dedicated file input (`#prescFile`) with thumbnail and file name preview.
   - Explicit, transparent guidance informing customers that web browsers cannot automatically upload local files into WhatsApp, and providing instructions for attaching the image once WhatsApp opens.

5. **Dynamic Category Counts:**
   - Dynamically calculated category counts from the actual `PRODUCTS` array (`getCategoryCount()`), ensuring filter pills and catalog counts always agree.

6. **Accurate Asia/Kolkata Store Status:**
   - Exact boundary timing logic (`>= 570 && < 1290` minutes since midnight) evaluated strictly in `Asia/Kolkata` timezone via `Intl.DateTimeFormat`.

7. **Accessibility & Resilience:**
   - Full ARIA compliance: `role="dialog"`, `aria-modal="true"`, focus trapping and focus restoration on all modals and drawers.
   - Keyboard navigation with ESC key support.
   - Safe `localStorage` handling with try/catch fallbacks.
   - `@media (prefers-reduced-motion: reduce)` support.

---

## 🎨 Design System & Motion Engine

* **Brand Palette:** Emerald (`#059669`), Deep Forest Green (`#064e3b`), Slate Background (`#f8fafc`), Clean Dark (`#0f172a`), Neutral Border (`#e2e8f0`).
* **Typography:** Poppins (Latin) & Noto Sans Devanagari (Marathi).
* **Scroll-Driven Micro-Interactions:** `IntersectionObserver` reveals with subtle translations (`.fade-up`, `.scale-in`) and zero replay jitter.
* **Sticky Navigation:** Glassmorphic blur (`backdrop-filter: blur(16px)`), scroll elevation, active section tracker, top scroll progress bar, and morphing hamburger menu.
* **Interactive Toast Engine:** Non-intrusive feedback for cart operations and language toggles.
* **Back-to-Top:** Circular SVG progress indicator reflecting page scroll depth.

---

## 📁 Project Structure
```
new-seven-pharma/
├── index.html                 # Semantic SPA structure with accessibility markup
├── netlify.toml               # Netlify routing, headers & clean deployment configuration
├── css/
│   └── styles.css             # Design tokens, motion system, modals, reduced-motion rules
├── js/
│   ├── data.js                # Verified business configuration, 16 individual products, bilingual dictionary
│   └── main.js                # Asia/Kolkata clock, safe storage, dynamic catalog, cart, calculator, modals
├── images/
│   ├── favicon.svg            # Vector brand favicon
│   ├── poster-dairy-pet-accessories.webp # Authentic store flyer
│   ├── poster-healthy-animals.webp
│   ├── poster-independence-free-delivery.webp
│   ├── poster-marathi.webp
│   ├── visiting-card.webp
│   └── products/              # 16 individual product vector graphics + fallback placeholder
│       ├── cow-mat.svg
│       ├── milking-machine-single.svg
│       ├── milking-machine-double.svg
│       ├── mineral-mixture.svg
│       ├── liquid-calcium.svg
│       ├── calcium-gel.svg
│       ├── mastitis-care.svg
│       ├── dewormer-bolus.svg
│       ├── rumen-buffer.svg
│       ├── tick-flea-spray.svg
│       ├── dog-food.svg
│       ├── pet-collars.svg
│       ├── cat-care.svg
│       ├── poultry-liver.svg
│       ├── poultry-vitamins.svg
│       ├── dairy-combo.svg
│       └── placeholder.svg
└── README.md
```

## 💻 How to Run Locally
Open `index.html` directly in any modern web browser or serve via a lightweight HTTP server:
```bash
# Python
python -m http.server 8080

# Or Node.js
npx serve .
```
