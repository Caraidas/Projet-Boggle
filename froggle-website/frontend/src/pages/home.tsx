import React from 'react';
import MainPage from './../components/MainPage';
import { useNavigate} from 'react-router-dom';

let img = require('../images/pfp.jpg');

const Home = (props : HomeProps) => {

  const userDataString = localStorage.getItem('userData');
  const navigate = useNavigate();
  const userData = userDataString ? JSON.parse(userDataString) : null;
  if (userData == null){
    navigate('/login');
  }
  props.setMusic(props.music);
  return (
    <MainPage soundVolume={props.soundVolume} text={userData?.pseudo} img={img} logo={props.logo}/>
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
