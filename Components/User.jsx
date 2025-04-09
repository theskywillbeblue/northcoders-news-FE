import { UserContext } from '../Contexts/userContext';
import { useContext, useState, useRef, useEffect } from 'react';
import profilePic from '../src/assets/user.png';
import { Fieldset } from 'primereact/fieldset';
import { FaPen, FaEye } from 'react-icons/fa';
import { postArticle, getTopics } from '../api';
import { Button } from 'primereact/button';

export default function User() {
	const [showPostArticleForm, setShowPostArticleForm] = useState(null);
	const [article, setArticle] = useState({
		title: '',
		topic: '',
		body: '',
		article_img_url: '',
	});
	const { user } = useContext(UserContext);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [topicList, setTopicList] = useState([]);
	const [isSuccess, setIsSuccess] = useState(false);

	// handle get topics for dropdown
	useEffect(() => {
		getTopics()
			.then((data) => {
				setTopicList(data.topics);
			})
			.catch((err) => {
				serError(err);
			});
	}, []);

	// handle posting article
	const handleArticleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		postArticle(article, user.username)
			.then(() => {
				setIsSuccess(true);
				setArticle({ title: '', topic: '', body: '', article_img_url: '' });
				setIsLoading(false);
			})

			.catch((err) => {
				console.log(err);
				setError(err);
				setIsLoading(false);
			});
	};

	// loading state
	if (isLoading) {
		return <div id='loading-and-errors'>Posting your article...</div>;
	}

	// error state
	if (error) {
		return (
			<div id='loading-and-errors'>Houston, we have a problem, {error}</div>
		);
	}

	if (isSuccess) {
		return (
			<div id='success-page'>
				<h2>Article posted successfully!</h2>
				<p>Thanks for sharing your thoughts, {user.username}!</p>
				<Button
					onClick={() => {
						setIsSuccess(false);
						setShowPostArticleForm(false);
					}}>
					Back to Profile
				</Button>
			</div>
		);
	}

	return (
		<>
			{!showPostArticleForm && (
				<section id='user-profile'>
					<h2>Welcome {user.username}!</h2>
					<img src={profilePic} id='profile-pic' />
					<div id='user-profile-page-contents'>
						<div id='user-profile-fieldsets'>
							<Fieldset legend='Name'>
								<p>John Smith</p>
							</Fieldset>
							<Fieldset legend='Location'>
								<p>Manchester, United Kingdom</p>
							</Fieldset>
							<Fieldset legend='Membership Level'>
								<p>Premium</p>
							</Fieldset>
						</div>
						<div>
							<button
								className='user-profile-buttons'
								onClick={() => setShowPostArticleForm(true)}>
								<FaPen />
								Write an article
							</button>
							<button className='user-profile-buttons'>
								<FaEye />
								View my articles
							</button>
						</div>
					</div>
				</section>
			)}
			{showPostArticleForm && (
				<>
				<br/>
				<br/>
					<h2>Post an article...</h2>
					<form
						value={article}
						onSubmit={handleArticleSubmit}
						className='article-form'>
						<select
							type='text'
							id='topic-select'
							value={article.topic}
							onChange={(e) =>
								setArticle({ ...article, topic: e.target.value })
							}
							required>
							<option value='' disabled>
								Select a topic
							</option>
							{topicList.map((topic) => (
								<option key={topic.slug} value={topic.slug}>
									{topic.slug}
								</option>
							))}
						</select>
						<input
							type='text'
							id='title-input'
							placeholder='Title'
							value={article.title}
							onChange={(e) =>
								setArticle({ ...article, title: e.target.value })
							}
							required
							maxLength={100}
						/>
						<textarea
							id='article-form-input'
							type='text'
							placeholder='write your article here...'
							value={article.body}
							onChange={(e) => setArticle({ ...article, body: e.target.value })}
							required></textarea>
						<input
							type='url'
							id='image-url-input'
							placeholder='Image URL'
							value={article.article_img_url}
							onChange={(e) =>
								setArticle({ ...article, article_img_url: e.target.value })
							}
							required
						/>
						<Button type='submit' id='post-button'>
							Post
						</Button>
					</form>
				</>
			)}
		</>
	);
}

/* "POST /api/articles": {
    "description": "adds a new article to the database",
    "bodyFormat": {
      "title": "The Mitch",
      "topic": "mitch",
      "author": "rogersop",
      "body": "The wonders of mitch",
      "article_img_url": "https://www.mitch.com/mitch"
    },
    "exampleResponse": {
      "article_id": 14,
      "title": "The Mitch",
      "topic": "mitch",
      "author": "rogersop",
      "body": "The wonders of mitch",
      "created_at": "2024-01-19T10:30:57.616Z",
      "votes": 0,
      "article_img_url": "https://www.mitch.com/mitch",
      "comment_count": 0
    } */
