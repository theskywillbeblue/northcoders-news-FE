import './App.css';
import { Routes, Route} from 'react-router';
import { UserProvider } from '../Contexts/userContext';
import { PrimeReactProvider } from 'primereact/api';

import Article from '../Components/Article';
import Articles from '../Components/Articles';
import Header from '../Components/Header';
import User from '../Components/User';
import Home from '../Components/Home'
import NotFound from '../Components/NotFound';

function App() {
	return (
		<PrimeReactProvider>
			<UserProvider>
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
						<Route path='/articles' element={<Articles />} />
						<Route path='/articles/:article_id' element={<Article />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
			</UserProvider>
		</PrimeReactProvider>
	);
}

export default App;
