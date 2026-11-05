import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Header sticky verification
assert 'id="siteHeader"' in html, 'Missing siteHeader ID'
assert 'class="sticky top-0 z-50' in html, 'Missing sticky class on siteHeader'
assert '#siteHeader' in css and 'position: sticky' in css, 'Missing sticky CSS for #siteHeader'

# 2. Check overflow bug fix (which previously broke position: sticky)
assert 'overflow-x: hidden;' not in css[:200], 'Found overflow-x: hidden in root html/body'
assert 'overflow-x: clip;' in css, 'Missing overflow-x: clip on body'

# 3. 3rd card verification
assert 'Intas, Virbac, Cadila & more' not in html, 'Found leftover text in 3rd card'
assert html.count('>100% Genuine Pharma<') == 1, f"Expected 1 user-facing occurrence of 100% Genuine Pharma, got {html.count('>100% Genuine Pharma<')}"

print("[PASS] All 3rd-card and sticky-header regression checks PASSED!")
