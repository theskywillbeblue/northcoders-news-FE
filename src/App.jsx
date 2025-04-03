import Header from '../Components/Header'
import User from '../Components/User'
import Articles from '../Components/Articles'
import Article from '../Components/Article'
// import { Route, Routes} from "react-router"
import{ BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css'
import { UserProvider } from '../Contexts/userContext.jsx'
import { PrimeReactProvider } from 'primereact/api';
import NotFound from '../Components/NotFound.jsx'



function App() {

  return (
    <PrimeReactProvider>
    <UserProvider>
    <>
   
     <Header />
      <Routes>
        <Route path='/' element={<User />}/>
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<Article />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

    </>
    </UserProvider>
    </PrimeReactProvider>
  )
}

export default App
