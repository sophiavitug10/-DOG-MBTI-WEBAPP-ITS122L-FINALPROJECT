import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
	const { isAuthenticated, isLoading, user } = useAuth();

	if (isLoading) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (user?.role !== 'admin') {
		return <Navigate to="/home" replace />;
	}

	return children;
}
