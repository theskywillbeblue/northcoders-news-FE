import { useEffect, useState, useContext } from 'react';
import {UserContext} from '../Contexts/userContext.jsx'
import { getCommentsByArtId, postCommentByArtId } from '../api.js';
import { FaRegComment } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";

export default function Comments({ article_id, showCommentForm }) {

	const { user } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const [commentBody, setCommentBody] = useState('');

	useEffect(() => {
		getCommentsByArtId(article_id).then(({ comments }) => {
			setComments(comments);
		});
	}, [article_id]);



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
        .catch((err) => err);
};

	return (<>
		<ul className='comments-all-container'>
			{comments.map((comment) => (
				<li className='comment-card' key={comment.comment_id}>
					<div className='author-date'>
						<h4>{comment.author} </h4>
						{new Date(comment.created_at).toLocaleDateString()}
					</div>
					<FaRegComment id='comment-icon-in-comment' size='20px' />
					<p className='body'>{comment.body}</p>
					Votes:
					{comment.votes}
					{comment.author === user.username? <MdDeleteOutline id='trash-icon'/> : null}
				</li>
			
			))}
		</ul>
			{showCommentForm && (
				<form onSubmit={handleCommentSubmit} className='comment-form'>
					<textarea id='comment-form-input' type="text"
						value={commentBody}
						onChange={(e) => setCommentBody(e.target.value)}
						placeholder='comment body'
						required
					></textarea>
					<button type='submit'>Post</button>
				</form>
			)}
			</>
	);
}


