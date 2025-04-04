import { getCommentsByArtId, deleteCommentById } from '../api';
import { UserContext } from '../Contexts/userContext';
import { useEffect, useState, useContext } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';


export default function Comments({ article_id }) {
	const { user } = useContext(UserContext);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getCommentsByArtId(article_id).then(({ comments }) => {
			setComments(comments);
		});
	}, [comments]);

	const handleDeleteComment = (comment_id) => {
		deleteCommentById(comment_id);

		return getCommentsByArtId(article_id)
			.then(({ comments }) => {
				setComments(comments);
				alert('Comment successfully removed');
			})
			.catch(() => {
				alert('There was an error deleting the comment. Please try again.');
			});
	};

	return (
		<>
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
						{comment.author === user.username ? (
							<MdDeleteOutline
								id='trash-icon'
								size='20px'
								onClick={() => handleDeleteComment(comment.comment_id)}
							/>
						) : null}
					</li>
				))}
			</ul>
		</>
	);
}
