import styled, { keyframes } from "styled-components";

export const DefinitionBox =  styled.div`
    width:80%;
    min-height:250px;
    overflow-y:scroll;
    overflow-x:hidden;
    background-color:#F1E368;
    margin-bottom:10px;
    padding: 1rem;
    border: 3px solid #000;
    border-radius: 10px;
    box-shadow: 0px 3px 0px #000;
`
export const DefinitionTitle = styled.h3`
    font-family: 'Cabin', sans-serif;
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    text-shadow: 0px 3px 0px #000;
    margin-bottom:0.5rem
`