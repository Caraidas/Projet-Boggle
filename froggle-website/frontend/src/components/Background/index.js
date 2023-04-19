import React from 'react'
import { Bg } from './BackgroundElements'; 

const bg = require("../../images/background.svg").default;

const Background = ({ toggleSound }) => {
  return (
    <Bg onclick={toggleSound} src={bg} />
  )
}

export default Background
