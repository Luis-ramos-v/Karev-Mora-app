import { createGlobalStyle } from 'styled-components';
import config from '@/config';

export const GlobalStyles = createGlobalStyle`
  @import url(${config.fonts.title.googleFontsUrl});
  @import url(${config.fonts.subtitle.googleFontsUrl});
  @import url(${config.fonts.text.googleFontsUrl});

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.text};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.title};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: 2.5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 3.5rem;
    }
  }

  h2 {
    font-size: 2rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
  }

  h3 {
    font-size: 1.75rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.text};
    border: none;
    background: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  /* Selection styles */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }

  /* Focus styles */
  :focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  /* Remove focus styles for mouse users */
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Utility classes */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
