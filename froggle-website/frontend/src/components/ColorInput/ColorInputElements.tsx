import styled, { keyframes } from "styled-components";

export const ColorInputCont = styled.div`
    width: 55px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid #000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export const ColorInputButton = styled.div`
    transform: ${props => props.toggled ? "translateY(0px)" : props.hovered ? "translateY(-4px)" : "translateY(-3px)"};
    width: ${props => props.toggled ? "80%" : "60%"};
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid #000;
    box-shadow: ${props => props.toggled ? "none" : props.hovered ? "0px 4px 0px #000" : "0px 3px 0px #000"};
    background: ${props => props.color};
`