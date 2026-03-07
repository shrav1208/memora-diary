import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OnboardingRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ⭐ If profile already completed → block onboarding pages
    if (user.profileCompleted && location.pathname === "/profile-setup") {
        return <Navigate to="/landing" replace />;
    }

    return children;
};

export default OnboardingRoute;