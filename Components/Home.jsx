import { Link } from 'react-router';
import {getTopics} from '../api'
import { useEffect, useState } from 'react';
import TopicCard from './TopicCard';

export default function User() {
	const [topicList, setTopicList] = useState([]);

	useEffect(() => {
		getTopics()
			.then((data) => {
				setTopicList(data.topics);
			})
			.catch((err) => {
				serError(err);
			});
	}, []);


	return (
		<div className='user-home'>
			<Link to='/articles'>
				<button id="browse-all-button" >Browse all articles</button>
			</Link>

			<h2 id="select-topic-header">Browse articles by topic</h2>
			<ul>
				{topicList.map((topic) => {
					return <TopicCard key={topic.slug} topic={topic.slug} />;
				})}
			</ul>
		</div>
	);
}
