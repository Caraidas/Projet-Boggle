import React from 'react';
import Cell from '../components/Cell';
import "../css/styleGame.css";

const Game = ({ soundVolume, grid }) => {
  return (
    <>
        <div className='timer'>2:53</div>
        <div className='gameCont'>
            <div className='boardCont'>
                <div className='board'>
                    {grid.split(" ").map((letter) => (
                        <Cell letter={letter} soundVolume={soundVolume} />
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Game
