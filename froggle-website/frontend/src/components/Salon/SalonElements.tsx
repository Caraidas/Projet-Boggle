import styled, { keyframes } from "styled-components";

export const SalonContainer = styled.label`
    position: relative;
    border: 3px solid #000;
    transform: ${props => props.selected? "translateY(2px)" : "translateY(0px)"};
    box-shadow: ${props => props.selected? "0px 1px 0px #000" : "0px 3px 0px #000"};
    border-radius: 10px;
    background: ${props => props.selected? props.color : "#fff"};
    cursor: pointer;
    height: 125px;

    &:hover {
        background: ${props => props.color};
    }
`

export const SalonName = styled.p`
    font-size: 2rem;
    font-weight: 900;
    position: absolute;
    top: 5px;
    left: 10px;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    text-shadow: 0px 3px 0px #000;
`

export const SalonAttendeeNumber = styled.p`
    position: absolute;
    font-weight: 900;
    bottom: 5px;
    left: 10px;

    &::after {
        content: " joueur(s)";
    }
`

export const SalonsDesc = styled.p``