import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1250px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 0px 0px 0px 0px;
    height: 75px;
`

export const Logo = styled.img`
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;

    @media screen and (max-width: 550px) {
        height: 75%;
    }
`

export const Text = styled.p`
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    text-shadow: 0px 4px 0px #000;
    animation: ${appearAnim} 0.5s cubic-bezier(.85,1.76,.75,.81) forwards;

    @media screen and (max-width: 550px) {
        font-size: 2rem;
        -webkit-text-stroke: 1.5px #000;
        text-shadow: 0px 3px 0px #000;
    }
`