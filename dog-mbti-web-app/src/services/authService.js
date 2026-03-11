import { supabase } from '../lib/supabaseClient';

const mapUser = (user) => {
	if (!user) {
		return null;
	}

	return {
		id: user.id,
		email: user.email,
		name: user.user_metadata?.full_name || user.user_metadata?.name || '',
		createdAt: user.created_at
	};
};

const throwIfError = (error, fallbackMessage) => {
	if (error) {
		throw new Error(error.message || fallbackMessage);
	}
};

export const getCurrentUser = async () => {
	const { data, error } = await supabase.auth.getSession();
	throwIfError(error, 'Failed to restore session.');
	return mapUser(data.session?.user ?? null);
};

export const sendSignupCode = async ({ email, name }) => {
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: true,
			data: {
				full_name: name
			}
		}
	});

	throwIfError(error, 'Failed to send sign-up code.');
};

export const completeSignupWithCode = async ({ email, code, name, password }) => {
	const { data, error } = await supabase.auth.verifyOtp({
		email,
		token: code,
		type: 'email'
	});

	throwIfError(error, 'Invalid or expired verification code.');

	const { data: updatedData, error: updateError } = await supabase.auth.updateUser({
		password,
		data: {
			full_name: name
		}
	});

	throwIfError(updateError, 'Account verified, but setting password failed.');
	return mapUser(updatedData.user ?? data.user ?? data.session?.user ?? null);
};

export const loginWithPassword = async ({ email, password }) => {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	throwIfError(error, 'Invalid email or password.');
	return mapUser(data.user ?? data.session?.user ?? null);
};

export const sendPasswordResetCode = async ({ email }) => {
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: false
		}
	});

	throwIfError(error, 'Failed to send reset code.');
};

export const verifyResetCode = async ({ email, code }) => {
	const { data, error } = await supabase.auth.verifyOtp({
		email,
		token: code,
		type: 'email'
	});

	throwIfError(error, 'Invalid or expired reset code.');
	return mapUser(data.user ?? data.session?.user ?? null);
};

export const updatePassword = async ({ newPassword }) => {
	const { data, error } = await supabase.auth.updateUser({ password: newPassword });
	throwIfError(error, 'Failed to update password.');
	return mapUser(data.user ?? null);
};

export const updateProfile = async ({ name, email, newPassword }) => {
	const payload = {
		data: {
			full_name: name
		}
	};

	if (email) {
		payload.email = email;
	}

	if (newPassword) {
		payload.password = newPassword;
	}

	const { data, error } = await supabase.auth.updateUser(payload);
	throwIfError(error, 'Failed to update profile.');
	return mapUser(data.user ?? null);
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();
	throwIfError(error, 'Failed to log out.');
};

export const onAuthStateChange = (callback) => {
	const { data } = supabase.auth.onAuthStateChange((_event, session) => {
		callback(mapUser(session?.user ?? null));
	});

	return data.subscription;
};