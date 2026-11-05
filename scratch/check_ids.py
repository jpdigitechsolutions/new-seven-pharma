import re

with open('js/main.js', 'r', encoding='utf-8') as f:
    js_text = f.read()

ids_in_js = set(re.findall(r"document\.getElementById\(['\"]([^'\"]+)['\"]\)", js_text))
print(f"Total getElementById in main.js: {len(ids_in_js)}")
for id_name in sorted(ids_in_js):
    print("JS ID:", id_name)

with open('index.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

ids_in_html = set(re.findall(r'id=["\']([^"\']+)["\']', html_text))

missing = ids_in_js - ids_in_html
print(f"\nMissing IDs in index.html ({len(missing)}):")
for m in sorted(missing):
    print("  MISSING:", m)

