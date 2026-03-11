import { supabase } from '../lib/supabaseClient';

const throwIfError = (error, fallbackMessage) => {
	if (error) {
		const message = error.message || fallbackMessage;
		if (/row-level security|permission denied|42501/i.test(message)) {
			throw new Error('Admin access required. Set your role to admin in public.profiles and sign in again.');
		}
		throw new Error(message);
	}
};

export const fetchAdminBreeds = async () => {
	const { data, error } = await supabase.from('admin_breeds').select('*').order('name', { ascending: true });
	throwIfError(error, 'Failed to load breeds.');
	return data || [];
};

export const seedAdminBreeds = async (breeds) => {
	if (!Array.isArray(breeds) || breeds.length === 0) {
		return;
	}

	const payload = breeds.map((breed) => ({
		name: breed.name,
		mbti_type: breed.mbtiType,
		energy_level: breed.traits?.includes('Energetic') || breed.traits?.includes('High energy levels') ? 'High' : 'Medium',
		care_notes: breed.characteristics?.join(', ') || '',
		image: breed.image || null,
		description: breed.description || ''
	}));

	const { error } = await supabase.from('admin_breeds').upsert(payload, { onConflict: 'name' });
	throwIfError(error, 'Failed to seed breeds.');
};

export const createAdminBreed = async (payload) => {
	const { data, error } = await supabase.from('admin_breeds').insert(payload).select('*').single();
	throwIfError(error, 'Failed to create breed.');
	return data;
};

export const updateAdminBreed = async (id, payload) => {
	const { data, error } = await supabase.from('admin_breeds').update(payload).eq('id', id).select('*').single();
	throwIfError(error, 'Failed to update breed.');
	return data;
};

export const deleteAdminBreed = async (id) => {
	const { error } = await supabase.from('admin_breeds').delete().eq('id', id);
	throwIfError(error, 'Failed to delete breed.');
};

export const fetchAdminQuestions = async () => {
	const { data, error } = await supabase
		.from('admin_quiz_questions')
		.select('*')
		.order('created_at', { ascending: false });
	throwIfError(error, 'Failed to load questions.');
	return data || [];
};

export const createAdminQuestion = async (payload) => {
	const { data, error } = await supabase.from('admin_quiz_questions').insert(payload).select('*').single();
	throwIfError(error, 'Failed to create question.');
	return data;
};

export const deleteAdminQuestion = async (id) => {
	const { error } = await supabase.from('admin_quiz_questions').delete().eq('id', id);
	throwIfError(error, 'Failed to delete question.');
};

export const fetchAdminInquiries = async () => {
	const { data, error } = await supabase
		.from('adoption_inquiries')
		.select('*')
		.order('created_at', { ascending: false });
	throwIfError(error, 'Failed to load inquiries.');
	return data || [];
};

export const updateInquiryStatus = async (id, status) => {
	const { data, error } = await supabase
		.from('adoption_inquiries')
		.update({ status, updated_at: new Date().toISOString() })
		.eq('id', id)
		.select('*')
		.single();
	throwIfError(error, 'Failed to update inquiry status.');
	return data;
};

export const fetchAdminUsers = async () => {
	const [{ data: profiles, error: profileError }, { data: results, error: resultError }] = await Promise.all([
		supabase.from('profiles').select('id, full_name, email, created_at').order('created_at', { ascending: false }),
		supabase.from('quiz_results').select('user_id, mbti_type, completed_at').order('completed_at', { ascending: false })
	]);

	throwIfError(profileError, 'Failed to load users.');
	throwIfError(resultError, 'Failed to load user quiz results.');

	const latestResultByUser = new Map();
	(results || []).forEach((item) => {
		if (!latestResultByUser.has(item.user_id)) {
			latestResultByUser.set(item.user_id, item.mbti_type);
		}
	});

	return (profiles || []).map((profile) => ({
		id: profile.id,
		name: profile.full_name || 'Unnamed User',
		email: profile.email || 'No email',
		mbtiResult: latestResultByUser.get(profile.id) || 'Not Taken'
	}));
};

export const fetchAdminStats = async () => {
	const [
		{ count: breedCount, error: breedError },
		{ count: questionCount, error: questionError },
		{ count: userCount, error: userError },
		{ count: inquiryCount, error: inquiryError }
	] = await Promise.all([
		supabase.from('admin_breeds').select('*', { count: 'exact', head: true }),
		supabase.from('admin_quiz_questions').select('*', { count: 'exact', head: true }),
		supabase.from('profiles').select('*', { count: 'exact', head: true }),
		supabase.from('adoption_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'Pending')
	]);

	throwIfError(breedError, 'Failed to load breed stats.');
	throwIfError(questionError, 'Failed to load question stats.');
	throwIfError(userError, 'Failed to load user stats.');
	throwIfError(inquiryError, 'Failed to load inquiry stats.');

	return {
		breedCount: breedCount || 0,
		questionCount: questionCount || 0,
		userCount: userCount || 0,
		pendingInquiryCount: inquiryCount || 0
	};
};
