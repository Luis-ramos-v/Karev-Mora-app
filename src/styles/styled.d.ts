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
    };
    fonts: {
      title: string;
      subtitle: string;
      text: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    transitions: {
      default: string;
      slow: string;
    };
    shadows: {
      text: string;
    };
    spacing: {
      container: string;
      linkGap: string;
      headerMargin: string;
    };
    borderRadius: {
      pill: string;
    };
    zIndex: {
      background: number;
      content: number;
      overlay: number;
      modal: number;
    };
  }
} 