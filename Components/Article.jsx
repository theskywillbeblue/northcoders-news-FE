import { useEffect, useState, useRef } from 'react';
import { getArticles, patchVotesByArtId } from '../api';
import Comments from './Comments';
import { useParams } from 'react-router';
import { FaRegComment } from 'react-icons/fa';
import { BiUpvote } from 'react-icons/bi';
import { BiDownvote } from 'react-icons/bi';
import { Link } from 'react-router';

export default function Article() {
	const [article, setArticle] = useState([]);
	const initialVotes = article.votes;
	const [votes, setVotes] = useState(initialVotes);

	const { article_id } = useParams();

	useEffect(() => {
		getArticles(article_id).then(({ article }) => {
			setArticle(article);
			setVotes(article.votes)
		});
	}, [article_id]);

	const handleVote = (vote) => {
		patchVotesByArtId(article_id, vote).then(({ article }) => {
			setVotes(article.votes);
		});
	};


	const commentsRef = useRef(null)

	return (
		<>
			<Link to='/articles'>
				<button className='back-button'>Back to Articles</button>
			</Link>
			<div className='single-article'>
				<h2>{article.title}</h2>
				<br />
				<img src={article.article_img_url} id='single-article-img' />
				<br />

				<div className='vote-button-group'>
				<div>
					<button onClick={() => handleVote(1)}>
						<BiUpvote id='vote-button' />
					</button>

					<button className='votes'>{votes}</button>

					<button onClick={() => handleVote(-1)}>
						<BiDownvote id='vote-button' />
					</button>
				</div>
				<div>
					<button className='comment-button' onClick={() => {commentsRef.current?.scrollIntoView(); window.scrollBy(0, 370)}}>
						<FaRegComment id='comment-icon' />
						{article.comment_count}
					</button>
				</div>
				</div>
				<br />
				Published: {new Date(article.created_at).toLocaleDateString()}
				<br />
				Topic: {article.topic} <br />
				Author: {article.author} <br />
				<br />
				<p id='article-body-text'>{article.body}</p>
				<div ref={commentsRef}>
				<Comments article_id={article_id}/>
				</div>
			</div>
		</>
	);
}
