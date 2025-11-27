import React, { useContext, useEffect, useRef } from 'react'
import './GradientText.css'
import { TokensContext } from '../App';

function Dice({setDiceNum}) {
    const {diceComp} = useContext(TokensContext);
    let btn = useRef();
    const rollBtn = btn.current

    const randomDice = () => {
    
        const random = Math.floor(Math.random() * 10) ;
    
        if (random >= 1 && random <= 6) {
            rollDice(random);
            setDiceNum(random)
            localStorage.setItem("diceNum",random)
            return random
        }
        else {
            randomDice();
        }
        
    }


const rollDice = random => {
     const dice = diceComp.current;
    dice.style.animation = 'rolling 2s';

    setTimeout(() => {

        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;

            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;

            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;

            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;

            default:
                break;
        }

        dice.style.animation = 'none';

    }, 2050);

}
  return (
    <div>
        {/* <div className="container"> */}
        
        <div ref={diceComp} onClick={randomDice} class="dice">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
            <div class="face right"></div>
            <div class="face left"></div>
        </div>

        {/* <button ref={btn} onClick={randomDice} class="roll">
            Roll Dice
        </button> */}

    {/* </div> */}
    </div>
  )
}

export default Dice