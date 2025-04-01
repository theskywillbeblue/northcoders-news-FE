import { Link } from 'react-router';

export default function User() {
	return (
		<Link to='/articles'>
			<button>Browse Articles</button>
		</Link>
	);
}
