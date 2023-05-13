import React from 'react'
import { MainPageContainer, MainNav, MainLink, MainLinks, Profile, ProfilePicture, UserName, Logo } from './MainPageElements' 
import click from "../../sound/click.mp3";


const MainPage = ({ img, text, logo, soundVolume }) => {

  function playSound() {
    let audio = new Audio(click);
    audio.volume = soundVolume / 100;
    audio.play();
  }

  return (
    <MainPageContainer>
        <MainNav>
            <Logo src={logo}/>
            <Profile>
                <ProfilePicture src={img}/>
                <UserName text={text} onMouseEnter={playSound}>{text}</UserName>
            </Profile>
        </MainNav>
        <MainLinks>
            <MainLink onMouseEnter={playSound}>Jouer</MainLink>
            <MainLink onMouseEnter={playSound} to={"/carriere"}>Carrière</MainLink>
            <MainLink onMouseEnter={playSound}>Social</MainLink>
            <MainLink onMouseEnter={playSound} to={"/definitions"}>Définitions</MainLink>
        </MainLinks>
    </MainPageContainer>
  )
}

export default MainPage
