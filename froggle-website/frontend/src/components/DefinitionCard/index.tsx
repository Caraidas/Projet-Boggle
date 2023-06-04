import React from "react";
import { DefinitionBox, DefinitionTitle } from "./DefinitionCardElements";

const DefinitionCard = (props: {
  title: any;
  definitions: { [type: string]: string[] };
  primaryColor: any;
}) => {
  return (
    <DefinitionBox style={{ background: props.primaryColor }}>
      <DefinitionTitle>{props.title}</DefinitionTitle>
      {Object.entries(props.definitions).map(([type, defs]) => (
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
