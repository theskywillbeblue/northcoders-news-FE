import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import { useSearchParams } from 'react-router';

export default function Articles() {
	const [articleList, setArticleList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {

		const topic = searchParams.get('topic');

		setError(null);
		setIsLoading(true);
		getArticles(null, topic)
			.then((data) => {
				setArticleList(data.articles);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [searchParams]);

	if (isLoading) {
		return <p>Articles are on their way...</p>;
	}
	if (error) {
		setIsLoading(false);
		return <p>{error}</p>;
	}
	return (
		<>
			<ul className='articles-grid'>
				{articleList.map((article) => (
					<ArticleCard key={article.article_id} article={article} />
				))}
			</ul>
		</>
	);
}
