import Header from '../Components/Header'
import User from '../Components/User'
import Articles from '../Components/Articles'
import Article from '../Components/Article'
import {Route, Routes} from "react-router"
import './App.css'
import { UserProvider } from '../Contexts/userContext.jsx'


function App() {

  return (
    <UserProvider>
    <>
     <Header />
      <Routes>
        <Route path='/' element={<User />}/>
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<Article />} />
      </Routes>
    </>
    </UserProvider>
  )
}

export default App
