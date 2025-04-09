import { Link } from 'react-router-dom';


export default function TopicCard({ topic }) {
	const topicNames = {
		coding: 'Coding',
		football: 'Football',
		cooking: 'Cooking',
		music: 'Music',
		movies: 'Movies'
	};

	return (
		<Link to={`/articles?topic=${topic}`}>
			<li className='topic-card'>
				<h2 id='topic-card-titles'>{topicNames[topic]}</h2>
			</li>
		</Link>
	);
}
