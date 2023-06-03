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

    setWordInput(UppercasedWord);

    // if (word !== "") {
    //   if (solvedWordslst.includes(UppercasedWord) && !foundWords.includes(UppercasedWord)) {
    //     console.log("oui");
    //     setFoundWords([...foundWords, UppercasedWord]);
    //     setWords(words + 1);
    //   }
    // }
  }

  function keyDownHandler(event) {
    if (event.key === "Enter") {
      let word = event.target.value;

      if (word !== "") {
        if (solvedWordslst.includes(word) && !foundWords.includes(word)) {
          console.log("oui");
          setFoundWords([...foundWords, word]);
          setWords(words + 1);
          onWordSent(word);
        }
      }
    }
  }

  let [foundWords, setFoundWords] = useState([]);
  let [words, setWords] = useState(0);
  let [wordInput, setWordInput] = useState("");
  let [players, setPlayers] = useState([]);
  let [showPopup, setShowPopup] = useState(false);

  const [me, setMe] = useState(null);
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    let p = []
    for (var i = 0; i < attendees.length; i++) {
      p.push([attendees[i], 0, 0, i + 1])
  
      if (attendees[i] == userData?.pseudo) {
        setMe([attendees[i], 0, 0, i + 1]);
      }
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
            <p>Nombre de mot trouvés: {me[1]} <br></br>Score: {stats[me[0]][0]} pts </p> 
            <button className="popup-btn" onClick={() => handleLeaving()}>Fermer</button>
          </div>
        </div>
      )}
      <div className='gameCont'>
        <div className='boardCont'>
          <div className='board'>
            {grid.split(" ").map((letter, index) => (
              <Cell key={index} letter={letter} soundVolume={soundVolume} primaryColor={primaryColor} />
            ))}
          </div>
          <input className='gameInput' type='text' onChange={(e) => changeHandler(e)} onKeyDown={(e) => keyDownHandler(e)} />
          {/* <button onClick={(e) => onWordSent(wordInput)}>Envoyer</button> */}
        </div>
        <div className='players'>
          {players.map(player => (
            <GameCard key={player[0]} picture={picture} name={player[0]} words={player[1]+"/"+solvedWords.length} points={stats[player[0]][0]} place={player[3]} />))}
        </div>
      </div>
    </>
  )
}

export default Game;
