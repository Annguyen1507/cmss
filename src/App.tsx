import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import RouteProgress from './components/RouteProgress';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Voucher = lazy(() => import('./pages/Voucher'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const Article = lazy(() => import('./pages/Article'));
const VoucherDetail = lazy(() => import('./features/voucher/VoucherDetail'));

export default function App() {
  const token = localStorage.getItem('accessToken');

  return (
    <Suspense
      fallback={<div>Loading...</div>}
    >
      <RouteProgress />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                token
                  ? '/dashboard'
                  : '/login'
              }
              replace
            />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/voucher"
            element={
              <ProtectedRoute>
                <Voucher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/voucher/:id"
            element={
              <ProtectedRoute>
                <VoucherDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/article"
            element={
              <ProtectedRoute>
                <Article />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}