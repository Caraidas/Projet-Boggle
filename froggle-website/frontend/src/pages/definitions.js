import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import DefinitionCard from '../components/DefinitionCard'
import "../css/styleDefinition.css";
import smartFrog from "../images/smart-frog.png";
import { useNavigate  } from 'react-router-dom';
import Background from '../components/Background';


function getRandomSentence() {
  
  

  const sentences = [
    "Je mangerais bien un asticot pour le goûter...",
    "Hmmmm, mais où sont mes lunettes ? Ah sur mon nez ... Ah non j'ai pas de nez.",
    "Sacrebleu, ce problème de mathématiques est un vrai crôa-ssetête.",
    "Astuces: si un mot à plusieurs significations, n'hésitez pas à le rentrer en majuscules comme ceci: \"CONGRES\"",
    "Le saviez-vous? Certaines grenouilles peuvent changer de couleur de peau selon leurs environment. On appelle cela le polychromatisme.",
    "Crôôaaaaa, Crôaaaaaaaaaaa ♪♫♫ CRÔA, crôaaaaaaaa ♫, CRÔAAAAA ♪	♪	♪	♪	!!!! Ah pardon je m'entrainais à séduire Bernadette.",
    "J'adore chanter les jours de pluies ♪",
    "Tout à l'heure j'ai mangé une mouche bien croustillante.",
    "Berdanette est vraiment trop crôaquante...."
  ];

  
  const index = Math.floor(Math.random() * sentences.length);
  const sentence = sentences[index];
  return sentence
}

const Definitions = ({primaryColor}) => {
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  useEffect(()=>{if (userData == null){
    navigate('/login');
  }})

  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);
  const[sentence, setSentence] = useState(getRandomSentence())

  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setSentence(getRandomSentence())
      const response = await fetch(`http://localhost/boggle/php/definitions.php?word=${inputValue}`);
      const data = await response.json();
      setOutput(data);
  };

 
  return (
    <>
      <Header text="Définitions" />
      <div className="container-def">
        <div class="definitionsContainer">
            <form onSubmit={handleSubmit}>
                <div className="search">
                  <input className="definitionInput" type="text" value={inputValue} onChange={handleInputChange} />
                  <button className="definitionSubmit" type="submit" style={{ background: primaryColor }}>Rechercher</button>
                </div>
            </form>
            { output == "" &&
            <p className="defMessage">Vous n'avez pas encore fait de recherche 🐸</p>}
            {output.map((word, index) => (
                <DefinitionCard key={index} title={word.title} definitions={word.définitions} primaryColor={primaryColor}/>
            ))}
        </div>
        <div className="sideContainer">
          <div className="bubble" >
            { output == "" &&
            <p>Vous ne connaissez pas la signification d'un mot? Cherchez le dans le dico du Froggesseur René.</p>}
             { output != "" &&
            sentence}
            
          </div>
          <img className="frog" src={smartFrog}/>
        </div>
      </div>
    </>
  )
}

export default Definitions