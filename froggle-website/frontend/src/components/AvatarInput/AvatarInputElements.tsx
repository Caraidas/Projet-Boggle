import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    from {
        transform-origin: center;
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`

export const AvatarInputCont = styled.div`
    width: 75px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid #000;
    box-shadow: ${props => props.toggled ? "none" : "0px 3px 0px #000"};
    transform: ${props => props.toggled ? "translateY(3px)" : "translateY(0px)"};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(.85,1.76,.75,.81);
    animation: ${appearAnim} 0.4s cubic-bezier(.85,1.76,.75,.81);

    &:hover {
        box-shadow: ${props => props.toggled ? "none" : "0px 5px 0px #000"};
        transform: ${props => props.toggled ? "translateY(3px)" : "translateY(-2px)"}
    }
`

export const AvatarInputImg = styled.img`
    width: 100%;
    object-fit: cover;
`