import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Lazy load page components
const Home = lazy(() => import('../pages/Home'));
const Links = lazy(() => import('../pages/Links'));
const About = lazy(() => import('../pages/About'));
const Projects = lazy(() => import('../pages/Projects'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh' 
  }}>
    <LoadingSpinner size={48} />
  </div>
);

// Route wrapper component for consistent error handling and loading states
const RouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RouteWrapper>
        <Home />
      </RouteWrapper>
    ),
  },
  {
    path: '/links',
    element: (
      <RouteWrapper>
        <Links />
      </RouteWrapper>
    ),
  },
  {
    path: '/about',
    element: (
      <RouteWrapper>
        <About />
      </RouteWrapper>
    ),
  },
  {
    path: '/projects',
    element: (
      <RouteWrapper>
        <Projects />
      </RouteWrapper>
    ),
  },
  {
    path: '/contact',
    element: (
      <RouteWrapper>
        <Contact />
      </RouteWrapper>
    ),
  },
  {
    path: '*',
    element: (
      <RouteWrapper>
        <NotFound />
      </RouteWrapper>
    ),
  },
]; 