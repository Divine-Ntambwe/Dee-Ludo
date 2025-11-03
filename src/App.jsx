import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./Pages/Game";
import Splash from "./Pages/Splash"
import { createContext } from "react";
export const TokensContext = createContext();
function App() {
  const [bluePositions, setBluePositions] = useState(null);
  const [redPositions, setRedPositions] = useState(null);
  const [greenPositions, setGreenPositions] = useState(null);
  const [yellowPositions, setYellowPositions] = useState(null);

  return (
    <>
      <TokensContext.Provider
        value={{
          bluePositions,
          setBluePositions,
          redPositions,
          setRedPositions,
          greenPositions,
          setGreenPositions,
          yellowPositions,
          setYellowPositions
        }}
      >
        <Router>
          <Routes>
            {/* <Route path="/" element={<Splash/>} /> */}
            <Route path="/" element={<Game/>}/>
          </Routes>
        </Router>
      </TokensContext.Provider>
    </>
  );
}

export default App;
