import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import Home from './pages';

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path='/' element={<Home />} exact/>
      </Routes>
    </Router>
  );
}

export default App;
