import axios from 'axios';

const api = axios.create({
	baseURL: 'https://northcoders-news-app-jog4.onrender.com/api',
});

async function getArticles() {
	try {
		const response = await api.get('/articles');
		return response.data;
	} catch (err) {
		throw err;
	}
}

export default getArticles;
