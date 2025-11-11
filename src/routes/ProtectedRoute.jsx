import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roles = [] }) {
    const { isAuthenticated, claims } = useSelector((state) => state.auth);

    if (!isAuthenticated)
        return <Navigate to="/auth?mode=login" replace />;

    if (roles.length > 0 && !claims?.roles.some(role => roles.includes(role))) {
        return <h1>Access Denied</h1>;
    }

    return children;
}
