import React from 'react';
import { GameCardCont, Name, Picture, Words, Place, Points } from './GameCardElements';

function GameCard({ words, points, name, picture, place }) {

  function clickHandler(name) {
    console.log(name);
  }

  return (
    <GameCardCont>
        <Picture src={picture} />
        <Place>{place}</Place>
        <Name title={name}>{name}</Name>
        <Words>{words}</Words>
        <Points>{points} pts</Points>
    </GameCardCont>
  )
}

export default GameCard
