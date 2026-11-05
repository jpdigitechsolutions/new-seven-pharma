# scratch/patch_slider_and_quickview.py
with open('js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update continuous slider badge & packaging
old_s1 = "const isInCart = appState.cart.some(item => item.id === prod.id);"
new_s1 = """const isInCart = appState.cart.some(item => item.id === prod.id);
      const badge = isMr && prod.badgeMr ? prod.badgeMr : prod.badge;
      const packaging = isMr && prod.packagingMr ? prod.packagingMr : prod.packaging;"""

# In renderContinuousSlider:
if "function renderContinuousSlider()" in content:
    idx = content.find("function renderContinuousSlider()")
    part1 = content[:idx]
    part2 = content[idx:]
    
    # replace in part2
    part2 = part2.replace(
        "const isInCart = appState.cart.some(item => item.id === prod.id);",
        "const isInCart = appState.cart.some(item => item.id === prod.id);\n      const badge = isMr && prod.badgeMr ? prod.badgeMr : prod.badge;\n      const packaging = isMr && prod.packagingMr ? prod.packagingMr : prod.packaging;",
        1
    )
    part2 = part2.replace(
        """            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}">
                ${prod.badge}
              </span>
            </div>""",
        """            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}">
                ${badge}
              </span>
            </div>""",
        1
    )
    part2 = part2.replace(
        """              <div class="mt-2.5 inline-flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-lg text-[10px] font-medium text-slate-600 border border-slate-100">
                <i class="fa-solid fa-box-open text-emerald-500"></i>
                <span>${prod.packaging}</span>
              </div>""",
        """              <div class="mt-2.5 inline-flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-lg text-[10px] font-medium text-slate-600 border border-slate-100">
                <i class="fa-solid fa-box-open text-emerald-500"></i>
                <span>${packaging}</span>
              </div>""",
        1
    )
    content = part1 + part2
    print("Patched renderContinuousSlider.")

# 2. Update openProductQuickView
if "window.openProductQuickView = function (prodId, triggerEl) {" in content:
    idx2 = content.find("window.openProductQuickView = function (prodId, triggerEl) {")
    p1 = content[:idx2]
    p2 = content[idx2:]
    
    p2 = p2.replace(
        "const isInCart = appState.cart.some(i => i.id === prod.id);",
        "const isInCart = appState.cart.some(i => i.id === prod.id);\n      const badge = isMr && prod.badgeMr ? prod.badgeMr : prod.badge;\n      const packaging = isMr && prod.packagingMr ? prod.packagingMr : prod.packaging;\n      const features = (isMr && prod.featuresMr) ? prod.featuresMr : prod.features;\n      const deliveryText = isMr ? STORE_CONFIG.deliveryTextMr : STORE_CONFIG.deliveryText;",
        1
    )
    p2 = p2.replace(
        """        <span class="absolute top-3 left-3 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
          ${prod.badge}
        </span>""",
        """        <span class="absolute top-3 left-3 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
          ${badge}
        </span>""",
        1
    )
    p2 = p2.replace(
        "${prod.features.map(f => `<li class=\"flex items-start gap-2\"><i class=\"fa-solid fa-circle-check text-emerald-500 mt-0.5 text-xs shrink-0\"></i><span>${f}</span></li>`).join('')}",
        "${features.map(f => `<li class=\"flex items-start gap-2\"><i class=\"fa-solid fa-circle-check text-emerald-500 mt-0.5 text-xs shrink-0\"></i><span>${f}</span></li>`).join('')}",
        1
    )
    p2 = p2.replace(
        "<span>${STORE_CONFIG.deliveryText}</span>",
        "<span>${deliveryText}</span>",
        1
    )
    p2 = p2.replace(
        "<span>${isMr ? 'उपलब्ध साईझ / पॅक:' : 'Available Size / Packaging:'} ${prod.packaging}</span>",
        "<span>${isMr ? 'उपलब्ध साईझ / पॅक:' : 'Available Size / Packaging:'} ${packaging}</span>",
        1
    )
    content = p1 + p2
    print("Patched openProductQuickView.")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished writing js/main.js!")

