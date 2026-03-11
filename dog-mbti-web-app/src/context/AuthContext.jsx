import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
	completeSignupWithCode,
	getCurrentUser,
	getProfileRole,
	loginWithPassword,
	logout as logoutService,
	onAuthStateChange,
	sendPasswordResetCode,
	sendSignupCode,
	updateProfile as updateProfileService,
	updatePassword,
	verifyResetCode
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const withUserRole = async (baseUser) => {
		if (!baseUser) {
			return null;
		}

		const role = await getProfileRole(baseUser.id);
		return { ...baseUser, role };
	};

	useEffect(() => {
		let isMounted = true;

		const initializeAuth = async () => {
			try {
				const currentUser = await getCurrentUser();
				const roleAwareUser = await withUserRole(currentUser);
				if (isMounted) {
					setUser(roleAwareUser);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		initializeAuth();

		const subscription = onAuthStateChange(async (nextUser) => {
			const roleAwareUser = await withUserRole(nextUser);
			setUser(roleAwareUser);
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
		const roleAwareUser = await withUserRole(signedUpUser);
		setUser(roleAwareUser);
		return roleAwareUser;
	};

	const login = async (payload) => {
		const loggedInUser = await loginWithPassword(payload);
		const roleAwareUser = await withUserRole(loggedInUser);
		setUser(roleAwareUser);
		return roleAwareUser;
	};

	const requestPasswordResetCode = async (payload) => {
		await sendPasswordResetCode(payload);
	};

	const verifyPasswordResetCode = async (payload) => {
		const verifiedUser = await verifyResetCode(payload);
		const roleAwareUser = await withUserRole(verifiedUser);
		setUser(roleAwareUser);
		return roleAwareUser;
	};

	const changePassword = async (payload) => {
		const updatedUser = await updatePassword(payload);
		const roleAwareUser = await withUserRole(updatedUser);
		setUser(roleAwareUser);
		return roleAwareUser;
	};

	const updateProfile = async (payload) => {
		const updatedUser = await updateProfileService(payload);
		const roleAwareUser = await withUserRole(updatedUser);
		setUser(roleAwareUser);
		return roleAwareUser;
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
			updateProfile,
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
