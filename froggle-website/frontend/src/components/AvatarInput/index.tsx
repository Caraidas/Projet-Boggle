import React from "react";
import { AvatarInputCont, AvatarInputImg } from "./AvatarInputElements";

const AvatarInput = (props: {
  requiredLevel: number;
  imgIndex: number;
  onSelect: (index: number) => void;
  toggled: boolean;
}) => {
  let avatar = require("../../images/avatar" + props.imgIndex + ".png");

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  let available = false;

  let niveau = 1;
  let pointsXPNiveau = 100;
  let xp_joueur = userData?.XP_Actuel;
  while (xp_joueur >= pointsXPNiveau) {
    xp_joueur -= pointsXPNiveau;
    pointsXPNiveau += pointsXPNiveau * 0.2;
    niveau++;
  }

  if (props.requiredLevel <= niveau) {
    available = true;
  }

  function handleToggle() {
    if (available) {
      props.onSelect(props.imgIndex)
    }
  }

  return (
    <AvatarInputCont
      toggled={props.toggled}
      onClick={() => handleToggle()}
      available={available}
    >
      <AvatarInputImg src={avatar} />
    </AvatarInputCont>
  );
};

export default AvatarInput;
