import { getCommentsByArtId, deleteCommentById } from '../api';
import { UserContext } from '../Contexts/userContext';
import { useEffect, useState, useContext, useRef } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';


export default function Comments({ article_id }) {
	const { user } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const toast = useRef(null);


	useEffect(() => {
		getCommentsByArtId(article_id).then(({ comments }) => {
			setComments(comments);
		});
	}, [comments]);

	const handleDeleteComment = (e, comment_id) => {

		const accept = () => {
			deleteCommentById(comment_id);
			toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Comment deleted successfully', life: 2600 });
			return getCommentsByArtId(article_id)
				.then(({ comments }) => {
					setComments(comments);
				})
				.catch(() => {
					toast.current.show({ severity: 'error', summary: 'Error', detail: 'Could not delete your comment, try again later', life: 2600 });;
				});
			
		};
	
		const reject = () => {
			
		};

		console.log(e.currentTarget)
		confirmPopup({

            target: e.currentTarget.parentElement,
            message: 'Are you sure you want to delete this comment?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'none',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });


	};

	return (
		<>
				<ConfirmPopup />
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
							<>
								<Toast ref={toast} position='center' />
						<span id='trash-can'>
								<MdDeleteOutline
								icon="pi pi-times"
								label="Delete"
						
								
									id='trash-icon'
									size='22px'
									onClick={(e) => handleDeleteComment(e, comment.comment_id)}
									
								/>
								</span>
							</>
						) : null}
					</li>
				))}
			</ul>
		</>
	);
}
