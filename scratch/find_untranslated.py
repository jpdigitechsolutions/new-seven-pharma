from html.parser import HTMLParser
import re

class TextCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tag_stack = []
        self.untranslated = []
        self.dynamic_ids = {
            'productsGrid', 'continuousSliderTrack', 'categoryFilters', 
            'galleryGrid', 'servicesContainer', 'faqsAccordion', 
            'cartItemsList', 'storeLiveStatus', 'mobileStoreLiveStatus', 
            'quickViewContent', 'cartSummaryArea'
        }
        self.ignored_tags = {'script', 'style', 'meta', 'link', 'svg', 'path', 'iframe'}

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        has_i18n = 'data-i18n' in attr_dict
        tag_id = attr_dict.get('id', '')
        is_dynamic = tag_id in self.dynamic_ids
        
        parent_has_i18n = self.tag_stack[-1]['has_i18n'] if self.tag_stack else False
        parent_is_dyn = self.tag_stack[-1]['is_dyn'] if self.tag_stack else False

        self.tag_stack.append({
            'tag': tag,
            'id': tag_id,
            'has_i18n': has_i18n or parent_has_i18n,
            'is_dyn': is_dynamic or parent_is_dyn
        })

    def handle_endtag(self, tag):
        if self.tag_stack:
            self.tag_stack.pop()

    def handle_data(self, data):
        text = data.strip()
        if not text or len(text) <= 2:
            return
        if text.isdigit() or re.match(r'^[0-9\-\+\(\)\s\:\.\/\|•–₹%,!]+$', text):
            return
        if text in ['NEW SEVEN', 'PHARMA', 'New Seven Pharma', 'EN / मराठी']:
            return
        
        current = self.tag_stack[-1] if self.tag_stack else None
        if not current:
            return
        if current['tag'] in self.ignored_tags:
            return
        if current['has_i18n'] or current['is_dyn']:
            return

        self.untranslated.append((current['tag'], current['id'], text))

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

parser = TextCollector()
parser.feed(content)

print(f"Total untranslated text strings: {len(parser.untranslated)}")
with open('scratch/untranslated_report.txt', 'w', encoding='utf-8') as out:
    for i, (tag, tag_id, text) in enumerate(parser.untranslated):
        id_str = f" id='{tag_id}'" if tag_id else ""
        out.write(f"{i+1}. <{tag}{id_str}>: {text}\n")
