import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) {
        // If there is no user — redirect to login page
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;