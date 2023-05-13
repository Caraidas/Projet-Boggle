import React from 'react'
import { MainPageContainer, MainNav, MainLink, MainLinks, Profile, ProfilePicture, UserName, Logo } from './MainPageElements';
let click = require("../../sound/click.mp3");

const MainPage = (props : MainPageProps) => {

  function playSound() {
    let audio = new Audio(click);
    audio.volume = props.soundVolume / 100;
    audio.play();
  }

  return (
    <MainPageContainer>
        <MainNav>
            <Logo src={props.logo}/>
            <Profile>
                <ProfilePicture src={props.img}/>
                <UserName text={props.text} onMouseEnter={playSound}>{props.text}</UserName>
            </Profile>
        </MainNav>
        <MainLinks>
            <MainLink onMouseEnter={playSound} to={"/game"}>Jouer</MainLink>
            <MainLink onMouseEnter={playSound} to={"/carriere"}>Carrière</MainLink>
            <MainLink onMouseEnter={playSound}>Social</MainLink>
            <MainLink onMouseEnter={playSound} to={"/definitions"}>Définitions</MainLink>
        </MainLinks>
    </MainPageContainer>
  )
}

export interface MainPageProps {
  img : string
  text : string
  logo : string
  soundVolume : number
}

export default MainPage
