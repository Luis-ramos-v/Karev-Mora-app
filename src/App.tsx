import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { useTheme } from './hooks/useTheme';
import { useAnalytics } from './hooks/useAnalytics';
import { useActivityTracking } from './hooks/useActivityTracking';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { BrowserWarning } from './components/common/BrowserWarning';
import { AppRoutes } from './routes';

// Initialize analytics
initializeGA();

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const analytics = useAnalytics();
  useActivityTracking(); // Add activity tracking

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <BrowserWarning />
          <Suspense fallback={<LoadingSpinner size={48} />}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
