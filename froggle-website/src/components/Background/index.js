import React from 'react'
import { Bg } from './BackgroundElements'; 

const bg = require("../../images/background.svg").default;

const Background = () => {
  return (
    <Bg src={bg} />
  )
}

export default Background
