import coding from '../src/assets/coding.png';
import football from '../src/assets/soccer-ball.png';
import cooking from '../src/assets/hot-pot.png';
import { Link } from 'react-router';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

export default function TopicCard({ topic }) {


	const topicNames = {
		coding: 'Coding',
		football: 'Football',
		cooking: 'Cooking',
	}

	return (
        <Link to={`/articles?topic=${topic}`}>
		<li className='topic-card'>
			<h2 id='topic-card-titles'>{topicNames[topic]}</h2>
		</li>
		
        </Link>
	);
}
