import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cell from '../components/Cell';
import "../css/styleGame.css";
import GameCard from '../components/GameCard';
import picture from "../images/pfp.jpg";
import gameMusic from "../sound/kirby.mp3";
import Countdown from '../components/Countdown';
import victory from "../images/victoire.png";
import defeat from "../images/defaite.png";
import axios from 'axios'

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
  let [ranks,  setRanks] = useState([]);
  let [popupLogo, setPopupLogo] = useState(defeat);

  const navigate = useNavigate();
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

  const updateRanks = (stats) => {
    // Copie de l'array stats pour éviter les mutations directes
    const statsCopy = { ...stats };
  
    // Trier les joueurs en fonction de leur score
    const sortedPlayers = Object.keys(statsCopy).sort(
      (a, b) => statsCopy[b][0] - statsCopy[a][0]
    );
  
    // Mettre à jour les positions dans le classement
    const updatedRanks = sortedPlayers.reduce((acc, player, index) => {
      acc[player] = index + 1;
      return acc;
    }, {});
  
    // Mettre à jour la variable d'état ranks
    setRanks(updatedRanks);
  };

  useEffect(() => {
    updateRanks(stats);
    if(ranks[userData?.pseudo] == 1){
      setPopupLogo(victory)
    }else setPopupLogo(defeat)
  }, [stats]);


  function insertGameData() {
    let id = userData?.ID_Joueur;
    console.log(userData);
    console.log(id);
    axios.post("http://localhost/boggle/php/insertGameData.api.php", {stats,grid,id})
    .then((response) => {
        console.log(response.data);
        console.log(response.data.status);
        console.log(response.data.classementData);
        console.log(response.data.historique);
        if (response.data.status === "success") {
          const userData = {ID_Joueur: id, classementData: response.data.classementData, historique: response.data.historique, pseudo: userData?.pseudo, XP_Actuel: userData?.XP_Actuel, Photo_De_Profile: userData?.Photo_De_Profile, Est_Prive:userData?.Est_Prive};
          localStorage.setItem('userData', JSON.stringify(userData));
          console.log("success")
          navigate('/game');
        } else if(response.data.status === "error") {
            console.log("error")
        }
    })
    .catch(error => console.log(error));
  }  
  console.log("STATS")
  console.log(stats)
  console.log("RANKS")
  console.log(ranks)
  console.log(userData?.pseudo)

  return (
    <>
      <div className='timer' style={{ background: primaryColor }}>
        <Countdown duration={duration} onCountdownFinished={handleCountdownFinished} />
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content" style={{ background: primaryColor }}>
            <img className="winLogo" src={popupLogo}/>
            <p>Nombre de mot trouvés: {stats[me[0]][1].length} <br></br>Score: {stats[me[0]][0]} pts </p> 
            <button className="popup-btn" onClick={() => { handleLeaving(); insertGameData(); }}>Fermer</button>
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
        </div>
        <div className='players'>
          {players.map(player => (
            <GameCard key={player[0]} picture={picture} name={player[0]} words={stats[me[0]][1].length+"/"+solvedWords.length} points={stats[player[0]][0]} place={ranks[userData?.pseudo]} />))}
        </div>
      </div>
    </>
  )
}

export default Game;
