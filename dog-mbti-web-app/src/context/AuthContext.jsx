import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
	completeSignupWithCode,
	getCurrentUser,
	loginWithPassword,
	logout as logoutService,
	onAuthStateChange,
	sendPasswordResetCode,
	sendSignupCode,
	updatePassword,
	verifyResetCode
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const initializeAuth = async () => {
			try {
				const currentUser = await getCurrentUser();
				if (isMounted) {
					setUser(currentUser);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		initializeAuth();

		const subscription = onAuthStateChange((nextUser) => {
			setUser(nextUser);
		});

		return () => {
			isMounted = false;
			subscription?.unsubscribe();
		};
	}, []);

	const requestSignupCode = async (payload) => {
		await sendSignupCode(payload);
	};

	const completeSignup = async (payload) => {
		const signedUpUser = await completeSignupWithCode(payload);
		setUser(signedUpUser);
		return signedUpUser;
	};

	const login = async (payload) => {
		const loggedInUser = await loginWithPassword(payload);
		setUser(loggedInUser);
		return loggedInUser;
	};

	const requestPasswordResetCode = async (payload) => {
		await sendPasswordResetCode(payload);
	};

	const verifyPasswordResetCode = async (payload) => {
		const verifiedUser = await verifyResetCode(payload);
		setUser(verifiedUser);
		return verifiedUser;
	};

	const changePassword = async (payload) => {
		const updatedUser = await updatePassword(payload);
		setUser(updatedUser);
		return updatedUser;
	};

	const logout = async () => {
		await logoutService();
		setUser(null);
	};

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			isLoading,
			requestSignupCode,
			completeSignup,
			login,
			requestPasswordResetCode,
			verifyPasswordResetCode,
			changePassword,
			logout
		}),
		[user, isLoading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};
