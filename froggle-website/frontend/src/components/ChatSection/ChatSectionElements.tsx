import styled, { keyframes } from "styled-components";

export const ChatToggler = styled.img`
    width: 75px;
    object-fit: cover;

    position: absolute;
    top: 20px;
    right: 20px;
    transform: ${props => props.toggled ? "translateX(-400px)" : "translateX(0px)"};
    transition: all 0.3s cubic-bezier(.85,1.76,.75,.81);
    z-index: 999;
    cursor: pointer;

    &:active {
        transform-origin: center;
        transform:  ${props => props.toggled ? "translateX(-400px) scale(0.9)" : "translateX(0px) scale(0.9)"};
    }

    @media screen and (max-width: 550px) {
        width: 60px;
        transform: ${props => props.toggled ? "translateX(-75vw)" : "translateX(0px)"};

        &:active {
            transform-origin: center;
            transform:  ${props => props.toggled ? "translateX(-75vw) scale(0.9)" : "translateX(0px) scale(0.9)"};
        }
    }
`

export const ChatContainer = styled.div`
    width: 400px;

    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    transform-origin: top;
    transform: ${props => props.toggled ? "translateX(0) scale(1)" : "translateX(100%) scale(0)"};
    transition: all 0.3s cubic-bezier(.85,1.76,.75,.81);
    z-index: 999;

    @media screen and (max-width: 550px) {
        width: 80vw;
    }
`
export const QuitButton = styled.button`
    width: 100px;
    height: 50px;
    background: #ff6262;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3.5px solid #000;
    box-shadow: 0px 3px 0px #000;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    margin-top: 20px;

    font-weight: 900;
    font-size: 1.25rem;
    z-index: 998;
    color: #000000;

    &:active {
        transform: translateY(2px);
        box-shadow: 0px 1px 0px #000;
    }
`
