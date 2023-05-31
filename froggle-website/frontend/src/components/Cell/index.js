import React, { useState } from 'react'
import { CellContainer, Letter } from './CellElements'
import click from "../../sound/toggleLetter.wav";

const Cell = ({ letter, soundVolume, primaryColor }) => {

    let [isToggled, setToggle] = useState(false);

    function playSound() {
        let audio = new Audio(click);
        audio.volume = soundVolume / 100;
        audio.play();
    }

    function toggle() {
        setToggle(!isToggled);
        playSound();
    }

  return (
    <CellContainer onClick={toggle} primaryColor={primaryColor} isToggled={isToggled}>
        <Letter>
            {letter}
        </Letter>
    </CellContainer>
  )
}

export default Cell
