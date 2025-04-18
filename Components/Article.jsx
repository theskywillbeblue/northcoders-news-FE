import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { FaRegComment } from 'react-icons/fa';
import Comments from './Comments';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Button } from 'primereact/button';

import {
	getArticles,
	patchVotesByArtId,
	postCommentByArtId,
	getCommentsByArtId,
} from '../api';

export default function Article() {
	const { article_id } = useParams();

	const [showCommentForm, setShowCommentForm] = useState(false);
	const [commentBody, setCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [article, setArticle] = useState({});
	const [error, setError] = useState(null);
	const commentsRef = useRef(null);
	const initialVotes = 0;
	const [votes, setVotes] = useState(initialVotes);

	// handle data fetch
	useEffect(() => {
		setIsLoading(true);
		getArticles(article_id)
			.then(({ article }) => {
				setArticle(article);
				setVotes(article.votes);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				if (err.message.includes('404')) {
					setError('Article not found!');
				} else {
					setError(null);
				}
				setIsLoading(false);
			});
	}, [article_id]);

	// handle voting
	const handleVote = (vote) => {
		patchVotesByArtId(article_id, vote)
			.then(({ article }) => {
				setVotes(article.votes);
			})
			.catch(() => {
				setError('Houston, we have a problem voting!');
			});
	};

	// handle commenting
	const handleCommentSubmit = (e) => {
		e.preventDefault();
		postCommentByArtId(article_id, commentBody)
			.then(() => {
				toast.current.show({
					severity: 'success',
					summary: '  Success!',
					detail: '  Your comment was posted.',
				});
				setCommentBody('');
				return getCommentsByArtId(article_id);
			})
			.then(({ comments }) => {
				setComments(comments);
			})
			.catch(() => {
				setError('Houston, we have a problem commenting!');
			});
	};

	// loading state
	if (isLoading) {
		return <div id='loading-and-errors'>Article incoming...</div>;
	}

	// error state
	if (error) {
		return (
			<div id='loading-and-errors'>Houston, we have a problem, {error}</div>
		);
	}

	return (
		<>
			<Link to='/articles'>
				<button className='back-button'>Back to Articles</button>
			</Link>
			<div className='single-article'>
				<h2>{article.title}</h2>
				<img src={article.article_img_url} id='single-article-img' />
				<br />
				<div id='single-article-buttons'>
					<div className='vote-button-group'>
						<button id='upvote-button' onClick={() => handleVote(1)}>
							<BiUpvote id='arrow-vote-icons' size={23} />
						</button>

						<button className='votes-digit-button'>{votes}</button>

						<button id='downvote-button' onClick={() => handleVote(-1)}>
							<BiDownvote id='arrow-vote-icons' size={23} />
						</button>

						<button
							className='see-comments-button'
							onClick={() => {
								commentsRef.current?.scrollIntoView();
							}}>
							<FaRegComment id='comment-icon' size={23} />
							{article.comment_count}
						</button>
					</div>
				</div>
				<br />
				<div id='published-topic-author'>
					Author: {article.author}
					<br />
					Topic: {article.topic} <br />
					Published: {new Date(article.created_at).toLocaleDateString()}
				</div>
				<br />
				<p id='article-body-text'>{article.body}</p>
				{!showCommentForm && (
					<button
						className='post-comment-button'
						onClick={() => setShowCommentForm(!showCommentForm)}>
						<FaRegComment id='comment-icon' size={23} /> Post a comment
					</button>
				)}
				{showCommentForm && (
					<form onSubmit={handleCommentSubmit} className='comment-form'>
						<textarea
							id='comment-form-input'
							type='text'
							value={commentBody}
							onChange={(e) => setCommentBody(e.target.value)}
							placeholder='pop your comment in here...'
							required></textarea>
						<Button type='submit'>Post</Button>
					</form>
				)}
				<div ref={commentsRef}>
					<Comments article_id={article_id} showCommentForm={showCommentForm} />
				</div>
			</div>
		</>
	);
}
