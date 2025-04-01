import { useState } from 'react'
import Header from '../Components/Header'
import Articles from '../Components/Articles'
import Article from '../Components/Article'
import {Route, Routes} from "react-router"
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header />
      <Routes>
     
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<Article />} />
      </Routes>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
       <div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
      </div>
    </>
  )
}

export default App
