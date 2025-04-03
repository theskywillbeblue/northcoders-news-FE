import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { getArticles } from '../api';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

export default function Articles() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [articleList, setArticleList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedOption, setSelectedOption] = useState('created_at');
	const [selectedOrder, setSelectedOrder] = useState('desc');

	const topic = searchParams.get('topic');
	const sortBy = searchParams.get('sort_by');
	const order = searchParams.get('order');

	const handleSortChange = (value) => {
		if (value !== sortBy) {
			setSelectedOption(value);
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set('sort_by', value);
				return newParams;
			});
		}
	};

	const handleOrderChange = (value) => {
		if (value !== order) {
			setSelectedOrder(value);
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set('order', value);
				return newParams;
			});
		}
	};

	useEffect(() => {
		if (!sortBy) {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set('sort_by', 'created_at');
				return newParams;
			});
		}
		if (!order) {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set('order', 'desc');
				return newParams;
			});
		}
	}, [sortBy, order, setSearchParams]);

	useEffect(() => {
		setSelectedOption(sortBy);
		setSelectedOrder(order);
	}, [sortBy, order]);

	useEffect(() => {
		setIsLoading(true);
		getArticles(null, topic, sortBy, order)
			.then((data) => {
				setArticleList(data.articles);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err)
				if (err.message.includes('404')) {
					setError('Currently, there are no articles for that topic!');
				} else setError('Houston, we have a problem!');
				setIsLoading(false);
			});
	}, [searchParams]);

	if (isLoading) {
		return <div id='loading-and-errors'>Articles are on their way...</div>;
	}
	if (error) {
		return (
			<div id='loading-and-errors'>Houston, we have a problem! {error}</div>
		);
	}

	const sortOptions = [
		{ label: 'Date', value: 'created_at' },
		{ label: 'Comment Count', value: 'comment_count' },
		{ label: 'Votes', value: 'votes' },
	];

	const orderOptions = [
		{ label: 'Ascending', value: 'asc' },
		{ label: 'Descending', value: 'desc' },
	];

	return (
		<>
			<div id='sort-by-container'>
				<FloatLabel id='sort-float-label'>
					<Dropdown
						id='sortby-selector'
						value={selectedOption}
						onChange={(e) => handleSortChange(e.value)}
						options={sortOptions}
					/>
					<label htmlFor='sorting articles'>Sort By</label>
				</FloatLabel>
				<FloatLabel id='orderby-label'>
					<Dropdown
						id='orderby-selector'
						value={selectedOrder}
						onChange={(e) => handleOrderChange(e.value)}
						options={orderOptions}
					/>
					<label htmlFor='sorting articles'>Order By</label>
				</FloatLabel>
			</div>

			<ul className='articles-grid'>
				{articleList.map((article) => (
					<ArticleCard key={article.article_id} article={article} />
				))}
			</ul>
		</>
	);
}
