import { useEffect, useState} from 'react';
import { getCommentsByArtId } from '../api.js';
import { FaRegComment } from 'react-icons/fa';

export default function Comments ({ article_id }) {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getCommentsByArtId(article_id).then(({ comments }) => {
			setComments(comments);
		});
	}, [article_id]);
	

	return (
		<ul className='comments-all-container'>
			{comments.map((comment) => (
				<li className='comment-card' key={comment.comment_id}>
                    <div className='author-date'>
					<h4>{comment.author}  </h4>{new Date(comment.created_at).toLocaleDateString()}
                    </div>
                    <FaRegComment id='comment-icon-in-comment' size="20px"/>
                    <p className='body'>
                    {comment.body}
					</p>
                    Votes:
                    {comment.votes}
				</li>
			))}
		</ul>
	);
}
