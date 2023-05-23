import styled, { keyframes } from "styled-components";

export const SalonsGridContainer = styled.div`
    width: 100%;
    border: 3.5px solid #000;
    box-shadow: 0px 4px 0px #000;
    background: #fff; 
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    grid-row-gap: 20px;
    padding: 20px;
    border-radius: 10px;
`

export const SalonsGridWrapper = styled.div`
    display: flex;
    width: 90%;
    max-width: 750px;
    flex-direction: column;
    gap: 10px;
    margin: 0 auto;
`