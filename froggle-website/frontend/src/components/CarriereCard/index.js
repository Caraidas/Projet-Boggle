import React from 'react'
import { CardContainer, CarriereCardDate, CarriereCardPicture, Win, WinDataCont, GameData, Num, CarriereCardPictures } from './CarriereCardElements';

const CarriereCard = ({ pictures, number}) => {

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  let pics = [];

  let win = "Victoire";
  if (userData?.historique[number]['Podium'] != 1)
    win = "Défaite";
  
  
  for (let i = 0; i < pictures.length; i++) {
    let avatar = require('../../images/avatar' + pictures[i]['Photo_De_Profile'] + '.png');
    pics.push(<CarriereCardPicture key={i} src={avatar} index={i}></CarriereCardPicture>);
  }

  return (
    <CardContainer>
      <CarriereCardPictures>
        {pics}
      </CarriereCardPictures> 

      <WinDataCont>
        <Num>{userData?.historique[number]['Podium']}</Num>
        <Win>{win}</Win>
      </WinDataCont>

      <GameData>
        <div>Mots trouvés : {userData?.historique[number]['mots_trouves']}</div> 
        <div>Points : {userData?.historique[number]['score']}</div>
      </GameData>

      <CarriereCardDate>{userData?.historique[number]['date']}</CarriereCardDate>
    </CardContainer>
  )
}

export default CarriereCard
