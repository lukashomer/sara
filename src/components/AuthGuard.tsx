import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate("/login");
    } else if (!requireAuth && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, requireAuth]);

  // If we're checking for auth and the user is authenticated, or
  // if we're checking for no auth and the user is not authenticated, render children
  if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated)) {
    return <>{children}</>;
  }

  // Otherwise render nothing while redirecting
  return null;
};

export default AuthGuard;
