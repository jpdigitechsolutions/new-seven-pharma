/**
 * ============================================================================
 * GOOGLE FIREBASE ANALYTICS & GOOGLE ANALYTICS 4 (GA4) INTEGRATION
 * Project: New Seven Pharma (Veterinary & Agricultural Healthcare, Dhule)
 * ============================================================================
 * 
 * 📌 कशा प्रकारे FIREBASE ANALYTICS चालू करावे (HOW TO ACTIVATE):
 * 1. Visit https://console.firebase.google.com/
 * 2. Add or select your Firebase Project.
 * 3. Ensure Google Analytics is turned on for the project.
 * 4. Register a Web App (</>) named "New Seven Pharma".
 * 5. Replace the placeholder values in `firebaseConfig` below with your project keys.
 * ============================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, logEvent, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// ⚙️ FIREBASE CONFIGURATION (REPLACE WITH YOUR PROJECT DETAILS):
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXXXXX" // Google Analytics 4 Measurement ID
};

const APP_NAME = "New Seven Pharma";

// Check if actual configuration has been provided
const isConfigured = Boolean(
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.includes("REPLACE_") &&
  !firebaseConfig.apiKey.includes("YOUR_")
);

let analytics = null;
let firebaseApp = null;

/**
 * Initialize Firebase & Google Analytics 4 safely
 */
async function initFirebase() {
  if (!isConfigured) {
    console.info(
      `%c[Firebase Analytics - ${APP_NAME}]%c\nℹ️ Ready for setup! Add your Firebase keys in 'js/firebase-analytics.js' to track live orders, prescription uploads, and calls.`,
      "color: #059669; font-weight: bold; font-size: 11px;",
      "color: #94a3b8; font-size: 11px;"
    );
    return;
  }

  try {
    const supported = await isSupported();
    if (supported) {
      firebaseApp = initializeApp(firebaseConfig);
      analytics = getAnalytics(firebaseApp);
      
      // Initial page view event
      logEvent(analytics, "page_view", {
        app_name: APP_NAME,
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });

      console.info(
        `%c[Firebase Analytics - Active]%c Connected to Google Analytics GA4 (${firebaseConfig.measurementId || 'Active'})`,
        "color: #10b981; font-weight: bold;",
        "color: #64748b;"
      );
    }
  } catch (error) {
    console.error(`[Firebase Analytics Init Error]:`, error);
  }
}

/**
 * Universal Event Tracker
 * @param {string} eventName - e.g., 'prescription_upload', 'calculator_order', 'phone_call'
 * @param {object} params - Additional event data
 */
export function trackEvent(eventName, params = {}) {
  try {
    const enriched = {
      app_name: APP_NAME,
      timestamp: new Date().toISOString(),
      ...params
    };

    if (analytics) {
      logEvent(analytics, eventName, enriched);
    } else {
      // In development / demo mode:
      // console.debug(`[Analytics Event Tracked]: ${eventName}`, enriched);
    }
  } catch (err) {
    console.warn(`[Analytics Logging Error] for '${eventName}':`, err);
  }
}

// Attach globally to window
window.trackEvent = trackEvent;
window.sevenPharmaAnalytics = {
  trackEvent,
  getAnalytics: () => analytics,
  getApp: () => firebaseApp,
  isReady: () => Boolean(analytics)
};

// Initialize
initFirebase();

/**
 * Automatic Event Tracking for interactive elements
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. WhatsApp Order / Chat Button Clicks
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("whatsapp_click", {
        href: el.getAttribute("href") || "",
        text: (el.textContent || "").trim().substring(0, 50),
        placement: el.closest("header, section, aside, div")?.id || "page"
      });
    });
  });

  // 2. Direct Phone Calls (8888056560, Landlines)
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("phone_call_click", {
        phone_number: el.getAttribute("href").replace("tel:", ""),
        placement: el.closest("header, section, aside, div")?.id || "page"
      });
    });
  });

  // 3. Category Filter Tab Clicks
  document.querySelectorAll(".cat-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      trackEvent("category_filter_click", {
        category: pill.getAttribute("data-cat") || pill.textContent?.trim()
      });
    });
  });

  // 4. Prescription Modal Open Trigger
  document.querySelectorAll('[onclick*="openPrescriptionModal"]').forEach(btn => {
    btn.addEventListener("click", () => {
      trackEvent("prescription_modal_open", {
        source: btn.textContent?.trim().substring(0, 40)
      });
    });
  });

  // 5. Google Maps Store Directions Click
  document.querySelectorAll('a[href*="google.com/maps"]').forEach(link => {
    link.addEventListener("click", () => {
      trackEvent("store_location_click", {
        url: link.getAttribute("href") || ""
      });
    });
  });
});

