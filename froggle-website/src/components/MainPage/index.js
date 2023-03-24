import React from 'react'
import { MainPageContainer, MainNav, MainLink, MainLinks, Profile, ProfilePicture, UserName, Logo } from './MainPageElements' 


const MainPage = ({ img, text, logo }) => {
  return (
    <MainPageContainer>
        <MainNav>
            <Logo src={logo}/>
            <Profile>
                <ProfilePicture src={img}/>
                <UserName text={text}>{text}</UserName>
            </Profile>
        </MainNav>
        <MainLinks>
            <MainLink>Jouer</MainLink>
            <MainLink>Carrière</MainLink>
            <MainLink>Social</MainLink>
            <MainLink>Définitions</MainLink>
        </MainLinks>
    </MainPageContainer>
  )
}

export default MainPage
