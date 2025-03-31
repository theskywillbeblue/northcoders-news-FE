import { useState } from 'react'
import Header from '../Components/Header'
import Articles from '../Components/Articles'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Header />
    <Articles />
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
