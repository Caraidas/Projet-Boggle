import React from 'react'
import MainPage from '../components/MainPage'

let img = require('../images/pfp.jpg');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let r = getRandomInt(0, 4);
let logo = require('../images/logo-' + r + '.svg');

const Home = () => {
  return (
    <>
        <MainPage text={"BeraM"} img={img} logo={logo}/>
    </>
  )
}

export default Home
