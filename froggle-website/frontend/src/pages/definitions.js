import React, {useState} from 'react'
import Header from '../components/Header';
import DefinitionCard from '../components/DefinitionCard'
import "../css/styleDefinition.css";
import smartFrog from "../images/smart-frog.png";


const Definitions = () => {

  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);

  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      const response = await fetch(`http://localhost/boggle/php/definitions.php?word=${inputValue}`);
      const data = await response.json();
      setOutput(data);
  };

  return (
    <>
        <Header text="Définitions" />
      <div className="container">
        
        <div class="definitionsContainer">
            <form onSubmit={handleSubmit}>
                <div className="search">
                  <input className="definitionInput" type="text" value={inputValue} onChange={handleInputChange} />
                  <button className="definitionSubmit" type="submit">Rechercher</button>
                </div>
            </form>
            {output.map((word, index) => (
              console.log(index),
                <DefinitionCard key={index} title={word.title} definitions={word.définitions}/>
            ))}
        </div>
        <div className="sideContainer">
          <div className="bubble" >
           D'après mes calculs mathématiques vous avez 2 de QI
          </div>
          <img className="frog" src={smartFrog}/>
        </div>
      </div>
    </>
  )
}

export default Definitions