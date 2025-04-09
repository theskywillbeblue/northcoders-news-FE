import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from '../Contexts/userContext';
import { PrimeReactProvider } from 'primereact/api';

import Article from '../Components/Article';
import Articles from '../Components/Articles';
import Header from '../Components/Header';
import User from '../Components/User';
import Topics from '../Components/Topics';
import NotFound from '../Components/NotFound';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
	return (
		<PrimeReactProvider>
			<UserProvider>
				<Header />
				<main>
				<Routes>
					<Route path='/' element={<Articles />} />
					<Route path='/articles' element={<Articles />} />
					<Route path='/user' element={<User />} />
					<Route path='/topics' element={<Topics />} />
					<Route path='/articles/:article_id' element={<Article />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				</main>
			</UserProvider>
		</PrimeReactProvider>
	);
}

export default App;
