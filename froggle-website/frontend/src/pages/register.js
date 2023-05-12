import React from 'react'
import LoginPage from '../components/Register'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let r = getRandomInt(0, 4);
let logo = require('../images/logo-' + r + '.png');

const Register = () => {

  return (
    <LoginPage logo={logo} submitText={"S'identifier"}/>
  )
}

export default Register