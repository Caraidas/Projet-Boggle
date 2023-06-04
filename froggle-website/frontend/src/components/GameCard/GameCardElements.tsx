import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    from {
        transform: scale(0);
    }
`

export const GameCardCont = styled.div` 
    width: 240px;
    height: 165px;
    border: 4px solid #000;
    box-shadow: 0px 4px 0px #000;
    border-radius: 15px;
    margin-top: 25px;
    background: #fff;
    position: relative;
    color: #000;
`

export const Picture = styled.img`
    border: 3.5px solid #000;
    box-shadow: 0px 2px 0px #000;
    border-radius: 50%;
    width: 65px;
    aspect-ratio: 1;
    position: absolute;
    top: 0;
    left: 15px;
    transform: translateY(-40%);
    object-fit: cover;
    background: #fff;
`

export const Words = styled.p`
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 1.75rem;
    font-weight: bold;
`

export const Points = styled.p`
    position: absolute;
    top: 40px;
    left: 15px;
    font-size: 1.5rem;
    font-weight: 900;
    animation: ${appearAnim} 0.25s cubic-bezier(.85,1.76,.75,.81);
`

export const Place = styled.p`
    position: absolute;
    bottom: 0px;
    right: 15px;
    font-size: 5rem;
    font-weight: 900;
    color: #fff;
    -webkit-text-stroke: 3px #000;
    text-shadow: 0px 3px 0px #000;
    transform: rotate(10deg);
    animation: ${appearAnim} 0.25s cubic-bezier(.85,1.76,.75,.81);
`

export const Name = styled.p`
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 1.35rem;
    font-weight: bold; 
    max-width: 130px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
`