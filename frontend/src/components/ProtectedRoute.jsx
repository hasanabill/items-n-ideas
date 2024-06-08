import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAllowed = localStorage.getItem('accessToken')
    if (!isAllowed) {
        return <Navigate to="/getin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
