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

const Game = (props : { soundVolume : any, grid : any, setMusic : any, solvedWords : any, onWordSent : any, attendees : any, primaryColor : any, stats : any, duration : any, onLeaving : any, onClosing : any }) => {
  props.setMusic(gameMusic);
  let solvedWordslst = props.solvedWords.split(" ");

  function changeHandler(event) {
    let word = event.target.value;
    let UppercasedWord = word.toUpperCase();
    event.target.value = UppercasedWord;

    setWordInput(UppercasedWord);
  }

  function keyDownHandler(event) {
    if (event.key === "Enter") {
      let word = event.target.value;

      if (word !== "") {
        if (solvedWordslst.includes(word) && !foundWords.includes(word)) {
          setFoundWords([...foundWords, word]);
          setWords(words + 1);
          props.onWordSent(word);
        }
      }
    }
  }

  const [foundWords, setFoundWords] : any[] = useState([]);
  const [words, setWords] = useState(0);
  const [wordInput, setWordInput] = useState("");
  const [players, setPlayers] : any[] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [ranks,  setRanks] : any[] = useState([]);
  const [popupLogo, setPopupLogo] = useState(defeat);

  const navigate = useNavigate();
  const [me, setMe] : any[] = useState([]);
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    let p : any[] = []
    for (var i = 0; i < props.attendees.length; i++) {
      p.push([props.attendees[i], 0, 0, i + 1])
  
      if (props.attendees[i] == userData?.pseudo) {
        setMe([props.attendees[i], 0, 0, i + 1]);
      }
    }
    setPlayers(p)
  }, [])

  const handleCountdownFinished = () => {
    setShowPopup(true);
  };

  function handleLeaving() {
      props.onLeaving()
      props.onClosing()
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
    updateRanks(props.stats);
    if(ranks[userData?.pseudo] == 1){
      setPopupLogo(victory)
    }else setPopupLogo(defeat)
  }, [props.stats]);


  function insertGameData() {
    let id = userData?.ID_Joueur;
    let xp = userData?.XP_Actuel;
    let stats = props.stats;
    let grid = props.grid;

    if (Object.keys(ranks).length > 1) {
      axios.post("http://localhost/boggle/php/insertGameData.api.php", {stats, grid,id,ranks,xp})
      .then((response) => {
          if (response.data.status === "success") {
            const test = {ID_Joueur: id, classementData: response.data.classementData, historique: response.data.historique, pseudo: userData?.pseudo, XP_Actuel: response.data.XP_Actuel, Photo_De_Profile: userData?.Photo_De_Profile, Est_Prive:userData?.Est_Prive};
            localStorage.setItem('userData', JSON.stringify(test));
            console.log("success")
          } else if(response.data.status === "error") {
              console.log("error")
          }
      })
      .catch(error => console.log(error));
    }

    navigate('/');
  }

  return (
    <>
      <div className='timer' style={{ background: props.primaryColor }}>
        <Countdown duration={props.duration} onCountdownFinished={handleCountdownFinished} />
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content" style={{ background: props.primaryColor }}>
            <img className="winLogo" src={popupLogo}/>
            <p>Nombre de mot trouvés: {props.stats[me[0]][1].length} <br></br>Score: {props.stats[me[0]][0]} pts </p> 
            <button className="popup-btn" onClick={() => { handleLeaving(); insertGameData(); }}>Fermer</button>
          </div>
        </div>
      )}
      <div className='gameCont'>
        <div className='boardCont'>
          <div className='board'>
            {props.grid.split(" ").map((letter, index) => (
              <Cell key={index} letter={letter} soundVolume={props.soundVolume} primaryColor={props.primaryColor} />
            ))}
          </div>
          <input className='gameInput' type='text' onChange={(e) => changeHandler(e)} onKeyDown={(e) => keyDownHandler(e)} />
        </div>
        <div className='players'>
          {players.map(player => (
            <GameCard key={player[0]} picture={picture} name={player[0]} words={props.stats[player[0]][1].length + "/" + props.solvedWords.length} points={props.stats[player[0]][0]} place={ranks[player[0]]} />))}
        </div>
      </div>
    </>
  )
}

export default Game;
