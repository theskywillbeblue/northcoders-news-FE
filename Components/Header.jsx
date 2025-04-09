import logo from '../src/assets/Logo.svg';
import user from '../src/assets/user.png';
import { Link } from 'react-router';

export default function Header() {
	return (
		<>
			<header>
				<div id='header-content'>
					<Link to='/'>
						<img src={logo} className='logo' />
					</Link>
					<Link to='user'>
						<img src={user} className='user-logo' />
					</Link>
				</div>
			</header>
			<div className='line'></div>
		</>
	);
}
