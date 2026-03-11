import { supabase } from '../lib/supabaseClient';

const throwIfError = (error, fallbackMessage) => {
	if (error) {
		throw new Error(error.message || fallbackMessage);
	}
};

export const createQuizResult = async ({ userId, mbtiType, compatibleBreed, traitScores, answers }) => {
	const payload = {
		user_id: userId,
		mbti_type: mbtiType,
		compatible_breed: compatibleBreed,
		trait_scores: traitScores,
		answers
	};

	const { data, error } = await supabase
		.from('quiz_results')
		.insert(payload)
		.select('*')
		.single();

	throwIfError(error, 'Failed to save quiz result.');
	return data;
};

export const fetchQuizResults = async ({ userId }) => {
	const { data, error } = await supabase
		.from('quiz_results')
		.select('*')
		.eq('user_id', userId)
		.order('completed_at', { ascending: false });

	throwIfError(error, 'Failed to load quiz results.');
	return data || [];
};

export const deleteQuizResult = async ({ resultId, userId }) => {
	const { error } = await supabase
		.from('quiz_results')
		.delete()
		.eq('id', resultId)
		.eq('user_id', userId);

	throwIfError(error, 'Failed to delete quiz result.');
};
