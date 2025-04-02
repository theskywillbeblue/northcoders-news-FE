import { useEffect, useState, useRef } from 'react';
import { getArticles, patchVotesByArtId } from '../api';
import Comments from './Comments';
import { useParams } from 'react-router';
import { FaRegComment } from 'react-icons/fa';
import { BiUpvote } from 'react-icons/bi';
import { BiDownvote } from 'react-icons/bi';
import { Link } from 'react-router';
import { FaCommentMedical } from "react-icons/fa6";

export default function Article() {
	const [article, setArticle] = useState({});
	const initialVotes = 0;
	const [votes, setVotes] = useState(initialVotes);
	const [showCommentForm, setShowCommentForm] = useState(false)


	const { article_id } = useParams();

	useEffect(() => {
		getArticles(article_id).then(({ article }) => {
			setArticle(article);
			setVotes(article.votes);
		});
	}, [article_id]);

	const handleVote = (vote) => {
		patchVotesByArtId(article_id, vote).then(({ article }) => {
			setVotes(article.votes);
		}).catch((err)=> setError(err))
	};


	const commentsRef = useRef(null);


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
					<div>
						<button id="upvote-button" onClick={() => handleVote(1)}>
							<BiUpvote id='arrow-vote-icons' size={23}/>
						</button>

						<button className='votes-digit-button'>{votes}</button>

						<button id="downvote-button" onClick={() => handleVote(-1)}>
							<BiDownvote id='arrow-vote-icons' size={23}/>
						</button>
					</div>
					
						<button
							className='see-comments-button'
							onClick={() => {
								commentsRef.current?.scrollIntoView();
							}}>
							<FaRegComment id='comment-icon' size={23} />
							 {article.comment_count}
						</button>
						<button
							className='post-comment-button'
							onClick={() => setShowCommentForm(!showCommentForm)}>
							<FaRegComment id='comment-icon' size={23} />+
						</button>
					
					</div>
				</div>
				<br />
				<div id="published-topic-author">
				Author: {article.author}
				<br />
				Topic: {article.topic} <br />
				Published: {new Date(article.created_at).toLocaleDateString()}
				</div>
				<br />
				<p id='article-body-text'>{article.body}</p>
				<div ref={commentsRef}>
					<Comments article_id={article_id} showCommentForm={showCommentForm}/>
					
				</div>
			</div>
		</>
	);
}
