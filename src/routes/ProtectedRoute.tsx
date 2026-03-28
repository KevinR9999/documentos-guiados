import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { hasValidSharedAccess } from '../features/auth/sharedAccess';

export default function ProtectedRoute() {
  const location = useLocation();

  if (!hasValidSharedAccess()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}