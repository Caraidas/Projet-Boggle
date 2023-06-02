import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import VolumeSlider from './components/VolumeSlider';
import Home from './pages/home';
import Login from './pages/login';
import Definitions from './pages/definitions';
import Carriere from './pages/carriere';
import Game from './pages/game';
import menuMusic from "./sound/daisy.mp3";
import ChatGame from './pages/chatGame';
import Signup from "./pages/signup"
import ProfilePage from './pages/profile';
import Social from './pages/social';

function App() {

  // Logo 
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  let r = getRandomInt(0, 4);
  let logo = require('./images/logo-' + r + '.png');

  // Variable de la musique actuellement en background
  const [bgMusic, setMusic] = useState(menuMusic);

  // pour ouvrir et fermer le slider
  const [isSoundOpen, setIsOpen] = useState(false);
  // pour le volume du son
  const [soundVolume, setVolume] = useState(localStorage.getItem('soundVolume') ? localStorage.getItem('soundVolume') : 100);

  // ---------------------------------
  const toggleSound = () => {
    setIsOpen(!isSoundOpen);
  }

  const changeSoundVolume = (value) => {
    setVolume(value);
  }

  const changeMusicVolume = (value) => {
    let music = document.getElementById("music");
    music.volume = value / 100;
  }
  // ------------------------------------

  if (isSoundOpen) {
    setTimeout(function() {toggleSound();}, 5000);
  }

  // detecter le click pour lancer la musique
  document.addEventListener('click', function(event) {
    let music = document.getElementById("music");
    changeMusicVolume(localStorage.getItem('musicVolume') ? localStorage.getItem('musicVolume') : 100)
    music.play();
  });

  // COuleur et avatar
  let pc = localStorage.getItem('primaryColor') ? localStorage.getItem('primaryColor') : '#F1E368';
  let ai = localStorage.getItem('avatarIndex') ? localStorage.getItem('avatarIndex') : 1;

  const [primaryColor, setPrimaryColor] = React.useState(pc);
  const [avatarIndex, setAvatarIndex] = React.useState(ai);

  function selectColor(color) {
    setPrimaryColor(color);
    console.log(color);
    localStorage.setItem("primaryColor", color);
  }

  function selectAvatar(index) {
    setAvatarIndex(index);
    console.log(index);
    localStorage.setItem("avatarIndex", index);
  }
  
  return (
    <Router>
      <audio id="music" src={bgMusic} autoPlay loop></audio>
      <Background />
      <Routes>
        <Route path='/' element={<Home avatarIndex={avatarIndex}  setMusic={setMusic} music={menuMusic} soundVolume={soundVolume} logo={logo} />} exact/>
        <Route path='/carriere' element={<Carriere avatarIndex={avatarIndex} primaryColor={primaryColor} />} exact/>
        <Route path='/login' element={<Login logo={logo} errorMessage="🐸 L'identifiant ou le mot de passe est incorrect 🐸" />} exact/>
        <Route path='/signup' element={<Signup logo={logo} />} exact/>
        <Route path='/definitions' element={<Definitions />} exact/>
        <Route path='/game' element={<ChatGame setMusic={setMusic} primaryColor={primaryColor} />} exact/>
        <Route path='/profile' element={<ProfilePage avatarIndex={avatarIndex} primaryColor={primaryColor} setColor={selectColor} setAvatar={selectAvatar} />} exact/>
        <Route path='/social' element={<Social/>} exact/>
      </Routes>
      <VolumeSlider isSoundOpen={isSoundOpen} toggleSound={toggleSound} changeSoundVolume={changeSoundVolume} changeMusicVolume={changeMusicVolume} />
    </Router>
  );
}

export default App;