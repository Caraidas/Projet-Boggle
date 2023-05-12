import React, { useState } from 'react';
import {DefinitionsContainer, DefinitionInput,DefinitionBox} from './DefinitionElements';

const Definition = () => {
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
      <DefinitionsContainer>
          <form onSubmit={handleSubmit}>
              <DefinitionInput value={inputValue} onChange={handleInputChange} />
              <button type="submit">Submit</button>
          </form>
          {output.map((word, index) => (
              <DefinitionBox key={index}>
                  <h1>{word.title}</h1>
                  {Object.entries(word.définitions).map(([type, defs]) => (
                      <div key={type}>
                          <h4>{type}</h4>
                          <ol>
                            {defs.map((def, index) => (
                              <li key={index}>{def}</li>
                            ))}
                          </ol>
                      </div>
                  ))}
              </DefinitionBox>
          ))}
      </DefinitionsContainer>
  );
};

export default Definition;
