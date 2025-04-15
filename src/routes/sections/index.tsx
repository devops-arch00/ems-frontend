import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { Suspense } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import ExceptionReportPage from 'src/pages/dashboard/exception-report';
import { mainRoutes, HomePage } from './main';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes, IndexPage } from './dashboard';
import { componentsRoutes } from './components';
import SiteReportPage from '../../pages/dashboard/site-report';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      // element: (
      //   <MainLayout>
      //     <HomePage />
      //   </MainLayout>
      // ),
      element: (
        // <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        // </AuthGuard>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'exception-report', element: <ExceptionReportPage /> },
        { path: 'Site-report', element: <SiteReportPage /> },
        // { path: 'settings', element: <SettingsPage /> },
        // { path: 'users', element: <UsersPage /> },
        // Add more child routes as needed
      ],
    },

    // Auth routes
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
