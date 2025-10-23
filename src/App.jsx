import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Splash from './Pages/Splash';
import { createContext } from 'react'
export const CanvasContext = createContext();
function App() {
  const canvas = useRef();
  
  return (
    <>
    <canvas style={{display:"none"}} ref={canvas}/>
    <CanvasContext.Provider value={canvas.current}>
    <Router>
      <Routes>
        <Route path='/' element={<Splash/>} />
      </Routes>
    </Router>
    </CanvasContext.Provider>
    </>
  )
}

export default App
