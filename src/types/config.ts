export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  buttonHover: string;
}

export interface Brand {
  name: string;
  tagline: string;
  colors: BrandColors;
}

export interface Link {
  id: string;
  url: string;
  icon: string;
  text: string;
  subtext?: string;
}

export interface Urls {
  landingPage: string;
  linksPage: string;
  baseUrl: string;
}

export interface Analytics {
  googleAnalyticsId: string;
  trackEvents: boolean;
}

export interface AndroidBrowser {
  name: string;
  package: string;
}

export interface BrowserDetection {
  inAppBrowsers: string[];
  iosBrowsers: string[];
  androidBrowsers: AndroidBrowser[];
}

export interface Message {
  title: string;
  message: string;
}

export interface ErrorMessages {
  unsupportedBrowser: Message;
  recursion: Message;
}

export interface Messages {
  welcome: Message;
  errors: ErrorMessages;
}

export interface Font {
  googleFontsUrl: string;
  fontFamily: string;
}

export interface Fonts {
  title: Font;
  subtitle: Font;
  text: Font;
}

export interface AppConfig {
  brand: Brand;
  links: Link[];
  urls: Urls;
  analytics: Analytics;
  browserDetection: BrowserDetection;
  messages: Messages;
  fonts: Fonts;
  backgrounds: string[];
}

// Environment configuration
export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  VITE_APP_TITLE: string;
  VITE_APP_DESCRIPTION: string;
  VITE_APP_BASE_URL: string;
  VITE_GOOGLE_ANALYTICS_ID: string;
  VITE_APP_VERSION: string;
}
