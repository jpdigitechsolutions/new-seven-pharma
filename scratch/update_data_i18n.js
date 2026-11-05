const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'data.js');
let code = fs.readFileSync(filePath, 'utf8');

const enAdditions = `    "topLocation": "Parola Road, Lalbaug, Dhule",\r\n    "topTimings": "9:30 AM – 9:30 PM (All 7 Days)",\r\n    "topDelivery": "Free Farm Delivery Across Dhule Area (T&C Apply)",\r\n    "topCattle": "Veterinary Medicines, Injections & Deworming Bolus",\r\n    "topEquip": "Milking Machines & Cow Comfort Rubber Shed Mats",\r\n    "topFeed": "Calcium, Mineral Mixture & Feed Supplements",\r\n    "topPets": "Pet Nutrition, Shampoos & Healthcare Range",\r\n    "topPoultry": "Poultry Growth Tonics & Health Products",\r\n    "topCall": "Call: 8888056560 / 9422750999",\r\n    "topWhatsApp": "WhatsApp: 8530757226",`;

const mrAdditions = `    "topLocation": "पारोळा रोड, लालबाग, धुळे",\r\n    "topTimings": "सकाळी ९:३० ते रात्री ९:३० (सर्व ७ दिवस)",\r\n    "topDelivery": "धुळे शहर व परिसरातील गोठ्यांवर मोफत डिलिव्हरी (अटी लागू)",\r\n    "topCattle": "जनावरांची औषधे, इंजेक्शन्स व जंतनाशक बोलस",\r\n    "topEquip": "मिल्किंग मशिन्स व गोठा रबरी मॅट्स",\r\n    "topFeed": "कॅल्शियम, मिनरल मिक्स्चर व पूरक पशुखाद्य",\r\n    "topPets": "श्वान व मांजरांचे खाद्य, शाम्पू व औषधे",\r\n    "topPoultry": "पोल्ट्री ग्रोथ टॉनिक्स व आरोग्य उत्पादने",\r\n    "topCall": "संपर्क: ८८८८०५६५६० / ९४२२७५०९९९",\r\n    "topWhatsApp": "व्हॉट्सॲप: ८५३०७५७२२६",`;

code = code.replace(/    "topLocation": "Parola Road, Lalbaug, Dhule",\r?\n    "topTimings": "9:30 AM – 9:30 PM \(All 7 Days\)",/, enAdditions);
code = code.replace(/    "topLocation": "पारोळा रोड, लालबाग, धुळे",\r?\n    "topTimings": "सकाळी ९:३० ते रात्री ९:३० \(सर्व ७ दिवस\)",/, mrAdditions);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated js/data.js with new top marquee keys');

