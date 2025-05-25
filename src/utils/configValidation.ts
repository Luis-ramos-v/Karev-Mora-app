import { AppConfig } from '@/types/config';

export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

export function validateConfig(config: AppConfig): void {
  // Validate brand
  if (!config.brand?.name || !config.brand?.tagline) {
    throw new ConfigValidationError('Brand name and tagline are required');
  }

  // Validate colors
  const requiredColors = ['primary', 'secondary', 'accent', 'text', 'buttonHover'];
  for (const color of requiredColors) {
    if (!config.brand.colors[color as keyof typeof config.brand.colors]) {
      throw new ConfigValidationError(`Brand color '${color}' is required`);
    }
  }

  // Validate links
  if (!Array.isArray(config.links) || config.links.length === 0) {
    throw new ConfigValidationError('At least one link is required');
  }

  for (const link of config.links) {
    if (!link.id || !link.url || !link.icon || !link.text) {
      throw new ConfigValidationError('Link must have id, url, icon, and text');
    }
  }

  // Validate URLs
  if (!config.urls?.baseUrl) {
    throw new ConfigValidationError('Base URL is required');
  }

  // Validate analytics
  if (!config.analytics?.googleAnalyticsId) {
    throw new ConfigValidationError('Google Analytics ID is required');
  }

  // Validate browser detection
  if (!Array.isArray(config.browserDetection?.inAppBrowsers)) {
    throw new ConfigValidationError('In-app browsers list is required');
  }

  // Validate messages
  const requiredMessages = ['welcome', 'errors.unsupportedBrowser', 'errors.recursion'];
  for (const message of requiredMessages) {
    const parts = message.split('.');
    let current: any = config.messages;
    for (const part of parts) {
      if (!current?.[part]) {
        throw new ConfigValidationError(`Message '${message}' is required`);
      }
      current = current[part];
    }
  }

  // Validate fonts
  const requiredFonts = ['title', 'subtitle', 'text'];
  for (const font of requiredFonts) {
    if (
      !config.fonts?.[font as keyof typeof config.fonts]?.googleFontsUrl ||
      !config.fonts?.[font as keyof typeof config.fonts]?.fontFamily
    ) {
      throw new ConfigValidationError(`Font '${font}' must have googleFontsUrl and fontFamily`);
    }
  }

  // Validate backgrounds
  if (!Array.isArray(config.backgrounds) || config.backgrounds.length === 0) {
    throw new ConfigValidationError('At least one background image is required');
  }
}

export function validateEnvConfig(): void {
  const requiredEnvVars = [
    'VITE_APP_TITLE',
    'VITE_APP_DESCRIPTION',
    'VITE_APP_BASE_URL',
    'VITE_GOOGLE_ANALYTICS_ID',
    'VITE_APP_VERSION',
  ];

  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      throw new ConfigValidationError(`Environment variable '${envVar}' is required`);
    }
  }
}
