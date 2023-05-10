import React from 'react'
import { CardContainer, CarriereCardDate, CarriereCardPicture, Win, WinDataCont, GameData, Num, CarriereCardPictures } from './CarriereCardElements';

const CarriereCard = ({ pictures }) => {

  let pics = [];
  
  for (let i = 0; i < pictures.length; i++) {
    let picture = pictures[i];

    pics.push(<CarriereCardPicture src={picture} index={i}></CarriereCardPicture>);
  }

  return (
    <CardContainer>
      <CarriereCardPictures>
        {pics}
      </CarriereCardPictures> 

      <WinDataCont>
        <Num>1</Num>
        <Win>Victoire</Win>
      </WinDataCont>

      <GameData>
        <div>Mots trouvés : 38</div> 
        <div>Points : 240</div>
      </GameData>

      <CarriereCardDate>12/12/2007</CarriereCardDate>
    </CardContainer>
  )
}

export default CarriereCard
