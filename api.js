import axios from 'axios';

const api = axios.create({
	baseURL: 'https://northcoders-news-app-jog4.onrender.com/api',
});

async function getArticles(article_id, topic, sortBy, order) {
	try {
		const endpoint = article_id ? `/articles/${article_id}` : '/articles';
		const response = await api.get(endpoint, { params: { topic, sort_by: sortBy,
			order } });
		return response.data;
	} catch (err) {
		throw err;
	}
}

async function patchVotesByArtId(article_id, vote) {
	try {
		const response = await api.patch(`/articles/${article_id}`, {
			inc_votes: vote,
		});
		return response.data;
	} catch (err) {
		throw err;
	}
}

async function getCommentsByArtId(article_id) {
	try {
		const response = await api.get(`/articles/${article_id}/comments`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

async function postCommentByArtId(article_id, commentBody) {
	try {
		const response = await api.post(`/articles/${article_id}/comments`, {
			username: 'tickle122',
			body: commentBody,
		});
		return response.data;
	} catch (err) {
		throw err;
	}
}

async function deleteCommentById(comment_id) {
	try {
		const response = await api.delete(`/comments/${comment_id}`);
		return response;
	} catch (err) {
		throw err;
	}
}

async function getTopics() {
	try {
		const response = await api.get('/topics');
		return response.data;
	} catch (err) {
		throw err;
	}
}

export {
	getArticles,
	getCommentsByArtId,
	patchVotesByArtId,
	postCommentByArtId,
	deleteCommentById,
	getTopics,
};

