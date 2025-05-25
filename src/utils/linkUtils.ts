import { trackEvent } from '../hooks/useAnalytics';
import { detectBrowser } from './browserDetection';

interface OpenLinkOptions {
  url: string;
  eventName?: string;
  eventParams?: Record<string, any>;
}

const openInDefaultBrowser = (url: string): boolean => {
  const browserInfo = detectBrowser();

  // For iOS devices
  if (browserInfo.isIOSBrowser) {
    // Try to open in Safari first
    window.location.href = url;
    return true;
  }

  // For Android devices
  if (browserInfo.isAndroidBrowser && browserInfo.browserPackage) {
    // Try to open in the default browser using intent
    const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;package=${browserInfo.browserPackage};scheme=https;end`;
    window.location.href = intentUrl;
    return true;
  }

  // For desktop browsers
  if (!browserInfo.isMobile) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  }

  // Fallback for other mobile browsers
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};

export const openExternalLink = ({ url, eventName, eventParams }: OpenLinkOptions) => {
  const browserInfo = detectBrowser();

  // Track the link click
  if (eventName) {
    trackEvent(eventName, {
      link_url: url,
      browser_name: browserInfo.name,
      browser_version: browserInfo.version,
      is_mobile: browserInfo.isMobile,
      is_in_app: browserInfo.isInAppBrowser,
      ...eventParams,
    });
  }

  // If we're in an in-app browser, show a warning and don't open the link
  if (browserInfo.isInAppBrowser) {
    // The warning will be shown by the BrowserWarning component
    return false;
  }

  // Try to open in default browser
  return openInDefaultBrowser(url);
};
