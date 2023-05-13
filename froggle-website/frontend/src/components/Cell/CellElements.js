import styled, { keyframes } from "styled-components"

export const CellContainer = styled.div`
    width: 90px;
    aspect-ratio: 1;
    background: ${({ isToggled }) => (isToggled ? '#F1E368' : "#fff")};
    border: 4px solid #000;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px ${({ isToggled }) => (isToggled ? '2px' : "5px")} 0px #000;
    transform: ${({ isToggled }) => (isToggled ? 'translateY(2px)' : "translateY(0px)")};
    padding: 10px 10px;
    cursor: pointer;
`

export const Letter = styled.div`   
    font-size: 3rem;
    color: #fff;
    font-weight: 900;
    -webkit-text-stroke: 3px #000;
    text-shadow: 0px 4px 0px #000;
    user-select: none;
`