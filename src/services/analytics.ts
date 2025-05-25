import { detectBrowser } from '../utils/browserDetection';

// Analytics event types
export type AnalyticsEventType =
  | 'page_view'
  | 'link_click'
  | 'theme_change'
  | 'browser_warning'
  | 'error'
  | 'app_install'
  | 'share';

// Analytics event parameters
export interface AnalyticsEventParams {
  // Common parameters
  timestamp?: number;
  session_id?: string;
  user_agent?: string;

  // Page view parameters
  page_path?: string;
  page_title?: string;
  page_referrer?: string;

  // Link click parameters
  link_url?: string;
  link_text?: string;
  link_type?: string;
  link_category?: string;
  link_success?: boolean;

  // Browser parameters
  browser_name?: string;
  browser_version?: string;
  browser_language?: string;
  is_mobile?: boolean;
  is_in_app?: boolean;
  device_type?: string;
  os_name?: string;
  os_version?: string;

  // Error parameters
  error_type?: string;
  error_message?: string;
  error_stack?: string;

  // Custom parameters
  [key: string]: any;
}

// Analytics configuration
const ANALYTICS_CONFIG = {
  trackingId: 'G-KZXQE4X007',
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  maxEventQueueSize: 100,
  debug: process.env.NODE_ENV === 'development',
} as const;

// Session management
let sessionId: string | null = null;
let lastEventTime: number = 0;
const eventQueue: Array<{ type: AnalyticsEventType; params: AnalyticsEventParams }> = [];

// Generate a unique session ID
const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

// Get or create session ID
const getSessionId = (): string => {
  if (!sessionId || Date.now() - lastEventTime > ANALYTICS_CONFIG.sessionTimeout) {
    sessionId = generateSessionId();
  }
  lastEventTime = Date.now();
  return sessionId;
};

// Get browser and device information
const getBrowserInfo = () => {
  const browserInfo = detectBrowser();
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  return {
    browser_name: browserInfo.name,
    browser_version: browserInfo.version,
    browser_language: language,
    is_mobile: browserInfo.isMobile,
    is_in_app: browserInfo.isInAppBrowser,
    device_type: browserInfo.isMobile ? 'mobile' : 'desktop',
    os_name: browserInfo.isMobile ? (browserInfo.isIOSBrowser ? 'iOS' : 'Android') : 'desktop',
    os_version: 'unknown', // We could parse this from userAgent if needed
    user_agent: userAgent,
  };
};

// Queue an event for sending
const queueEvent = (type: AnalyticsEventType, params: AnalyticsEventParams) => {
  const event = {
    type,
    params: {
      ...params,
      timestamp: Date.now(),
      session_id: getSessionId(),
      ...getBrowserInfo(),
    },
  };

  eventQueue.push(event);

  // Trim queue if it gets too large
  if (eventQueue.length > ANALYTICS_CONFIG.maxEventQueueSize) {
    eventQueue.shift();
  }

  // Send event immediately
  sendEvent(event);
};

// Send event to Google Analytics
const sendEvent = (event: { type: AnalyticsEventType; params: AnalyticsEventParams }) => {
  if (typeof window.gtag !== 'function') {
    if (ANALYTICS_CONFIG.debug) {
      console.warn('Google Analytics not initialized');
    }
    return;
  }

  try {
    window.gtag('event', event.type, event.params);

    if (ANALYTICS_CONFIG.debug) {
      console.log('Analytics event sent:', event);
    }
  } catch (error) {
    if (ANALYTICS_CONFIG.debug) {
      console.error('Failed to send analytics event:', error);
    }
  }
};

// Public API
export const analytics = {
  // Track page view
  trackPageView: (params: AnalyticsEventParams) => {
    queueEvent('page_view', {
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
      page_referrer: document.referrer,
      ...params,
    });
  },

  // Track link click
  trackLinkClick: (params: AnalyticsEventParams) => {
    queueEvent('link_click', params);
  },

  // Track theme change
  trackThemeChange: (theme: string) => {
    queueEvent('theme_change', { theme });
  },

  // Track browser warning
  trackBrowserWarning: (warningType: string) => {
    queueEvent('browser_warning', { warning_type: warningType });
  },

  // Track error
  trackError: (error: Error, context?: string) => {
    queueEvent('error', {
      error_type: error.name,
      error_message: error.message,
      error_stack: error.stack,
      error_context: context,
    });
  },

  // Track app install prompt
  trackAppInstall: (outcome: 'accepted' | 'declined' | 'dismissed') => {
    queueEvent('app_install', { outcome });
  },

  // Track share
  trackShare: (platform: string, content: string) => {
    queueEvent('share', { platform, content });
  },

  // Custom event
  trackCustomEvent: (type: AnalyticsEventType, params: AnalyticsEventParams) => {
    queueEvent(type, params);
  },
};
