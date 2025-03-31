import { useState, useEffect } from 'react';
import getArticles from '../api';
import ArticleCard from './ArticleCard';

export default function Articles() {
	const [articleList, setArticleList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setError(null);
		setIsLoading(true);
		getArticles()
			.then((data) => {
				setArticleList(data.articles);
				console.log(data.articles);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <p>Articles are on their way...</p>;
	}
	if (error) {
		console.log(error);
		return <p>{error}</p>;
	}
	return (
		<>
        <h2>Articles</h2>
        <ul className='articles-grid'>
			{articleList.map((article) => (
				<ArticleCard key ={article.article_id} article={article}/>
			))}
            </ul>
		</>
	);
}
