# scratch/integrate_images.py
with open('js/data.js', 'r', encoding='utf-8') as f:
    data_code = f.read()

# 1. Update GALLERY_IMAGES in js/data.js
new_gallery = """const GALLERY_IMAGES = [
  {
    id: "gal-1",
    src: "images/visiting-card.webp",
    title: "Official Store Visiting Card: NSP Veterinary Supplier",
    titleMr: "अधिकृत व्हिजिटिंग कार्ड: न्यू सेव्हन फार्म (NSP)",
    desc: "NSP Veterinary Supplier (Medicool) - Abhishek Relan (8888056560 / 9422750888) & Ranjan Relan (9422750999). Seven Chemist Bhavan, Near Modraj Hotel, Old Municipal Corporation, Dhule. Tel: 02562-355033 / 283999.",
    descMr: "एनएसपी व्हेटर्नरी सप्लायर (मेडिकूल) - अभिषेक रेलन (८८८८०५६५६० / ९४२२७५०८८८) व रंजन रेलन (९४२२७५०९९९). सेव्हन केमिस्ट भवन, मोदराज हॉटेल जवळ, जुनी महानगरपालिका, धुळे. फोन: ०२५६२-३५५०३३ / २८३९९९."
  },
  {
    id: "gal-2",
    src: "images/veterinary-pharmacy-store.jpg",
    title: "Veterinary Pharmacy & Livestock Dispensary",
    titleMr: "पशुवैद्यकीय औषधालय व गोठा साहित्य केंद्र",
    desc: "Fully-stocked veterinary pharmacy on Parola Road, Lalbaug, Dhule with cattle medicines, liquid calcium, minerals, and pet supplies.",
    descMr: "पारोळा रोड, लालबाग, धुळे येथील पशुवैद्यकीय औषधे, लिक्विड कॅल्शियम, मिनरल मिक्श्चर व डेअरी साहित्याचे परिपूर्ण दालन."
  },
  {
    id: "gal-3",
    src: "images/dairy-cattle-care.jpg",
    title: "Modern Dairy Herd & Ergonomic Rubber Matting",
    titleMr: "आधुनिक गोठा व आरामदायी रबरी काऊ मॅट",
    desc: "Healthy dairy cattle and buffaloes on heavy-duty diamond-grip rubber mats for hoof protection, joint comfort, and shed cleanliness.",
    descMr: "गाई-म्हशींना आरामदायी अँटी-स्किड रबरी मॅट, खुरांचे आजार प्रतिबंध व गोठ्यात स्वच्छता राखण्यासाठी उत्तम व्यवस्था."
  },
  {
    id: "gal-4",
    src: "images/milking-machine-dairy.jpg",
    title: "Electric Milking Machine & Equipment Setup",
    titleMr: "इलेक्ट्रिक मिल्किंग मशीन व स्वच्छ दूध संच",
    desc: "SS 304 food-grade stainless steel single and double bucket milking machines on durable trolley carts with full spare parts support.",
    descMr: "फूड-ग्रेड एसएस ३०४ स्टेनलेस स्टील सिंगल व डबल बकेट मिल्किंग मशीन, जलद दूध काढणी व पूर्ण स्पेअर पार्ट साहाय्य."
  },
  {
    id: "gal-5",
    src: "images/pet-care-nutrition.jpg",
    title: "Pet Healthcare, Nutrition & Accessories",
    titleMr: "पाळीव प्राणी आरोग्य, आहार व ॲक्सेसरीज",
    desc: "Dedicated pet care counter for dog & cat medicines, flea & tick drops, puppy vaccines, branded pet food, harnesses, and leashes.",
    descMr: "कुत्रे व मांजरांचे औषधे, गोचीडनाशक, ब्रँडेड डॉग फूड, ग्रूमिंग उत्पादने व दर्जेदार हार्नेस व पट्टे."
  },
  {
    id: "gal-6",
    src: "images/poultry-healthcare.jpg",
    title: "Commercial Poultry Health & Growth Supplements",
    titleMr: "कुक्कुटपालन आरोग्य व पोषण पूरक औषधे",
    desc: "Complete supplements for commercial broilers, layers, and desi poultry: liver tonics, electrolytes, vitamin AD3E, and sanitizers.",
    descMr: "ब्रॉयलर व लेअर कोंबड्यांसाठी लिव्हर टॉनिक, व्हिटॅमिन्स, अँटी-स्ट्रेस पावडर व पाणी शुद्धीकरण औषधे."
  }
];"""

# Replace GALLERY_IMAGES
import re
gal_pattern = r'const GALLERY_IMAGES = \[[\s\S]*?\];'
if re.search(gal_pattern, data_code):
    data_code = re.sub(gal_pattern, new_gallery, data_code, count=1)
    print("Replaced GALLERY_IMAGES in js/data.js.")
else:
    print("Could not find GALLERY_IMAGES in js/data.js.")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_code)

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_code = f.read()

# Replace Hero right image
old_hero_img = 'src="images/poster-dairy-pet-accessories.webp"\n                  alt="New Seven Pharma Official Creative"'
new_hero_img = 'src="images/veterinary-pharmacy-store.jpg"\n                  alt="New Seven Pharma Store & Veterinary Dispensary"'

if old_hero_img in html_code:
    html_code = html_code.replace(old_hero_img, new_hero_img)
    print("Replaced Hero showcase image.")
else:
    # check alternative
    hero_re = r'src="images/poster-dairy-pet-accessories\.(webp|png)"\s*alt="[^"]*"'
    if re.search(hero_re, html_code):
        html_code = re.sub(hero_re, 'src="images/veterinary-pharmacy-store.jpg" alt="New Seven Pharma Store & Veterinary Dispensary"', html_code, count=1)
        print("Replaced Hero image via regex.")
    else:
        print("WARNING: Could not find hero image in index.html.")

# Add images to 3 Specialized Wings
old_pillar1 = """        <!-- Pillar 1: Dairy & Cattle Wing -->
        <div id="dairy-focus"
          class="group bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init fade-up">
          <div>
            <div
              class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-cow"></i>
            </div>"""

new_pillar1 = """        <!-- Pillar 1: Dairy & Cattle Wing -->
        <div id="dairy-focus"
          class="group bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init fade-up overflow-hidden">
          <div>
            <div class="relative h-44 sm:h-48 -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 mb-5 overflow-hidden bg-slate-900 rounded-t-3xl cursor-pointer" onclick="openLightbox(2)">
              <img src="images/dairy-cattle-care.jpg" alt="Dairy Cattle & Buffalo Care" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="400" height="220" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                <div class="w-8 h-8 rounded-xl bg-emerald-600/90 backdrop-blur flex items-center justify-center text-sm shadow">
                  <i class="fa-solid fa-cow"></i>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-200" data-i18n="navDairy">Dairy &amp; Cattle</span>
              </div>
            </div>"""

old_pillar2 = """        <!-- Pillar 2: Dog & Cat Pet Care Wing -->
        <div id="pets-focus"
          class="group bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init fade-up delay-100">
          <div>
            <div
              class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-dog"></i>
            </div>"""

new_pillar2 = """        <!-- Pillar 2: Dog & Cat Pet Care Wing -->
        <div id="pets-focus"
          class="group bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init fade-up delay-100 overflow-hidden">
          <div>
            <div class="relative h-44 sm:h-48 -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 mb-5 overflow-hidden bg-slate-900 rounded-t-3xl cursor-pointer" onclick="openLightbox(4)">
              <img src="images/pet-care-nutrition.jpg" alt="Dog & Cat Health & Accessories" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="400" height="220" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                <div class="w-8 h-8 rounded-xl bg-sky-600/90 backdrop-blur flex items-center justify-center text-sm shadow">
                  <i class="fa-solid fa-dog"></i>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-sky-200" data-i18n="navPets">Pet Care</span>
              </div>
            </div>"""

old_pillar3 = """        <!-- Pillar 3: Poultry Medicine & Health Wing -->
        <div id="poultry-focus"
          class="group bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init fade-up delay-200">
          <div>
            <div
              class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-feather"></i>
            </div>"""

new_pillar3 = """        <!-- Pillar 3: Poultry Medicine & Health Wing -->
        <div id="poultry-focus"
          class="group bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-init fade-up delay-200 overflow-hidden">
          <div>
            <div class="relative h-44 sm:h-48 -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 mb-5 overflow-hidden bg-slate-900 rounded-t-3xl cursor-pointer" onclick="openLightbox(5)">
              <img src="images/poultry-healthcare.jpg" alt="Poultry Healthcare & Growth" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="400" height="220" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                <div class="w-8 h-8 rounded-xl bg-amber-600/90 backdrop-blur flex items-center justify-center text-sm shadow">
                  <i class="fa-solid fa-feather"></i>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-amber-200" data-i18n="navPoultry">Poultry</span>
              </div>
            </div>"""

if old_pillar1 in html_code:
    html_code = html_code.replace(old_pillar1, new_pillar1)
    print("Updated Pillar 1 with dairy image.")
else:
    print("WARNING: Could not find old_pillar1.")

if old_pillar2 in html_code:
    html_code = html_code.replace(old_pillar2, new_pillar2)
    print("Updated Pillar 2 with pet care image.")
else:
    print("WARNING: Could not find old_pillar2.")

if old_pillar3 in html_code:
    html_code = html_code.replace(old_pillar3, new_pillar3)
    print("Updated Pillar 3 with poultry image.")
else:
    print("WARNING: Could not find old_pillar3.")

# Update gallery grid to 3 columns on desktop for 6 items
old_grid = '<div id="galleryGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">'
new_grid = '<div id="galleryGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">'
if old_grid in html_code:
    html_code = html_code.replace(old_grid, new_grid)
    print("Updated galleryGrid classes.")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_code)

print("Saved index.html successfully!")

