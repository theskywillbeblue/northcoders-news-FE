import { UserContext } from '../Contexts/userContext';
import { useContext } from 'react';
import profilePic from '../src/assets/user.png';
import { Fieldset } from 'primereact/fieldset';

export default function User() {
	const { user } = useContext(UserContext);

	return (
		<section id='user-profile'>
			<h2>Welcome {user.username}!</h2>
			<img src={profilePic} id='profile-pic' />
			<span>
			<Fieldset legend='Name'>
				<p>
					John Smith
				</p>
			</Fieldset>
			<Fieldset legend='Location'>
				<p>
					Manchester, United Kingdom
				</p>
			</Fieldset>
			<Fieldset legend='Membership Level'>
				<p>
					Premium
				</p>
			</Fieldset>
			</span>
		</section>
	);
}
