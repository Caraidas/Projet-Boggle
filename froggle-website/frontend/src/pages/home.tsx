import React from 'react';
import MainPage from './../components/MainPage';

let img = require('../images/pfp.jpg');

function getRandomInt(min : number, max : number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let r = getRandomInt(0, 4);
let logo = require('../images/logo-' + r + '.png');

const Home = (props : HomeProps) => {

  props.setMusic(props.music);
  return (
    <MainPage soundVolume={props.soundVolume} text={"BeraM"} img={img} logo={logo}/>
  )
}

export interface HomeProps {
  toggleSound : () => void,
  soundVolume : number,
  setMusic : (any) => void,
  music : any,
}

export default Home
