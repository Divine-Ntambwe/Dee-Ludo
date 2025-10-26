import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Splash from './Pages/Splash';
import { createContext } from 'react'
export const TokensContext = createContext();
function App() {
   const [bluePositions,setBluePositions] = useState(null)
  
  return (
    <>
   
    <TokensContext.Provider value={{bluePositions,setBluePositions}}>
    <Router>
      <Routes>
        <Route path='/' element={<Splash/>} />
      </Routes>
    </Router>
    </TokensContext.Provider>
    </>
  )
}

export default App
