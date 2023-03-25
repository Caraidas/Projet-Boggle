import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import VolumeSlider from './components/VolumeSlider';
import Home from './pages/home';

function App() {
  // pour ouvrir et fermer le slider
  const [isSoundOpen, setIsOpen] = useState(false);

  const toggleSound = () => {
    setIsOpen(!isSoundOpen);
    console.log(isSoundOpen);
  }

  setTimeout(function() { 
    if (isSoundOpen) {
      toggleSound();
    }
  }, 5000);

  return (
    <Router>
      <Background />
      <Routes>
        <Route path='/home' element={<Home />} exact/>
      </Routes>
      <VolumeSlider isSoundOpen={isSoundOpen} toggleSound={toggleSound} />
    </Router>
  );
}

export default App;
