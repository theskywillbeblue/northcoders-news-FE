import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { getArticles } from '../api';



export default function Articles() {
	const [searchParams] = useSearchParams();
	const [articleList, setArticleList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	

	useEffect(() => {
		const topic = searchParams.get('topic');

		setError(null);
		setIsLoading(true);
		getArticles(null, topic)
			.then((data) => {
				setArticleList(data.articles);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
			})
		
	}, [searchParams]);


	if (isLoading) {
		return (
			<div align='center' padding-top='80px'>
				articles are on their way...
			</div>
		);
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
