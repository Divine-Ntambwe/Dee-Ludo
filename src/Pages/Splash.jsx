import React, { useContext } from "react";
import bgImg from "../assets/Splash.png";
import styles from "./Splash.module.css";
import blueToken from "../assets/bLue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import SplitText from "../Components/SplitText";
import GradientText from "../Components/GradientText";
import Silk from "../Components/Background";
import Particles from "../Components/Particles";
import Galaxy from "../Components/Galaxy";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TokensContext } from "../App";
function Splash() {
  const nav = useNavigate()
  const [open, setOpen] = React.useState(false);
  const {setNumOfPlayers,numOfPlayers,setPlayerColors,setColors,setPlayingNums} = useContext(TokensContext);

  function handleStartPnP(){
    nav("/Ludo")
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <React.Fragment>
   
      <Dialog
        sx={{backgroundColor:"transparent"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{color:"rgb(196, 87, 236)", backgroundColor:"rgb(235, 223, 247)"}}id="alert-dialog-title">
          {"Select Players"}
        </DialogTitle>
        <DialogContent sx={{background:"rgb(235, 223, 247)"}}>
          <DialogContentText id="alert-dialog-description">
            <div className={styles.selectPlayersLabel}>
              
            <input onChange={()=>{
              setNumOfPlayers(2);
              nav("/Ludo");
            }}  name="players"type="radio" value="2 Players"/>
            <p>2 Players</p> <span><img src={blueToken}/> <img src={greenToken}/></span>
            </div>
            <div className={styles.selectPlayersLabel}>
              
            <input onChange={()=>{
              setNumOfPlayers(3);
              nav("/Ludo");
            }} name="players" type="radio" value="2 Players"/>
            <p>3 Players</p> <span><img src={blueToken}/> <img src={redToken}/> <img src={greenToken}/></span>
            </div>

            <div className={styles.selectPlayersLabel}>
              
            <input
            onChange={()=>{
              setNumOfPlayers(4);
              nav("/Ludo");
            }}
             name="players" type="radio" value="2 Players"/>
            <p>4 Players</p> <span><img src={blueToken}/> <img src={redToken}/> <img src={greenToken}/> <img src={yellowToken}/></span>
            </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{background:"rgb(235, 223, 247)",color:"rgb(196, 87, 236)"}}>
         {/* {numOfPlayers && <Button sx={{color:"rgb(196, 87, 236)"}}  onClick={handleStartPnP} autoFocus>
            Play
          </Button>} */}
          <Button sx={{color:"rgb(196, 87, 236)"}} onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      <div className={styles.splashBg}>
        {/* <div style={{ width: '95vw', height: '95vw', position: 'relative' }}> */}
  <Galaxy />

      </div>

      <div className={styles.splashScreen}>
        <div className={styles.tokenContainer}>
          <img src={redToken} />
          <img src={greenToken} />
        </div>

        <div className={styles.middleSec}>
          <h1>Dee Ludo</h1>

          <img className={styles.bgImg} src={bgImg} />
          <button className={styles.openSelector}onClick={()=>{
            handleClickOpen()
          }}>Pass and Play</button>
        </div>

        <div className={styles.tokenContainer}>
          <img src={blueToken} />
          <img src={yellowToken} />
        </div>
      </div>
    </>
  );
}

export default Splash;
