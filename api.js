import axios from 'axios';

const api = axios.create({
	baseURL: 'https://northcoders-news-app-jog4.onrender.com/api',
});

async function getArticles(article_id) {
	try {
		const endpoint = article_id ? `/articles/${article_id}` : "/articles";
		const response = await api.get(endpoint);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export default getArticles;

