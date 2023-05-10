import styled, { keyframes } from "styled-components";

export const CardContainer = styled.div`
    position: relative;
    background: #fff;
    border: 3px solid #000;
    border-radius: 10px;
    box-shadow: 0px 3px 0px #000;
    width: 90%;
    max-width: 700px;
    height: 125px;
`

export const CarriereCardPictures = styled.div`
    display: flex;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(10%, -50%);
`

export const CarriereCardPicture = styled.img`
    width: 55px;
    aspect-ratio: 1;
    border: 2px solid #000;
    box-shadow: 0px 3px 0px #000;
    border-radius: 50%;
    object-fit: cover;
`

export const WinDataCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 10px;
    right: 15px;
`

export const Num = styled.p`
    font-size: 2.75rem;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    text-shadow: 0px 3px 0px #000;
    
    transform: rotate(-10deg);
`

export const Win = styled.p`
    font-size: 1.75rem;
    color: #000; 
    font-weight: bold;
`

export const GameData = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: column;
    gap: 2px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 1.25rem;
    font-weight: bold;
`
export const CarriereCardDate = styled.p`
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 1.5rem;
    color: #000;
`