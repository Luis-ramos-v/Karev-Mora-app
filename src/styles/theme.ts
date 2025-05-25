import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF2D55',
    text: '#000000',
    background: '#FFFFFF',
    buttonHover: '#0056b3',
    buttonBg: '#f8f9fa',
    warning: '#ff3b30',
  },
  fonts: {
    title: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    subtitle: 'SF Pro Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    text: 'SF Pro Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.12)',
    large: '0 8px 16px rgba(0, 0, 0, 0.14)',
    text: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  zIndex: {
    background: 0,
    content: 1,
    overlay: 100,
    modal: 200,
    dropdown: 300,
    tooltip: 400,
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    pill: '9999px',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    container: '20px',
    linkGap: '16px',
    headerMargin: '24px',
  },
}; 