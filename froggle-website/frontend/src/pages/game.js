import React, { useEffect } from 'react';
import Cell from '../components/Cell';
import "../css/styleGame.css";
import GameCard from '../components/GameCard';
import picture from "../images/pfp.jpg"
import gameMusic from "../sound/kirby.mp3";

const Game = ({ soundVolume, grid, setMusic, solvedWords, onWordSent, attendees , primaryColor, stats}) => {

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
    ////onChange={(e) => changeHandler(e)

    let [foundWords, setFoundWords] = React.useState([]);
    let [words, setWords] = React.useState(0);
    let [wordInput, setWordInput] = React.useState("");
    let [players, setPlayers] = React.useState([]);

    React.useEffect(() => {
       let p = []
       for (var i = 0; i < attendees.length; i++) {
            p.push([attendees[i],0,0,i+1])
        }
      setPlayers(p)
    }, [])
  return (
    <>
        <div className='timer' style={{background: primaryColor}}>2:53</div>
        <div className='gameCont'>
            <div className='boardCont'>
                <div className='board'>
                    {grid.split(" ").map((letter, index) => (
                        <Cell key={index} letter={letter} soundVolume={soundVolume} primaryColor={primaryColor} />
                    ))}
                </div>
                <input className='gameInput' type='text' onChange={(e) => setWordInput(e.target.value)} />
                <button onClick={(e) => onWordSent(wordInput)}>Envoyer</button>
            </div>
            <div className='players'>
            {players.map(player => (
             
                <GameCard key={player[0]} picture={picture} name={player[0]} words={player[1]+"/"+solvedWords.length} points={stats[player[0]][0]} place={player[3]} />
                
           ))}
            </div>
        </div>
    </>
  )
}

export default Game
