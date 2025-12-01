import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./Pages/Game";
import Splash from "./Pages/Splash"
import { createContext } from "react";
import Dice from "./Components/Dice";
export const TokensContext = createContext();
function App() {
  const [bluePositions, setBluePositions] = useState(null);
  const [redPositions, setRedPositions] = useState(null);
  const [greenPositions, setGreenPositions] = useState(null);
  const [yellowPositions, setYellowPositions] = useState(null);
  // const [playerColors,setPlayerColors] = useState(null); //stores names of colors that are playing
  // const [colors,setColors] = useState(null); //stores actual colors of colors that are playing
  const [numOfPlayers,setNumOfPlayers] = useState(3); //stores num of players playing
  // const [playingNums,setPlayingNums] = useState(null); //stores the number of the colors playing
  const diceComp = useRef();

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
          setYellowPositions,
          setNumOfPlayers,
          numOfPlayers,
          diceComp
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Splash/>} />
            <Route path="/Ludo" element={<Game/>}/>
          </Routes>
        </Router>
      </TokensContext.Provider>
    </>
  );
}

export default App;
