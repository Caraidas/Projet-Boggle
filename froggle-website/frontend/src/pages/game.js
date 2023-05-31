import React from 'react';
import Cell from '../components/Cell';
import "../css/styleGame.css";
import GameCard from '../components/GameCard';
import picture from "../images/pfp.jpg"
import gameMusic from "../sound/kirby.mp3";

const Game = ({ soundVolume, grid, setMusic, solvedWords, primaryColor }) => {

    setMusic(gameMusic);
    let solvedWordslst = solvedWords.split(" ");

    function changeHandler(event) {
        let word = event.target.value;
        let UppercasedWord = word.toUpperCase();
        event.target.value = UppercasedWord;
        
        if (word != "") {
            if (solvedWordslst.includes(UppercasedWord) && !foundWords.includes(UppercasedWord)) {
                console.log("oui");
                setFoundWords([...foundWords] + UppercasedWord);
                setWords(words + 1);
            }
        }
    }

    let [foundWords, setFoundWords] = React.useState([]);
    let [words, setWords] = React.useState(0);
  return (
    <>
        <div className='timer' style={{background: primaryColor}}>2:53</div>
        <div className='gameCont'>
            <div className='boardCont'>
                <div className='board'>
                    {grid.split(" ").map((letter) => (
                        <Cell letter={letter} soundVolume={soundVolume} primaryColor={primaryColor} />
                    ))}
                </div>
                <input className='gameInput' type='text' onChange={(e) => changeHandler(e)} />
                {words}
            </div>
            <div className='players'>
                <GameCard picture={picture} name="Nidal le mec louche sa mère" words="15/32" points={2034} place={1} />
                <GameCard picture={picture} name="Thonin77" words="15/32" points={34} place={4} />
                <GameCard picture={picture} name="Eloody" words="15/32" points={0} place={3} />
                <GameCard picture={picture} name="Bera77" words="15/32" points={390} place={2} />
            </div>
        </div>
    </>
  )
}

export default Game
