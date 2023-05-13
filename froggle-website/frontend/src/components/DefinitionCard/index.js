import React from 'react';
import {DefinitionBox, DefinitionTitle} from './DefinitionCardElements';

const DefinitionCard = ({title, type, definitions}) => {

  return (
     
              <DefinitionBox>
                    <DefinitionTitle>{title}</DefinitionTitle>
                    {Object.entries(definitions).map(([type, defs]) => (
                      <div key={type}>
                          <h3>{type}</h3>
                          <ol>
                            {defs.map((def, index) => (
                              <li key={index}>{def}</li>
                            ))}
                          </ol>
                      </div>
                    ))}
              </DefinitionBox>

  );
};

export default DefinitionCard;
