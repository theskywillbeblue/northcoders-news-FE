import { useEffect, useState } from 'react';
import {getArticles} from '../api';
import Comments from "./Comments"
import { useParams } from 'react-router';
import { FaRegComment } from 'react-icons/fa';
import { BiUpvote } from 'react-icons/bi';
import { Link } from 'react-router';

export default function Article() {
	const [article, setArticle] = useState([]);
	const { article_id } = useParams();

	useEffect(() => {
		getArticles(article_id).then(({ article }) => {
			setArticle(article);
		});
	}, [article_id]);

	return (
		<>
		<Link to='/articles'>
		<button className="back-button">Back to Articles</button>
	</Link>
		<div className='single-article'>
			<h2>{article.title}</h2>
			<br />
			<img src={article.article_img_url} id='single-article-img' />
			<br />
            <div className='single-article-button-container'>
			<button className='article-buttons'>
				<BiUpvote id='upvote-icon' />
				{article.votes}
			</button>
			<button className='article-buttons'>
				<FaRegComment id='comment-icon' />
				{article.comment_count}
			</button>
            </div>
			<br />
			Published: {new Date(article.created_at).toLocaleDateString()}
			<br />
			Topic: {article.topic} <br/>
			Author: {article.author} <br/><br/>
			<p id='article-body-text'>{article.body}</p>
			<Comments article_id={article_id}/>
		</div>
		</>
	);
}
