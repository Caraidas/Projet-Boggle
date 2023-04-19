import React from 'react'
import LoginPage from '../components/Login'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let r = getRandomInt(0, 4);
let logo = require('../images/logo-' + r + '.png');

const Login = () => {

  return (
    <LoginPage logo={logo} submitText={"S'identifier"} errorMessage={"🐸 L'identifiant ou le mot de passe est incorrect 🐸"}/>
  )
}

export default Login
