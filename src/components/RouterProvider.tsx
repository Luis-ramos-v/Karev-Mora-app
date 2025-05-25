import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider as BaseRouterProvider } from 'react-router-dom';
import { routes } from '../routes';

export const RouterProvider = () => {
  const router = useMemo(() => createBrowserRouter(routes), []);

  return <BaseRouterProvider router={router} />;
};
