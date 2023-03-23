import React from 'react'
import { MainPageContainer, MainNav, MainLink, MainLinks, Profile, ProfilePicture, UserName, Logo } from './MainPageElements' 

const MainPage = () => {
  return (
    <MainPageContainer>
        <MainNav>
            <Logo />
            <Profile>
                <ProfilePicture />
                <UserName>BeraM</UserName>
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
