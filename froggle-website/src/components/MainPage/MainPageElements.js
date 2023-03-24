import styled, { keyframes } from "styled-components";
import { Link as LinkR } from 'react-router-dom';

export const MainPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    align-items: center;
`

export const MainNav = styled.nav`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    // border: 1px solid red;
`

const appearAnim = keyframes`
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1)
    }
`

export const Logo = styled.img`
    width: 200px;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ProfilePicture = styled.img` 
    width: 75px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid #000;
    box-shadow: 0px 3px 0px #000;
    object-fit: cover;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;
`

export const UserName = styled(LinkR)`
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    -webkit-text-stroke: 1.5px #000;
    text-shadow: 0px 1.5px 0px #000;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;
    
    &:hover {
       text-shadow: 0px 2px 0px #000;
    }
`

export const MainLinks = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 10px;
    height: 100%;
    justify-content: center;
    // border: 1px solid blue;
`

export const MainLink = styled(LinkR)`
    text-decoration: none;
    color: #fff;
    font-size: 5rem;
    font-weight: bold;
    -webkit-text-stroke: 3px #000;
    text-shadow: 0px 5px 0px #000;
    width: fit-content;
    transform-origin: left;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;

    &:hover {
        text-shadow: 0px 7px 0px #000;
    }
`