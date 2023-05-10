import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import VolumeSlider from './components/VolumeSlider';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/Header';
import Carriere from './pages/carriere';

function App() {
  // pour ouvrir et fermer le slider
  const [isSoundOpen, setIsOpen] = useState(false);
  // pour le volume du son
  const [soundVolume, setVolume] = useState(100);
  // pour le volume de la musique
  const [musicVolume, setMusicVolume] = useState(100);

  const toggleSound = () => {
    setIsOpen(!isSoundOpen);
  }

  const changeSoundVolume = (value) => {
    setVolume(value);
  }

  const changeMusicVolume = (value) => {
    setMusicVolume(value);
  }

  if (isSoundOpen) {
    setTimeout(function() {toggleSound();}, 5000);
  }

  return (
    <Router>
      <Background />
      <Routes>
        <Route path='/home' element={<Home soundVolume={soundVolume}/>} exact/>
        <Route path='/carriere' element={<Carriere />} exact/>
        <Route path='/login' element={<Login />} exact/>
        <Route path='/register' element={<Register />} exact/>
      </Routes>
      <VolumeSlider isSoundOpen={isSoundOpen} toggleSound={toggleSound} changeSoundVolume={changeSoundVolume} changeMusicVolume={changeMusicVolume} />
    </Router>
  );
}

export default App;
