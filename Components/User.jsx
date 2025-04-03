import { UserContext } from '../Contexts/userContext';
import { useContext } from 'react';
import profilePic from '../src/assets/user.png';

export default function User() {
	const { user } = useContext(UserContext);

	return (
		<section id='user-profile'>
			<h2>Welcome {user.username}!</h2>
			<img src={profilePic} id='profile-pic' />
		</section>
	);
}
