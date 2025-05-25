import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../services/analytics';

const GA_TRACKING_ID = 'G-KZXQE4X007';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initializeGA = () => {
  // Load the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    send_page_view: false, // We'll handle page views manually
    debug_mode: process.env.NODE_ENV === 'development',
  });

  // Track initial page view
  analytics.trackPageView({
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    page_referrer: document.referrer,
  });
};

// Custom hook for tracking page views
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView({
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return analytics;
};
