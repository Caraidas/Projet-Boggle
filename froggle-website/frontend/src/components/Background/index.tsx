import React from 'react'
import { Bg, BgCont } from './BackgroundElements'; 

const bg = require("../../images/background.svg").default;

const Background = ({ toggleSound }) => {

  return (
    <BgCont>
      <Bg onclick={toggleSound} src={bg} />
    </BgCont>
  )
}

export default Background
