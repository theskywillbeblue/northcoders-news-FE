import logo from '../src/assets/Logo.png'
import user from '../src/assets/user.jpg'
import {Link} from 'react-router'

export default function Header() {

	return (<header><Link to="/"><img src={logo} className='logo'/></Link><img src={user} className='user-logo'/></header>)
}
