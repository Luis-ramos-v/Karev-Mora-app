import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      background: string;
      buttonHover: string;
      buttonBg: string;
      warning: string;
    };
    fonts: {
      title: string;
      subtitle: string;
      text: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
      text: string;
    };
    zIndex: {
      background: number;
      content: number;
      overlay: number;
      modal: number;
      dropdown: number;
      tooltip: number;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      pill: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    spacing: {
      container: string;
      linkGap: string;
      headerMargin: string;
    };
  }
} 