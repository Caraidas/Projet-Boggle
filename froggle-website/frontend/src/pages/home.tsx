import React, {useEffect} from 'react';
import MainPage from './../components/MainPage';
import { useNavigate} from 'react-router-dom';

const Home = (props : HomeProps) => {

  let img = require("../images/avatar" + props.avatarIndex + ".png");

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  useEffect(()=>{if (userData == null){
    navigate('/login');
  }})
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
  avatarIndex : any,
}

export default Home
