import React from 'react';
import MainPage from './../components/MainPage';

let img = require('../images/pfp.jpg');

const Home = (props : HomeProps) => {

  props.setMusic(props.music);
  return (
    <MainPage soundVolume={props.soundVolume} text={"BeraM"} img={img} logo={props.logo}/>
  )
}

export interface HomeProps {
  toggleSound : () => void,
  soundVolume : number,
  setMusic : (any) => void,
  music : any,
  logo : any,
}

export default Home
