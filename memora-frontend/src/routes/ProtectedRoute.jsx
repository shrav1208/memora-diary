import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but profile incomplete
    if (!user.profileCompleted && location.pathname !== "/profile-setup") {
        return <Navigate to="/profile-setup" replace />;
    }

    return children;
};

export default ProtectedRoute;