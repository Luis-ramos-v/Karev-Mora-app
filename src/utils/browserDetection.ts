interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
  isMobile: boolean;
  isInAppBrowser: boolean;
  isIOSBrowser: boolean;
  isAndroidBrowser: boolean;
  browserPackage?: string;
}

const IN_APP_BROWSERS = [
  "Instagram", "FBAN", "FBAV", "Messenger", "Line", "Snapchat", "TikTok", "Reddit", "X"
];

const IOS_BROWSERS = [
  "Safari", "CriOS", "FxiOS", "EdgiOS"
];

const ANDROID_BROWSERS = [
  { name: "Chrome", package: "com.android.chrome" },
  { name: "Firefox", package: "org.mozilla.firefox" },
  { name: "Edge", package: "com.microsoft.emmx" },
  { name: "Brave", package: "com.brave.browser" }
];

export const detectBrowser = (): BrowserInfo => {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  let isSupported = true;
  let isInAppBrowser = false;
  let isIOSBrowser = false;
  let isAndroidBrowser = false;
  let browserPackage: string | undefined;

  // Check for in-app browsers
  isInAppBrowser = IN_APP_BROWSERS.some(browser => ua.includes(browser));

  // Check for iOS browsers
  isIOSBrowser = IOS_BROWSERS.some(browser => ua.includes(browser));

  // Check for Android browsers
  const androidBrowser = ANDROID_BROWSERS.find(browser => ua.includes(browser.name));
  if (androidBrowser) {
    browserName = androidBrowser.name;
    browserPackage = androidBrowser.package;
    isAndroidBrowser = true;
  }

  // Detect browser name and version if not already set
  if (browserName === 'Unknown') {
    if (ua.includes('Firefox/')) {
      browserName = 'Firefox';
      browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
      isSupported = parseInt(browserVersion) >= 78;
    } else if (ua.includes('Chrome/') && !ua.includes('Edg/') && !ua.includes('OPR/')) {
      browserName = 'Chrome';
      browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
      isSupported = parseInt(browserVersion) >= 80;
    } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
      browserName = 'Safari';
      browserVersion = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
      isSupported = parseInt(browserVersion) >= 13;
    } else if (ua.includes('Edg/')) {
      browserName = 'Edge';
      browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
      isSupported = parseInt(browserVersion) >= 80;
    } else if (ua.includes('OPR/')) {
      browserName = 'Opera';
      browserVersion = ua.match(/OPR\/(\d+)/)?.[1] || 'Unknown';
      isSupported = parseInt(browserVersion) >= 67;
    } else if (ua.includes('MSIE ') || ua.includes('Trident/')) {
      browserName = 'Internet Explorer';
      browserVersion = ua.match(/(?:MSIE |rv:)(\d+)/)?.[1] || 'Unknown';
      isSupported = false;
    }
  }

  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return {
    name: browserName,
    version: browserVersion,
    isSupported,
    isMobile,
    isInAppBrowser,
    isIOSBrowser,
    isAndroidBrowser,
    browserPackage
  };
};

export const getBrowserWarning = (browserInfo: BrowserInfo): string | null => {
  if (browserInfo.isInAppBrowser) {
    return 'Please open this link in your default browser for the best experience.';
  }

  if (!browserInfo.isSupported) {
    if (browserInfo.name === 'Internet Explorer') {
      return 'Internet Explorer is not supported. Please use a modern browser like Chrome, Firefox, Safari, or Edge.';
    }
    return `Your version of ${browserInfo.name} (${browserInfo.version}) is not supported. Please update to the latest version.`;
  }

  if (browserInfo.isIOSBrowser && browserInfo.isMobile) {
    return 'For the best experience, please use Chrome or Firefox on iOS.';
  }

  return null;
}; 