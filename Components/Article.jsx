import { getArticles, patchVotesByArtId, postCommentByArtId} from '../api'
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { FaRegComment } from 'react-icons/fa';
import Comments from './Comments';


export default function Article() {
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [commentBody, setCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [article, setArticle] = useState({});
	const [error, setError] = useState(null);
	const { article_id } = useParams();
	const commentsRef = useRef(null);
	const initialVotes = 0;
	const [votes, setVotes] = useState(initialVotes);
	


	useEffect(() => {
		setError(null);
		setIsLoading(true);
		getArticles(article_id)
			.then(({ article }) => {
				setArticle(article);
				setVotes(article.votes);
				setIsLoading(false);
			}).catch((err) => {
				setError(err);
			})
			
	}, [article_id]);


	const handleVote = (vote) => {
		patchVotesByArtId(article_id, vote)
			.then(({ article }) => {
				setVotes(article.votes);
			})
			.catch((err) => setError(err));
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		postCommentByArtId(article_id, commentBody)
			.then(() => {
				setCommentBody('');
				return getCommentsByArtId(article_id);
			})
			.then(({ comments }) => {
				setComments(comments);
			})
			.catch(() => {});
	};
	

	if (isLoading) {
		return (
			<div align='center' padding-top='80px'>
				article on the way...
			</div>
		);
	}
	if (error) {
		return <p>{error}</p>;
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
					<button type='submit'>Post</button>
				</form>
				
			)}
				<div ref={commentsRef}>
					<Comments article_id={article_id} showCommentForm={showCommentForm} />
				</div>
			</div>
		</>
	);
}
