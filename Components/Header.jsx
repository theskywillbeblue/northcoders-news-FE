import logo from '../src/assets/Logo.svg'
import user from '../src/assets/user.png'
import {Link} from 'react-router'

export default function Header() {

	return (<header><Link to="/"><img src={logo} className='logo'/></Link><hr /><img src={user} className='user-logo'/></header>)
}
