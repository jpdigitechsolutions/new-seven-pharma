const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, '..', 'js', 'main.js');
let code = fs.readFileSync(mainJsPath, 'utf8');

const oldFunc = `// 7. REAL-TIME STORE OPEN/CLOSED STATUS (Asia/Kolkata Timezone)
function initLiveStoreStatus() {
  const statusBadge = document.getElementById('storeLiveStatus');
  const mobileStatusBadge = document.getElementById('mobileStoreLiveStatus');
  if (!statusBadge && !mobileStatusBadge) return;

  function checkStatus() {
    try {
      const kolkataFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: STORE_CONFIG.timeZone || 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const parts = kolkataFormatter.formatToParts(new Date());
      const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
      const minute = parseInt(parts.find(p => p.type === 'minute').value, 10);
      const currentMinutes = hour * 60 + minute;

      const openMinutes = STORE_CONFIG.timingHours.openHour * 60 + STORE_CONFIG.timingHours.openMinute; // 9:30 AM = 570
      const closeMinutes = STORE_CONFIG.timingHours.closeHour * 60 + STORE_CONFIG.timingHours.closeMinute; // 9:30 PM = 1290

      // Exact boundary: 09:30 inclusive up to 21:30 exclusive
      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
      const isMarathi = appState.lang === 'mr';

      const statusHtml = isOpen
        ? \`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
             <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
             <span class="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5"></span>
             \${isMarathi ? 'आता सुरू आहे (९:३० AM - ९:३० PM)' : 'Open Now (9:30 AM - 9:30 PM)'}
           </span>\`
        : \`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
             <span class="w-2 h-2 rounded-full bg-amber-500"></span>
             \${isMarathi ? 'दुकान बंद आहे (सकाळी ९:३० वाजता उघडेल)' : 'Closed Now (Opens at 9:30 AM)'}
           </span>\`;

      if (statusBadge) statusBadge.innerHTML = statusHtml;
      if (mobileStatusBadge) mobileStatusBadge.innerHTML = statusHtml;
    } catch (e) {
      console.warn('Error calculating store status:', e);
    }
  }

  checkStatus();
  setInterval(checkStatus, 60000);
}`;

const newFunc = `// 7. REAL-TIME STORE OPEN/CLOSED STATUS (Asia/Kolkata Timezone)
function initLiveStoreStatus() {
  const statusBadge = document.getElementById('storeLiveStatus');
  const mobileStatusBadge = document.getElementById('mobileStoreLiveStatus');
  const allMarqueeBadges = document.querySelectorAll('.store-live-status-badge');
  if (!statusBadge && !mobileStatusBadge && allMarqueeBadges.length === 0) return;

  function checkStatus() {
    try {
      const kolkataFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: STORE_CONFIG.timeZone || 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const parts = kolkataFormatter.formatToParts(new Date());
      const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
      const minute = parseInt(parts.find(p => p.type === 'minute').value, 10);
      const currentMinutes = hour * 60 + minute;

      const openMinutes = STORE_CONFIG.timingHours.openHour * 60 + STORE_CONFIG.timingHours.openMinute; // 9:30 AM = 570
      const closeMinutes = STORE_CONFIG.timingHours.closeHour * 60 + STORE_CONFIG.timingHours.closeMinute; // 9:30 PM = 1290

      // Exact boundary: 09:30 inclusive up to 21:30 exclusive
      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
      const isMarathi = appState.lang === 'mr';

      // Dark badge for top marquee ticker
      const marqueeBadgeHtml = isOpen
        ? \`<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3"></span>
             \${isMarathi ? 'आता सुरू आहे (९:३० AM - ९:३० PM)' : 'Open Now (9:30 AM - 9:30 PM)'}
           </span>\`
        : \`<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
             <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
             \${isMarathi ? 'दुकान बंद आहे (सकाळी ९:३० वाजता उघडेल)' : 'Closed Now (Opens at 9:30 AM)'}
           </span>\`;

      // Light badge for mobile drawer
      const standardBadgeHtml = isOpen
        ? \`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
             <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
             <span class="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5"></span>
             \${isMarathi ? 'आता सुरू आहे (९:३० AM - ९:३० PM)' : 'Open Now (9:30 AM - 9:30 PM)'}
           </span>\`
        : \`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
             <span class="w-2 h-2 rounded-full bg-amber-500"></span>
             \${isMarathi ? 'दुकान बंद आहे (सकाळी ९:३० वाजता उघडेल)' : 'Closed Now (Opens at 9:30 AM)'}
           </span>\`;

      if (statusBadge) statusBadge.innerHTML = marqueeBadgeHtml;
      document.querySelectorAll('.store-live-status-badge').forEach(el => {
        el.innerHTML = marqueeBadgeHtml;
      });
      if (mobileStatusBadge) mobileStatusBadge.innerHTML = standardBadgeHtml;
    } catch (e) {
      console.warn('Error calculating store status:', e);
    }
  }

  checkStatus();
  setInterval(checkStatus, 60000);
}`;

const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldFunc.replace(/\r\n/g, '\n');

if (normalizedCode.includes(normalizedOld)) {
  const updated = normalizedCode.replace(normalizedOld, newFunc.replace(/\r\n/g, '\n'));
  fs.writeFileSync(mainJsPath, updated, 'utf8');
  console.log('Successfully updated initLiveStoreStatus in js/main.js');
} else {
  console.error('Could not find matching function in js/main.js');
}

