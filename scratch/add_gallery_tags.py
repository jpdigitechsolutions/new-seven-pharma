# scratch/add_gallery_tags.py
with open('js/data.js', 'r', encoding='utf-8') as f:
    c = f.read()

replacements = [
    ('id: "gal-1",', 'id: "gal-1",\n    tag: "Verified Identity",\n    tagMr: "प्रमाणित ओळख",'),
    ('id: "gal-2",', 'id: "gal-2",\n    tag: "Veterinary Pharmacy",\n    tagMr: "पशुवैद्यकीय औषधालय",'),
    ('id: "gal-3",', 'id: "gal-3",\n    tag: "Dairy Cattle & Mats",\n    tagMr: "डेअरी गोठा व रबरी मॅट",'),
    ('id: "gal-4",', 'id: "gal-4",\n    tag: "Milking Equipment",\n    tagMr: "मिल्किंग मशीन संच",'),
    ('id: "gal-5",', 'id: "gal-5",\n    tag: "Pet Care & Nutrition",\n    tagMr: "पाळीव प्राणी आरोग्य",'),
    ('id: "gal-6",', 'id: "gal-6",\n    tag: "Poultry Flock Care",\n    tagMr: "कुक्कुटपालन आरोग्य",'),
]

for old, new in replacements:
    if old in c:
        c = c.replace(old, new, 1)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(c)

print('Added tags to GALLERY_IMAGES.')

with open('js/main.js', 'r', encoding='utf-8') as f:
    main_code = f.read()

old_badge = "${isMr ? 'अधिकृत फलक / कार्ड' : 'Official Notice'}"
new_badge = "${isMr ? (img.tagMr || 'दुकान माहिती') : (img.tag || 'Store Showcase')}"

if old_badge in main_code:
    main_code = main_code.replace(old_badge, new_badge)
    with open('js/main.js', 'w', encoding='utf-8') as f:
        f.write(main_code)
    print('Updated renderGallery in js/main.js.')
else:
    print('Could not find old_badge in main.js.')

