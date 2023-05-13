import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
`

export const CardContainer = styled.div`
    position: relative;
    background: #fff;
    border: 3px solid #000;
    border-radius: 10px;
    box-shadow: 0px 3px 0px #000;
    width: 90%;
    max-width: 700px;
    height: 125px;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;

    @media screen and (max-width: 700px) {
        width: 100%;
    }

    @media screen and (max-width: 450px) {
        height: 175px;
    }
`

export const CarriereCardPictures = styled.div`
    display: flex;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(10%, -50%);

    @media screen and (max-width: 700px) {
        gap: 5px;
    }

    @media screen and (max-width: 450px) {
        width: 100%;
        justify-content: center;
        transform: translate(0%, -50%);
    }
`

export const CarriereCardPicture = styled.img`
    width: 55px;
    aspect-ratio: 1;
    border: 2px solid #000;
    box-shadow: 0px 3px 0px #000;
    border-radius: 50%;
    object-fit: cover;

    @media screen and (max-width: 700px) {
        width: 40px;
        border: 2px solid #000;
        box-shadow: 0px 2px 0px #000;
    }
`

export const WinDataCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 10px;
    right: 15px;

    @media screen and (max-width: 450px) {
        right: auto;
        left: 15px;
        top: 30px;
    }
`

export const Num = styled.p`
    font-size: 2.75rem;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    text-shadow: 0px 3px 0px #000;
    
    transform: rotate(-10deg);

    @media screen and (max-width: 700px) {
        font-size: 2.25rem;
    }
`

export const Win = styled.p`
    font-size: 1.75rem;
    color: #000; 
    font-weight: bold;

    @media screen and (max-width: 700px) {
        font-size: 1.25rem;
    }
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

    @media screen and (max-width: 700px) {
        font-size: 1rem;
    }

    @media screen and (max-width: 450px) {
        bottom: auto;
        top: 80px;
    }
`
export const CarriereCardDate = styled.p`
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 1.5rem;
    color: #000;

    @media screen and (max-width: 700px) {
        font-size: 1rem;
    }

    @media screen and (max-width: 450px) {
        right: auto;
        left: 15px;
    }
`