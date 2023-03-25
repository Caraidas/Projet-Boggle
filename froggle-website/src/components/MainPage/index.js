import React from 'react'
import { MainPageContainer, MainNav, MainLink, MainLinks, Profile, ProfilePicture, UserName, Logo } from './MainPageElements' 
import click from "../../sound/click.mp3";


const MainPage = ({ img, text, logo, soundVolume }) => {

  function play() {
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
                <UserName text={text} onMouseEnter={play}>{text}</UserName>
            </Profile>
        </MainNav>
        <MainLinks>
            <MainLink onMouseEnter={play}>Jouer</MainLink>
            <MainLink onMouseEnter={play}>Carrière</MainLink>
            <MainLink onMouseEnter={play}>Social</MainLink>
            <MainLink onMouseEnter={play}>Définitions</MainLink>
        </MainLinks>
    </MainPageContainer>
  )
}

export default MainPage
