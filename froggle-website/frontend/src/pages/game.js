import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';
import "../css/styleGame.css";
import GameCard from '../components/GameCard';
import picture from "../images/pfp.jpg";
import gameMusic from "../sound/kirby.mp3";
import Countdown from '../components/Countdown';
import victory from "../images/victoire.png";

const Game = ({ soundVolume, grid, setMusic, solvedWords, onWordSent, attendees, primaryColor, stats, duration, onLeaving, onClosing }) => {
  setMusic(gameMusic);
  let solvedWordslst = solvedWords.split(" ");

  function changeHandler(event) {
    let word = event.target.value;
    let UppercasedWord = word.toUpperCase();
    event.target.value = UppercasedWord;

    if (word !== "") {
      if (solvedWordslst.includes(UppercasedWord) && !foundWords.includes(UppercasedWord)) {
        console.log("oui");
        setFoundWords([...foundWords, UppercasedWord]);
        setWords(words + 1);
      }
    }
  }

  let [foundWords, setFoundWords] = useState([]);
  let [words, setWords] = useState(0);
  let [wordInput, setWordInput] = useState("");
  let [players, setPlayers] = useState([]);
  let [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let p = []
    for (var i = 0; i < attendees.length; i++) {
      p.push([attendees[i], 0, 0, i + 1])
    }
    setPlayers(p)
  }, [])

  const handleCountdownFinished = () => {
    setShowPopup(true);
  };

  function handleLeaving() {
      onLeaving()
      onClosing()
  }

  return (
    <>
      <div className='timer' style={{ background: primaryColor }}>
        <Countdown duration={duration} onCountdownFinished={handleCountdownFinished} />
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content" style={{ background: primaryColor }}>
            <img className="winLogo" src={victory}/>
            <p>Nombre de mot trouvés: 42 <br></br>Score: 123 pts </p> 
            <button className="popup-btn" onClick={() => handleLeaving()}>Fermer</button>
          </div>
        </div>
      )}
      <div className='gameCont'>
        <div className='boardCont'>
          <div className='board'>
            {grid.split(" ").map((letter) => (
              <Cell letter={letter} soundVolume={soundVolume} primaryColor={primaryColor} />
            ))}
          </div>
          <input className='gameInput' type='text' onChange={(e) => setWordInput(e.target.value)} />
          <button onClick={(e) => onWordSent(wordInput)}>Envoyer</button>
          {words}
        </div>
        <div className='players'>
          {players.map(player => (
            <GameCard picture={picture} name={player[0]} words={player[1] + "/" + solvedWords.length} points={player[2]} place={player[3]} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Game;
