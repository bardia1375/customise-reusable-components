import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./hooks/useAuth";
import Dashboard from "./components/layout/Dashboard";
import DashboardPage from "./pages/Dashboard";

// Lazy load pages for better performance
const LoginPage = React.lazy(() => import("./pages/Login"));
// const RegisterPage = React.lazy(() => import("./pages/Register"));
// const DashboardPage = React.lazy(() => import("./pages/Dashboard"));
// const AnalyticsPage = React.lazy(() => import("./pages/Analytics"));
// const ProjectsPage = React.lazy(() => import("./pages/Projects"));
// const SettingsPage = React.lazy(() => import("./pages/Settings"));
// const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-primary-500" />
      </div>
    }>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/register" element={<RegisterPage />} /> */}
              
              {/* Dashboard routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                {/* <Route path="analytics" element={<AnalyticsPage />} /> */}
                {/* <Route path="projects" element={<ProjectsPage />} /> */}
                {/* <Route path="settings" element={<SettingsPage />} /> */}
              </Route>
              
              {/* 404 page */}
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
