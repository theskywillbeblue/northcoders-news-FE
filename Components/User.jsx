import { Link } from 'react-router';
import { getTopics } from '../api';
import { useEffect, useState } from 'react';

export default function User() {
const [topicList, setTopicList] = useState([])


	useEffect(() => {
		getTopics()
			.then((data) => {
				setTopicList(data.topics);
			})
			.catch((err) => {
				throw (err);
			})
	}, [topicList]);

console.log(topicList)

	return (
		<div className='user-home'>
			<Link to='/articles'>
				<button>Browse All Articles</button>
			</Link>
			<select id='topic-category-dropdown'><option>Select a Topic</option>
			{topicList.map((topic) => {
						return (
							<option key={topic.slug} value={topic.slug}>
								{topic.slug}
							</option>
						);
					})}
			
			</select>
		</div>
	);
}
