import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export function RequireAuth() {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return <div className="auth-loading">Loading Go Solo…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!user.onboardingComplete && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (user.onboardingComplete && location.pathname === "/onboarding") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function RedirectIfAuthed() {
  const { user, ready } = useAuth();

  if (!ready) {
    return <div className="auth-loading">Loading Go Solo…</div>;
  }

  if (user) {
    return (
      <Navigate to={user.onboardingComplete ? "/" : "/onboarding"} replace />
    );
  }

  return <Outlet />;
}
