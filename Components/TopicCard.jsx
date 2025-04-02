import coding from '../src/assets/coding.png';
import football from '../src/assets/soccer-ball.png';
import cooking from '../src/assets/hot-pot.png';
import { Link } from 'react-router';

export default function TopicCard({ topic }) {
	const defaultImage =
		'https://i.pinimg.com/236x/cf/41/dc/cf41dc7ff5b6544aa53996244627a824.jpg';

	const images = {
		coding: coding,
		football: football,
		cooking: cooking,
	};

	return (
        <Link to={`/articles?topic=${topic}`}>
		<li className='topic-card'>
			<h2 id='topic-card-title'>{topic}</h2>
			<img src={images[topic] || defaultImage} id="topic-img"/>
		</li>
        </Link>
	);
}
